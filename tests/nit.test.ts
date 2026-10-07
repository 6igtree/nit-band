import { expect, test } from 'claude-code/testing'

import { parse, prose } from '../hooks/register'

test('code is not prose', () => {
  expect(prose('fix this ```\nconst a = 1\n``` and run `npm test` please')).toBe('fix this and run please')
})

test('a nit reply parses, with chatter around the JSON', () => {
  const nit = parse('Sure:\n{"kind":"nit","original":"you should fix","better":"could we fix","why":"softer"}')
  expect(nit).toEqual({ kind: 'nit', original: 'you should fix', better: 'could we fix', why: 'softer' })
})

test('none, broken JSON and an empty fix show nothing', () => {
  expect(parse('{"kind":"none"}')).toBe(null)
  expect(parse('{"kind":"nit",')).toBe(null)
  expect(parse('{"kind":"nit","better":""}')).toBe(null)
})

test('a category as the kind still parses (Haiku answered "tone")', () => {
  const reply = '```json\n{"kind":"tone","original":"it is very bad code","better":"this code needs work","why":"less harsh"}\n```'
  expect(parse(reply)).toEqual({ kind: 'nit', original: 'it is very bad code', better: 'this code needs work', why: 'less harsh' })
  expect(parse('{"kind":"in-english","original":"","better":"Could you take a look?","why":""}')?.kind).toBe('in-english')
})
