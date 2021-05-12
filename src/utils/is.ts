const getType = (v: any): string => {
  return Object.prototype.toString.call(v).slice(8, -1)
}

export const isObject = (v: any) => {
  return getType(v) === 'Object'
}

export const isUndefined = (v: any) => {
  return getType(v) === 'Undefined'
}

export const isDefined = (v: any) => {
  return !isUndefined(v)
}
