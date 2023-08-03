<template>
  <div class="layout">
    <div class="layout-top">
      <Left />
      <Right />
    </div>
    <div class="layout-main">
      <div class="layout-main-menu">
        <Menu />
      </div>
      <div class="layout-main-content">
        <div class="layout-main-content__action">
          <th-layout-tabs />
          <th-breadcrumb />
        </div>
        <div class="layout-main-content__view">
         
          <router-view v-slot="{ Component }">
            <keep-alive :include="keepLiveStore.caches">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import ThBreadcrumb from '@/components/ThBreadcrumb.vue';
import ThLayoutTabs from '@/components/ThLayoutTabs.vue';
import Left from './components/Left.vue';
import Right from './components/Right.vue';
import Menu from './components/Menu.vue';

import { useKeepLiveStore } from '@/stores/keepLive';

const keepLiveStore = useKeepLiveStore()

</script>
<style lang="scss" scoped>
$top-height: 70px; // 顶部状态栏高度

.layout {
  height: 100%;

  &-top {
    height: $top-height;
    background: linear-gradient(165deg, #00AA94, #038372);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 30px;
    color: thVar.$th-bkg-primary;
  }

  &-main {
    display: flex;
    height: calc(100% - $top-height);

    &-menu {
      width: 250px;
      height: 100%;
      background-color: thVar.$th-bkg-primary;
    }

    &-content {
      flex: 1;
      overflow-y: auto;

      &__action {
        &>div:not(:last-child) {
          margin-bottom: 12px;
        }
      }

      &__action,&__view {
        width: 100%;
        padding: 7px 20px;
        box-sizing: border-box;
      }

      &_view {
        padding-top: 11px;
      }
    }
  }
}
</style>
