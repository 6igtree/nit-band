export type Nit = { kind: 'nit' | 'translate'; original: string; better: string; why: string }

declare module 'claude-code' {
  interface PluginState {
    'nit-band': { nit: Nit | null }
  }
}
