import { findPath, treeMapEach } from '@/utils/treeHelper';
import { useMenus } from '../menus';
import { computed, unref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import { useKeepLiveStore } from '@/stores/keepLive';

const modules = import.meta.glob('./modules/*.ts', { eager: true });
const staticBreads: Recordable<breadcrumbOpts[]> = {}
// 加入到面包屑集合中
Object.keys(modules).forEach((file) => {
    // @ts-ignore
    const bread = modules[file].default || {};
    Object.assign(staticBreads, bread)
});

// 查找当前面包屑的全部子元素，子元素应当在cache 当中移除
function _filter(breadcrumbs: breadcrumbOpts[], routeName: string) {
    let _breadcrumbs: breadcrumbOpts[] = [];

    // 查找面包屑存在的节点
    function breadcrumbsFilter(breadcrumbs: breadcrumbOpts[], routeName: string) {
        breadcrumbs.forEach(node => {
            if (node.routeName == routeName && node.children) {
                for (const breadcrumb of node.children) {
                    _breadcrumbs.push(breadcrumb)
                    breadcrumbsFilter(breadcrumb.children || [], breadcrumb.routeName)
                }
            } else {
                breadcrumbsFilter(node.children || [], routeName)
            }
        })
    }

    breadcrumbsFilter(breadcrumbs, routeName)

    return _breadcrumbs
}

export function useBreadcrumb() {
    const keepStore = useKeepLiveStore()
    const { sysMenus } = useMenus();
    const route = useRoute()


    function getParentPath<T = Recordable>(treeData: T[], routeName: string) {
        const menuList = findPath(treeData, (n) => n.routeName === routeName) as breadcrumbOpts[];
        return menuList;
    }

    const breadcrumbs = computed(() => {
        const menus = cloneDeep(unref(sysMenus))

        // 拼接扩展的面包屑
        menus.forEach(menu => {
            treeMapEach(menu, {
                conversion(node) {
                    const menuTree = staticBreads[node.routeName]
                    if (menuTree) {
                        node.children = menuTree
                    }
                }
            })
        })

        return getParentPath<MenuOpts>(unref(menus), route.name as string) || []
    })

    /**
     * 根据当前面包屑变化，删除或者移除对应页面缓存
    */
    watch(() => route.name, (routerName) => {
        keepStore.add(routerName as string)
        const keeps = _filter(breadcrumbs.value, routerName as string)
        keepStore.del(keeps.map(item=> item.routeName))
    })
    
    return {
        breadcrumbs
    }
}

/**
 * @description 向页面路由注入要查询的参数
 */
export function useBreadcrumbQuery() {
    //
}

