import { ref } from 'vue';
import { defineStore } from 'pinia'
import { remove } from 'lodash-es';

export type KeepCacheType = "view" | "tabs" | "crumb"

/**
 * @description 页面缓存. 当页面存在打开页面操作时，调用addKeepAlive，将页面缓存起来，当存在关闭操作时，将页面从缓存当中移除
 * 关闭的面包屑，关闭的tabs对应的面包屑页面都应该移除（一般无需记录，关闭之后页面不再存在）
*/
export const useKeepLiveStore = defineStore('viewCaches', () => {
  const isCache = eval(import.meta.env.VITE_APP_KEEPLIVE)
  const keepAliveViews = ref<string[]>([])

  // 新增keep alive 缓存页面
  const add = (routerName: string | string[]) => {
    Array.isArray(routerName) ? keepAliveViews.value.push(...routerName) : keepAliveViews.value.push(routerName)
  }

  // 删除keep alive 缓存页面
  const del = (routerName: string | string[]) => {
    const names = Array.isArray(routerName) ? routerName : [routerName]
    remove(keepAliveViews.value, (name) => {
      return names.includes(name)
    })
  }

  // 清空keeplive 缓存页面
  function clear() {
    keepAliveViews.value.length = 0
  }

  return {
    isCache,
    caches: isCache ? keepAliveViews : [],
    add,
    del,
    clear
  }
})
