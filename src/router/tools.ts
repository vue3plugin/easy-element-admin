
import type { Router } from "vue-router";
import router from "."
import { PAGE_ANY_NAME } from "./routes/cons";
import { useLayoutTabsStore } from "@/stores/layoutTabs";

export function registerMenuPermissions(router: Router) {
    router.beforeEach(async (to, from, next) => {
        // 没有权限跳转到404页面
        if (to.name === "") {
            next({
                name: "404"
            })
            return
        }
        next()
    })
}

/**
 * @param _name  组件名称，返回一个伪组件，用于父级路由占位
*/
export const getParentLayout = (_name?: string) => {
    return () =>
        new Promise((resolve) => {
            resolve({
                name: _name || PAGE_ANY_NAME,
            });
        });
};

/**
 * @param raw 菜单对象,手动/指令切换菜单,点击菜单跳转到下一个页面
*/
function menuNextPage(raw: MenuOpts) {
    const tabStore = useLayoutTabsStore()
    router.push({ name: raw.routeName })
    tabStore.addMultipleTab({
        key: raw.routeName,
        routeName: raw.routeName,
        title: raw.title,
        active: true
    })
}