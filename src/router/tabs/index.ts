import { useLayoutTabsStore } from "@/stores/layoutTabs";
import { computed, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { PAGE_NOT_FOUND_NAME } from "../routes/cons";

export function useTabs() {
    const tabStore = useLayoutTabsStore()
    const { push } = useRouter()
    const route = useRoute()


    /**
    * @description 用于监测当前路由的变化，如果路由发生变化，但是标签导航栏激活状态没有发生变化，则说明当前导航栏对应的路由发生了变化。
    */
    watch([() => route.name, () => tabStore.active], ([name, active], [preName, preActive]) => {
        if (name != preName && active.key == preActive.key) {
            tabStore.active.routeName = name as string
        }
    })

    /**
     * @param tabName 本系统当中是指routeName
    */
    function next(tabName: string) {
        const curTab = tabStore.tabs.find(item => item.routeName === tabName)
        curTab && tabStore.addMultipleTab(curTab)
        try {
            push({ name: tabName as string })
        } catch (error) {
            push({ name: PAGE_NOT_FOUND_NAME })
            console.error(error)
        }
    }

    /**
     * @param tabName 本系统当中是指routeName
     * @description 移除tabs切换，
    */
    function close(tabName: string) {
        const curTab = tabStore.tabs.find(item => item.routeName === tabName)
        const curTabIndex = tabStore.tabs.findIndex(item => item.routeName === tabName)

        if (curTab?.active) {
            const preTab = tabStore.tabs[curTabIndex - 1] // 上一个tab 按钮
            tabStore.addMultipleTab(preTab)

            try {
                push({ name: preTab.routeName as string })
            } catch (error) {
                push({ name: PAGE_NOT_FOUND_NAME })
                console.error(error)
            }
        }

        if (curTab) tabStore.closeMultipleTab(curTab)
    }

    return {
        tabs: computed(() => tabStore.tabs),
        next,
        close,
    }
}