import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Line } from '../types'

const current = atom({ plugin: 'nit-band', key: 'line' } as const, null)

export function system(speak: string, learn: string): string {
  return `You help someone who works in ${speak} learn how people at work say the same things in ${learn}.
You get one message they wrote to their coding agent; you never answer it. Code, commands, paths and error messages are not prose; ignore them.

If the message is already in ${learn}, or has no prose, answer {"skip":true}.

Otherwise give how a teammate at a ${learn}-speaking company would say the whole message: natural, short, workplace ${learn}.
Also pick the ONE expression from the message most worth learning: workplace or engineering wording that does not translate word for word (for Japanese to English, for example: 影響範囲 → blast radius, 切り戻す → roll back). Put the words from their message in "from" and the ${learn} in "to". Leave "key" out when every word is basic.

Answer with JSON only:
{"text":"<the whole message in ${learn}>","key":{"from":"<words from their message>","to":"<in ${learn}>"}}`
}

// Fenced blocks and inline code are not prose.
export function prose(text: string): string {
  return text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ').replace(/\s+/g, ' ').trim()
}

export function parse(reply: string): Line | null {
  const json = reply.match(/\{[\s\S]*\}/)
  if (!json) return null
  try {
    const r = JSON.parse(json[0])
    if (typeof r.text !== 'string' || !r.text.trim()) return null
    const from = typeof r.key?.from === 'string' ? r.key.from.trim() : ''
    const to = typeof r.key?.to === 'string' ? r.key.to.trim() : ''
    return { text: r.text.trim(), key: from && to ? { from, to } : null }
  } catch {}
  return null
}

export const register: Register = (on, options) => {
  const speak = String(options.speak ?? '').trim() || 'Japanese'
  const learn = String(options.learn ?? '').trim() || 'English'
  let generation = 0

  on('prompt.submit', ($, e, next) => {
    const mine = ++generation
    // ponytail: one Haiku call per prompt, never awaited, so the prompt is never delayed or blocked.
    void (async () => {
      await update($, current, () => null)
      const text = prose(e.text)
      if (e.origin.kind !== 'composer' || text.startsWith('/') || text.length < 6) return
      const r = await $.model.complete({ model: 'haiku', system: system(speak, learn), prompt: text.slice(0, 2000), maxTokens: 400, effort: 'low' })
      const line = r.isAnswered ? parse(r.text) : null
      if (line && mine === generation) await update($, current, () => line)
    })().catch(() => {})

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const line = await read($, current)
    if (line === null || e.props.hasSurvey) return next(e)

    const { Box, Button, Text } = $.ui.resolve(e)

    const save = async () => {
      const home = await $.env.get('HOME')
      const path = `${home}/.nit/phrasebook.md`
      const day = new Date().toISOString().slice(0, 10)
      const learned = line.key ? ` ${line.key.from} → ${line.key.to} ·` : ''
      const pair = speak === 'Japanese' && learn === 'English' ? '' : ` ${speak} → ${learn} ·`
      const old = (await $.fs.exists(path)) ? await $.fs.read(path) : ''
      await $.fs.write(path, `${old}- ${day} ·${pair}${learned} "${line.text}"\n`)
      $.ui.toast('Saved to ~/.nit/phrasebook.md')
      await update($, current, () => null)
    }

    return (
      <Box flexDirection="column">
        <Box>
          <Text dimColor>
            in {learn}: "{line.text}"{' '}
          </Text>
          <Button key="save" label="Save" onPress={save} />
          <Button key="hide" label="Hide" onPress={() => update($, current, () => null)} />
        </Box>
        {line.key ? (
          <Text>
            key: {line.key.from} → {line.key.to}
          </Text>
        ) : null}
      </Box>
    )
  })
}
