<template>
  <el-menu :default-active="activeName">
    <template v-for="menu in sysMenus">
      <sub-menu :menu="menu"></sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import SubMenu from "./SubMenu.vue";
import { useMenus } from "@/router/menus"

const { activeName, sysMenus } = useMenus();
</script>
