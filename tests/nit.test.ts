import { expect, test } from 'claude-code/testing'

import { parse, prose } from '../hooks/register'

test('code is not prose', () => {
  expect(prose('これ直して ```\nconst a = 1\n``` あと `npm test` も')).toBe('これ直して あと も')
})

test('the English and the one expression worth learning parse, with chatter around the JSON', () => {
  const line = parse('```json\n{"english":"Can we roll back and check the blast radius?","key":{"from":"影響範囲","to":"blast radius"}}\n```')
  expect(line).toEqual({ english: 'Can we roll back and check the blast radius?', key: { from: '影響範囲', to: 'blast radius' } })
})

test('a missing or half key is dropped, the English stays', () => {
  expect(parse('{"english":"Please add tests."}')).toEqual({ english: 'Please add tests.', key: null })
  expect(parse('{"english":"Please add tests.","key":{"from":"","to":"tests"}}')?.key).toBe(null)
})

test('skip, broken JSON and empty English show nothing', () => {
  expect(parse('{"skip":true}')).toBe(null)
  expect(parse('{"english":')).toBe(null)
  expect(parse('{"english":"  "}')).toBe(null)
})
