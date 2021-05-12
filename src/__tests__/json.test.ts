import path from 'path'
import {json} from '../index'

test('json', () => {
  const jsonObject = json.read(path.resolve(__dirname, './json.json'))
  expect(jsonObject.get('boolean')).toBe(true)
  expect(jsonObject.get('string')).toBe('string')
  expect(jsonObject.get('number')).toBe(1024)
  expect(jsonObject.get('object.number')).toBe(2048)
})

test('json2', () => {
  const json2Object = json.read(path.resolve(__dirname, './json2.json'))
  expect(json2Object.get('null')).toBe(null)
})
