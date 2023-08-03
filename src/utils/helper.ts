import { isString } from "lodash-es";

export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return reg.test(path);
}

/**
 * 用于替换列表中的字段的键值
 * @param arr 列表对象
 * @param replace 替换的键值，替换的值 { key: replaceKey }
*/
export function replaceFields<T extends AnyObject, U extends { [K in keyof T]?: any }>(arr: T[], replace: U) {
  for (const a of arr) {
    for (const [field, replaceField] of Object.entries(replace)) {
      if (isString(replaceField)) {
        Reflect.set(a, replaceField, a[field])
        Reflect.deleteProperty(a, field)
      }
    }
  }

  return arr as (T & AnyObject)[]
}
