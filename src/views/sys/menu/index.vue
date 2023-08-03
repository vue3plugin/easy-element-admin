
<template>
    <!-- 菜单表 -->
    <table :border="1">
        <tr>
            <th>路由名称</th>
            <th>路径</th>
        </tr>
        <tr v-for="c in childrenRouteModuleList" :key="c.name">
            <td>{{ c.name }}</td>
            <td>{{ c.path }}</td>
        </tr>
    </table>
</template>
<script setup lang="ts">
import { childrenRouteModuleList } from '@/router/routes';

defineOptions({
    route: {}
})
</script>