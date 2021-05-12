import path from 'path'
import {json} from '../index'
import dayjs from 'dayjs'

test('json read', () => {
  const jsonObject = json.readFile(path.resolve(__dirname, './json.json'))
  expect(jsonObject.getValue('boolean')).toBe(true)
  expect(jsonObject.getValue('string')).toBe('string')
  expect(jsonObject.getValue('number')).toBe(1024)
  expect(jsonObject.getValue('object.number')).toBe(2048)
})

test('json2 read', () => {
  const json2Object = json.readFile(path.resolve(__dirname, './json2.json'))
  expect(json2Object.getValue('null')).toBe(null)
})

test('json set', () => {
  const jsonObject = json.readFile(path.resolve(__dirname, './json.json'))
  jsonObject.setValue('date', dayjs().format('YYYY-MM-DD'))
  jsonObject.setValue('boolean', false)
  jsonObject.saveFile(path.resolve(__dirname, 'x.json'))

  const xObject = json.readFile(path.resolve(__dirname, './x.json'))
  expect(xObject.getValue('date')).toBe(dayjs().format('YYYY-MM-DD'))
  expect(xObject.getValue('boolean')).toBe(false)
})
