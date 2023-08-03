/**
 * key : 父级路由名称，可理解为挂载到哪个页面之下
 * val : 菜单配置
*/
const breadcrumb: Recordable<breadcrumbOpts[]> = {
    testindexindex: [
        {
            title: "详细页面",
            routeName: "testdetails2indexview",
        }
    ]
}

export default breadcrumb