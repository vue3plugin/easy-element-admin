import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic';
import { PageEnum } from '@/enums/page';
import { toLower } from 'lodash-es';
import type { RouteRecordRaw } from 'vue-router';
import { LAYOUT } from './cons';

const modules = import.meta.glob('@/views/**/*.vue', { eager: true });

export const childrenRouteModuleList: RouteRecordRaw[] = [];
export const rootRouteModuleList: RouteRecordRaw[] = []; // 位于根目录
// 加入到路由集合中
Object.keys(modules).forEach((file) => {
    // @ts-ignore
    const component = modules[file].default || {};
    const route = component.route
    if (route) {
        const path = toLower((file.match(/^.*?views(.*?).vue$/) || [])[1] || "") // 生成路由path

        // route meta 塞入默认的中文名称
        route.meta = route.meta || {}
        route.meta.title = route.meta.title || route.cname

        component.name = component.name || path.split("/").join("")

        const _route = {
            name: component.name,
            path: path,
            component,
            ...route,
        }

        route.root ? rootRouteModuleList.push(_route) : childrenRouteModuleList.push(_route)
    }
});

// 根路由
export const RootRoute: RouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'Root',
    },
    component: LAYOUT,
    ...rootRouteModuleList,
    children: childrenRouteModuleList,
}

export const LoginRoute: RouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: import('@/views/sys/login/IndexView.vue'),
    meta: {
        title: "登录",
    },
};


export const basicRoutes = [
    RootRoute,
    REDIRECT_ROUTE,
    PAGE_NOT_FOUND_ROUTE,
    LoginRoute,
];
