
import { defineStore } from 'pinia'
import { MenuEnum } from '@/enums/menu';
import { LocalStoreEnum } from '@/enums/localstore';
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';


// 页面缓存 等页面公共配置
export const useCommonStore = defineStore('commonStore', () => {

  // 菜单模式
  const menuMode = ref<MenuEnum>(MenuEnum.FRONT)
  // 前端配置的菜单
  const menuList = ref<MenuOpts[]>([])

  // 是否登录成功
  const isLogin = useLocalStorage(LocalStoreEnum.LOGIN_FLAG, false)


  return {
    menuMode,
    menuList,
    isLogin,
  }
})
