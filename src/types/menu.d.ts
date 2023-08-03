interface MenuOpts {
    title: string;
    routeName: string;
    orderNo?: string;
    meta?: {
        cache?: boolean;      // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        icon?: string;       // 设置该路由的图标，对应路径src/assets/icons/svg
        perm?: boolean;  // 是否有跳转操作权限
        layout?: "layout-in" | "layout-iframe" | "in" | "iframe" | "blank-in" | "blank-iframe";
        // layout-in 系统内页面 layout-iframe 外部内嵌页面 in 内部页面无布局 iframe 外部页面无布局，新页面打开blank-in，blank-out
        menu?: boolean; // 是否是菜单
    },
    children?: MenuOpts[]
}

interface breadcrumbOpts extends MenuOpts{
    query?: Recordable<string | number>
}