<template>
    <el-sub-menu :index="menu.routeName" v-if="menu.children && menu.children.length > 0">
        <template #title>
            <span class="truncate" :title="menu.title">{{ menu.title }}</span>
        </template>
        <template v-for="m in menu.children" :key="m.routeName">
            <th-sub-menu :menu="m"></th-sub-menu>
        </template>
    </el-sub-menu>
    <template v-else>
        <el-menu-item :index="menu.routeName" @click="toLinkByMenuType(menu)">
            <span class="truncate" :title="menu.title">{{ menu.title }}</span>
        </el-menu-item>
    </template>
</template>
<script setup lang="ts">
import { useMenu } from '@/router/menus';
import type { PropType } from 'vue';

defineProps({
    menu: {
        type: Object as PropType<MenuOpts>,
        default: () => ({})
    },
})

defineOptions({
    name: "ThSubMenu"
})

const m = useMenu()

function toLinkByMenuType(raw: MenuOpts) {
    m.next(raw)
}
</script>