import path from 'path'
import {removeSync} from 'fs-extra'
import {json} from '../index'
import dayjs from 'dayjs'

test('json read', () => {
  const jsonObject = json().readFile(path.resolve(__dirname, './json.json'))
  const json2Object = json().readFile(path.resolve(__dirname, './json2.json'))
  expect(jsonObject.get('boolean')).toBe(true)
  expect(jsonObject.get('string')).toBe('string')
  expect(jsonObject.get('number')).toBe(1024)
  expect(jsonObject.get('object.number')).toBe(2048)
  expect(json2Object.get('null')).toBe(null)
})

test('json set', () => {
  const jsonObject = json().readFile(path.resolve(__dirname, './json.json'))
  jsonObject.set('date', dayjs().format('YYYY-MM-DD'))
  jsonObject.set('object', {
    boolean: false
  })
  jsonObject.saveFile(path.resolve(__dirname, 'x.json'), {
    override: true
  })

  const xObject = json().readFile(path.resolve(__dirname, './x.json'))
  expect(xObject.get('date')).toBe(dayjs().format('YYYY-MM-DD'))
  expect(xObject.get('object.boolean')).toBe(false)
})

test('json create', () => {
  const filePath = path.resolve(__dirname, './create/json/create.json')
  const writableFalseFilePath = path.resolve(__dirname, './writable-false.json')
  json()
    .set('date', dayjs().format('YYYY-MM-DD'))
    .set('object', {
      number: 4096
    })
    .saveFile(filePath, {
      override: true
    })
  json()
    .set('object', {
      number: 8192
    })
    .saveFile(writableFalseFilePath)

  const createObject = json().readFile(filePath)
  expect(createObject.get('date')).toBe(dayjs().format('YYYY-MM-DD'))
  expect(createObject.get('object.number')).toBe(4096)

  const writableFalseFilePathObject = json().readFile(writableFalseFilePath)
  expect(writableFalseFilePathObject.get('object.number')).toBe(4096)

  removeSync(path.resolve(__dirname, './create'))
})

