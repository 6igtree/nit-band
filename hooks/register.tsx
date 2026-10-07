import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Nit } from '../types'

const current = atom({ plugin: 'nit-band', key: 'nit' } as const, null)

// The rules come from nit's skills/nit/SKILL.md ("The nit line"), for any language.
export function system(language: string): string {
  return `You help someone who is learning ${language} use it at work. They write messages to their coding agent; you never answer the message itself.
Code, commands, paths and error messages are not prose; ignore them.

Step 1. Decide which language the message is mostly written in.

Step 2a. If it is NOT ${language}: always give how a teammate would say the whole message in natural workplace ${language}. Being fine in its own language does not matter. 

Step 2b. If it IS ${language}: pick at most ONE fix, in this order:
1. Meaning: a phrase that could be misunderstood.
2. Tone: too blunt, rude, or too weak for a teammate.
3. Naturalness: correct but clearly non-native.
Skip small slips that change neither meaning nor tone. If two phrasings are both fine, there is no fix.

Write "why" in plain English. Answer with JSON only, in one of these shapes:
{"inTarget":false,"better":"<the whole message in natural workplace ${language}>"}
{"inTarget":true,"fix":true,"original":"<their exact words, short>","better":"<what a teammate would say, in ${language}>","why":"<under 15 words>"}
{"inTarget":true,"fix":false}`
}

// Fenced blocks and inline code are not prose.
export function prose(text: string): string {
  return text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ').replace(/\s+/g, ' ').trim()
}

export function parse(reply: string): Nit | null {
  const json = reply.match(/\{[\s\S]*\}/)
  if (!json) return null
  try {
    const r = JSON.parse(json[0])
    // Which shape to show is decided here from inTarget, not by the model's labels.
    if (typeof r.better !== 'string' || !r.better.trim()) return null
    if (r.inTarget === false) return { kind: 'translate', original: '', better: r.better, why: '' }
    if (r.inTarget === true && r.fix === true && typeof r.original === 'string' && r.original) {
      return { kind: 'nit', original: r.original, better: r.better, why: typeof r.why === 'string' ? r.why : '' }
    }
  } catch {}
  return null
}

export const register: Register = (on, options) => {
  const language = String(options.language ?? '').trim() || 'English'
  let generation = 0

  on('prompt.submit', ($, e, next) => {
    const mine = ++generation
    // ponytail: one Haiku call per prompt, never awaited, so the prompt is never delayed or blocked.
    void (async () => {
      await update($, current, () => null)
      const text = prose(e.text)
      if (e.origin.kind !== 'composer' || text.startsWith('/') || text.length < 12) return
      const r = await $.model.complete({ model: 'haiku', system: system(language), prompt: `Language being learned: ${language}\n\nMessage:\n${text.slice(0, 2000)}`, maxTokens: 300, effort: 'low' })
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
        : `in ${language}: "${nit.better}"`

    const save = async () => {
      const home = await $.env.get('HOME')
      const path = `${home}/.nit/phrasebook.md`
      const day = new Date().toISOString().slice(0, 10)
      const note = nit.kind === 'nit' ? ` (instead of "${nit.original}")` : ''
      const tag = language === 'English' ? '' : ` · ${language}`
      const old = (await $.fs.exists(path)) ? await $.fs.read(path) : ''
      await $.fs.write(path, `${old}- ${day} · mod${tag} · "${nit.better}"${note}\n`)
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
