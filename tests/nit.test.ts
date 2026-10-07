import { expect, test } from 'claude-code/testing'

import { parse, prose, system } from '../hooks/register'

test('code is not prose', () => {
  expect(prose('fix this ```\nconst a = 1\n``` and run `npm test` please')).toBe('fix this and run please')
})

test('a fix in the language being learned is a nit, with chatter around the JSON', () => {
  const nit = parse('```json\n{"inTarget":true,"fix":true,"original":"you should fix","better":"could we fix","why":"softer"}\n```')
  expect(nit).toEqual({ kind: 'nit', original: 'you should fix', better: 'could we fix', why: 'softer' })
})

test('another language is always a translation, even if the model fills original', () => {
  const nit = parse('{"inTarget":false,"original":"レビューお願いします","better":"Could you review this?","why":"x"}')
  expect(nit).toEqual({ kind: 'translate', original: '', better: 'Could you review this?', why: '' })
})

test('no fix, broken JSON and an empty answer show nothing', () => {
  expect(parse('{"inTarget":true,"fix":false}')).toBe(null)
  expect(parse('{"inTarget":true,')).toBe(null)
  expect(parse('{"inTarget":false,"better":""}')).toBe(null)
})

test('the rules name the language being learned', () => {
  const rules = system('Japanese')
  expect(rules).toContain('learning Japanese')
  expect(rules).toContain('natural workplace Japanese')
  expect(rules).not.toContain('English write')
})
