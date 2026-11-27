/**
 * pulsoicon-react 6.2.0 bug: an icon's focusout/pointerleave listener (removed in a passive cleanup)
 * can fire after Motion's controls unmounted (layout cleanup) – e.g. a focused button removed –
 * and `controls.start()` rejects. Harmless (the icon is gone), so drop that one rejection.
 * Capture phase: runs before Next's own handler (dev overlay + terminal log), which ignores
 * `preventDefault()`. Remove once pulsoicon-react guards start/stop after unmount.
 */
const PULSOICON_UNMOUNTED =
  'controls.start() should only be called after a component has mounted'

window.addEventListener(
  'unhandledrejection',
  (event) => {
    const reason: unknown = event.reason
    if (
      reason instanceof Error &&
      reason.message.startsWith(PULSOICON_UNMOUNTED)
    ) {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  },
  { capture: true },
)
