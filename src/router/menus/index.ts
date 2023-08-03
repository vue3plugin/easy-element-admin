import { useCommonStore } from "@/stores/common";
import { useRouter } from "vue-router";
import { initMenuPermissions } from "@/permissions";
import { computed, onMounted, ref } from 'vue';
import { useLayoutTabsStore } from "@/stores/layoutTabs";
import { treeMapEach } from "@/utils/treeHelper";

const modules = import.meta.glob('./modules/*.ts', { eager: true });
const staticMenus: MenuOpts[] = []
// 加入到菜单集合中
Object.keys(modules).forEach((file) => {
    // @ts-ignore
    const menu = modules[file].default || [];
    staticMenus.push(...menu)
});

// 异步获取前端或者后端配置的菜单
export async function getAsyncMenu() {
    const router = useRouter()
    const common = useCommonStore()

    const isAuthMenuRequired = import.meta.env.VITE_APP_AUTH_MENU_REQUIRED

    // 系统不需要登录权限则直接返回静态菜单
    if (!isAuthMenuRequired) {
        common.menuList = staticMenus
    }

    // 需要登录权限菜单,则判断是否已经登录
    if (isAuthMenuRequired && common.isLogin) {
        const { menus } = await initMenuPermissions(router, common.menuList)
        common.menuList = menus
    }
}

export function useMenus() {
    const common = useCommonStore()
    const tabStore = useLayoutTabsStore()

    onMounted(() => {
        getAsyncMenu()
    })

    return {
        activeName: computed(() => tabStore.active.routeName),
        sysMenus: computed(() => common.menuList)
    }
}

// 菜单相关操作
export function useMenu() {
    const tabStore = useLayoutTabsStore()
    const commonStore = useCommonStore()

    const router = useRouter()
    const activeName = ref()

    /**
     * @param raw 按钮菜单选项
    */
    function next(raw: MenuOpts) {
        // 跳转到对应页面
        router.push({ name: raw.routeName })

        // 当前激活的名称
        activeName.value = raw.routeName

        // 激活对应的tabs 页面
        tabStore.addMultipleTab({
            key: raw.routeName,
            routeName: raw.routeName,
            title: raw.title,
            active: true
        })

        // 设置菜单属性为active
        treeMapEach(commonStore.menuList, {
            conversion(node) {
                if (node.routeName == raw.routeName) {
                    node.active = true
                } else {
                    node.active = false
                }
            }
        })
    }

    return {
        next,
        activeName
    }
}