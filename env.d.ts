/// <reference types="vite/client" />
import { RouteRecordRaw } from "vue-router"
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}



declare module '*.svg'

declare type Recordable<T = any> = Record<string, T>;

declare module "@element-plus/icons-vue"

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string // 网站名称
    readonly VITE_APP_GETWAY: string // 网关名称
    readonly VITE_APP_KEEPLIVE: string // 是否启用keeplive缓存
    readonly VITE_APP_AUTH_TOEKN: string // 是否启用keeplive缓存
    readonly VITE_APP_AUTH_MENU_REQUIRED: boolean // 是否需要登录获取菜单
  }
}