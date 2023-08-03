const menus: MenuOpts[] = [
    {
        title: "面板",
        routeName: "dashboard",
        children: []
    },
    {
        title: "测试",
        routeName: "",
        children: [
            {
                title: "测试首页",
                routeName: "testindexindex",
            },
            {
                title: "测试详细页面",
                routeName: "testdetailsindexview",
            },
            {
                title: "测试详细条目",
                routeName: "testdetailsitemindexview",
            },
        ]
    },
]


export default menus