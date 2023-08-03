import { unref, computed } from 'vue';
import { defineStore } from 'pinia'
import { useSessionStorage } from '@vueuse/core';
import { DEFAULT_ACTIVE_MENU } from '@/utils/const';


export interface TabsInterface {
  title: string;
  key: string;
  routeName: string;
  active: boolean; // 是否激活状态
  index?: number; // 序号
}

const defTab: TabsInterface = {
  key: DEFAULT_ACTIVE_MENU,
  routeName: DEFAULT_ACTIVE_MENU,
  title: "首页",
  active: true
}

export const useLayoutTabsStore = defineStore('layoutTabs', () => {

  const tabs = useSessionStorage<TabsInterface[]>("th-front-sys-tabs", [defTab])

  const active = computed(() => unref(tabs).find(tab => tab.active) || defTab)

  function addMultipleTab(record: TabsInterface) {
    const { key } = record;
    //判断是否已存在
    const existTab = unref(tabs).some(item => {
      return item.key == key
    })
    //如果存在则不追加
    if (!existTab) {
      const crecord = { ...record, active: true }
      unref(tabs).push(crecord)
    }
    //设置当前活跃的tabs
    unref(tabs).forEach((element, index) => {
      if (element.key == key) {
        element.active = true
        //设置当前活跃元素
        // active.value = { ...element, index }
      } else {
        element.active = false
      }
    });
  }

  function initMultipleTab() {
    tabs.value = []
    // active.value = undefined
  }

  function closeMultipleTab(record: TabsInterface) {
    const { key } = record
    tabs.value = unref(tabs).filter(item => item.key !== key)
  }

  return {
    active, tabs, addMultipleTab, initMultipleTab, closeMultipleTab
  }
})
