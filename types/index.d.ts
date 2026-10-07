export type Line = { text: string; key: { from: string; to: string } | null }

declare module 'claude-code' {
  interface PluginState {
    'nit-band': { line: Line | null }
  }
}
