import { vi } from 'vitest'

// Native modules cannot load in Node: unit tests get in-memory stand-ins
vi.mock('react-native', () => ({ Platform: { OS: 'ios' } }))
vi.mock('expo-secure-store', () => {
  const items = new Map<string, string>()
  return {
    getItemAsync: (key: string) => Promise.resolve(items.get(key) ?? null),
    setItemAsync: (key: string, value: string) => {
      items.set(key, value)
      return Promise.resolve()
    },
    deleteItemAsync: (key: string) => {
      items.delete(key)
      return Promise.resolve()
    },
  }
})
