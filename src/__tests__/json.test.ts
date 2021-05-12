import path from 'path'
import {json} from '../index'

test('json', () => {
  expect(json.read(path.resolve(__dirname, './json.json')).get('number')).toBe(1024)
})