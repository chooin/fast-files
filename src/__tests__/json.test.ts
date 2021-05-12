import path from 'path'
import {json} from '../index'
import dayjs from 'dayjs'

test('json read', () => {
  const jsonObject = json.readFile(path.resolve(__dirname, './json.json'))
  expect(jsonObject.get('boolean')).toBe(true)
  expect(jsonObject.get('string')).toBe('string')
  expect(jsonObject.get('number')).toBe(1024)
  expect(jsonObject.get('object.number')).toBe(2048)
})

test('json2 read', () => {
  const json2Object = json.readFile(path.resolve(__dirname, './json2.json'))
  expect(json2Object.get('null')).toBe(null)
})

test('json set', () => {
  const jsonObject = json.readFile(path.resolve(__dirname, './json.json'))
  jsonObject.set('date', dayjs().format('YYYY-MM-DD'))
  jsonObject.set('boolean', false)
  jsonObject.saveFile(path.resolve(__dirname, 'x.json'))

  const xObject = json.readFile(path.resolve(__dirname, './x.json'))
  expect(xObject.get('date')).toBe(dayjs().format('YYYY-MM-DD'))
  expect(xObject.get('boolean')).toBe(false)
})
