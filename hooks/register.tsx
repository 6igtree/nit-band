import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Nit } from '../types'

const current = atom({ plugin: 'nit-band', key: 'nit' } as const, null)

// The rules come from skills/nit/SKILL.md ("The nit line"), trimmed to what fits one call.
const SYSTEM = `You help an engineer whose first language is not English write better workplace English.
You get one message they sent to their coding agent. Code, commands, paths and error messages are not prose; ignore them.

If the message is mostly English, pick at most ONE fix, in this order:
1. Meaning: a phrase that could be misunderstood.
2. Tone: too blunt, rude, or too weak for a teammate.
3. Naturalness: correct but clearly non-native.
Skip small slips (articles, typos) that change neither meaning nor tone. If two phrasings are both fine, there is no fix.

If the message is mostly in another language and is something they could say to a teammate, give how they could say it in English.

Answer with JSON only, exactly one of these three shapes, "kind" spelled as shown:
{"kind":"nit","original":"<their exact words, short>","better":"<what a teammate would say>","why":"<under 15 words>"}
{"kind":"in-english","original":"","better":"<the message in natural workplace English>","why":""}
{"kind":"none"}`

// Fenced blocks and inline code are not prose.
export function prose(text: string): string {
  return text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ').replace(/\s+/g, ' ').trim()
}

export function parse(reply: string): Nit | null {
  const json = reply.match(/\{[\s\S]*\}/)
  if (!json) return null
  try {
    const r = JSON.parse(json[0])
    // Haiku sometimes names the category ("tone") as the kind; judge by the fields instead.
    if (r.kind === 'none' || typeof r.better !== 'string' || !r.better) return null
    const original = typeof r.original === 'string' ? r.original : ''
    return original
      ? { kind: 'nit', original, better: r.better, why: typeof r.why === 'string' ? r.why : '' }
      : { kind: 'in-english', original: '', better: r.better, why: '' }
  } catch {}
  return null
}

export const register: Register = on => {
  let generation = 0

  on('prompt.submit', ($, e, next) => {
    const mine = ++generation
    // ponytail: one Haiku call per prompt, never awaited, so the prompt is never delayed or blocked.
    void (async () => {
      await update($, current, () => null)
      const text = prose(e.text)
      if (e.origin.kind !== 'composer' || text.startsWith('/') || text.length < 12) return
      const r = await $.model.complete({ model: 'haiku', system: SYSTEM, prompt: text.slice(0, 2000), maxTokens: 300, effort: 'low' })
      const nit = r.isAnswered ? parse(r.text) : null
      if (nit && mine === generation) await update($, current, () => nit)
    })().catch(() => {})

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const nit = await read($, current)
    if (nit === null || e.props.hasSurvey) return next(e)

    const { Box, Button, Text } = $.ui.resolve(e)
    const line =
      nit.kind === 'nit'
        ? `nit: "${nit.original}" → "${nit.better}"${nit.why ? ` (${nit.why})` : ''}`
        : `in English: "${nit.better}"`

    const save = async () => {
      const home = await $.env.get('HOME')
      const path = `${home}/.nit/phrasebook.md`
      const day = new Date().toISOString().slice(0, 10)
      const note = nit.kind === 'nit' ? ` (instead of "${nit.original}")` : ''
      const old = (await $.fs.exists(path)) ? await $.fs.read(path) : ''
      await $.fs.write(path, `${old}- ${day} · mod · "${nit.better}"${note}\n`)
      $.ui.toast('Saved to ~/.nit/phrasebook.md')
      await update($, current, () => null)
    }

    return (
      <Box>
        <Text dimColor>{line} </Text>
        <Button key="save" label="Save" onPress={save} />
        <Button key="hide" label="Hide" onPress={() => update($, current, () => null)} />
      </Box>
    )
  })
}
