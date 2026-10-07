export type Nit = { kind: 'nit' | 'in-english'; original: string; better: string; why: string }

declare module 'claude-code' {
  interface PluginState {
    'nit-band': { nit: Nit | null }
  }
}
