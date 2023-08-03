declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type Recordable<T = any> = Record<string, T>;


declare interface AnyObject {
  [idx: string]: any
}