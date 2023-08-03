
<template>
  <el-breadcrumb separator="/" v-if="breadcrumbs.length > 0">
    <el-breadcrumb-item :to="{ name: crumb.routeName }" v-for="crumb in breadcrumbs" :key="crumb.routeName">{{ crumb.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { useBreadcrumb } from '@/router/breadcrumb';
const { breadcrumbs } = useBreadcrumb()
</script>