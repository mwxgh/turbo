import { LETTERS } from '@/lib/lingo'
import type { AttemptQuestion, ScriptLine } from '@/lib/queries/lingo'

const LANG: Record<NonNullable<ScriptLine['accent']>, string> = {
  US: 'en-US',
  GB: 'en-GB',
  AU: 'en-AU',
  CA: 'en-CA',
}

/** Women a bit higher, second speakers on another voice: tells speakers apart with any voice set. */
const SPEAKER: Record<ScriptLine['speaker'], { voice: number; pitch: number }> =
  {
    M: { voice: 0, pitch: 0.9 },
    W: { voice: 1, pitch: 1.15 },
    M2: { voice: 2, pitch: 0.8 },
    W2: { voice: 3, pitch: 1.25 },
    N: { voice: 0, pitch: 1 },
  }

/**
 * What the learner hears for a question: the item's script (Part 3, 4), or the spoken question
 * and lettered options (Part 1, 2).
 */
export function scriptOf(
  q: Pick<AttemptQuestion, 'transcript' | 'accent' | 'text' | 'options'>,
  spokenOptions: boolean,
): ScriptLine[] {
  if (q.transcript?.length) return q.transcript
  if (!spokenOptions) return []
  const accent = q.accent ?? undefined
  return [
    ...(q.text ? [{ speaker: 'M' as const, accent, text: q.text }] : []),
    ...q.options.map((option, i) => ({
      speaker: q.text ? ('W' as const) : ('N' as const),
      accent,
      text: `${LETTERS[i]}. ${option}`,
    })),
  ]
}

export const canSpeak = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window

/** The browser's voice for a line: same language first, then any English voice. */
function voiceFor(voices: SpeechSynthesisVoice[], line: ScriptLine) {
  const lang = LANG[line.accent ?? 'US']
  const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-')
  const same = voices.filter((v) => norm(v) === lang)
  const pool = same.length
    ? same
    : voices.filter((v) => norm(v).startsWith('en'))
  return pool.length
    ? pool[SPEAKER[line.speaker].voice % pool.length]
    : undefined
}

/** Reads the lines in order; returns a stop function. `onEnd` runs once, when done or stopped. */
export function speak(lines: ScriptLine[], onEnd: () => void): () => void {
  if (!canSpeak() || !lines.length) {
    onEnd()
    return () => undefined
  }
  const synth = window.speechSynthesis
  synth.cancel()
  const voices = synth.getVoices()
  let ended = false
  const end = () => {
    if (ended) return
    ended = true
    onEnd()
  }
  lines.forEach((line, i) => {
    const utterance = new SpeechSynthesisUtterance(line.text)
    utterance.lang = LANG[line.accent ?? 'US']
    const voice = voiceFor(voices, line)
    if (voice) utterance.voice = voice
    utterance.pitch = SPEAKER[line.speaker].pitch
    utterance.rate = 0.95
    if (i === lines.length - 1) utterance.onend = end
    utterance.onerror = end
    synth.speak(utterance)
  })
  return () => {
    synth.cancel()
    end()
  }
}

/** Part 7: several texts separated by a `---` line. */
export const splitPassage = (passage: string) =>
  passage
    .split(/^\s*-{3,}\s*$/m)
    .map((text) => text.trim())
    .filter(Boolean)
