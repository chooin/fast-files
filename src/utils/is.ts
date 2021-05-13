const getType = (v: any): string => {
  return Object.prototype.toString.call(v).slice(8, -1)
}

export const isObject = (v: any): boolean => {
  return getType(v) === 'Object'
}

export const isUndefined = (v: any): boolean => {
  return getType(v) === 'Undefined'
}

export const isDefined = (v: any): boolean => {
  return !isUndefined(v)
}
