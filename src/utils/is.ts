const getType = (v: any): string => {
  return Object.prototype.toString.call(v).slice(8, -1)
}

export const isObject = (e) => {
  return getType(e) === 'Object'
}

export const isUndefined = (e) => {
  return getType(e) === 'Undefined'
}

export const isDefined = (e) => {
  return !isUndefined(e)
}
