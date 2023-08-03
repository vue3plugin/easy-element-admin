<template>
  <div class="tab-scroll">
    <el-icon class="tab-scroll--left" @click="setScrollLeft(-SCROLL_RANGE)">
      <arrow-left-bold class="tab-scroll--left__arrow" />
    </el-icon>
    <el-scrollbar height="32px" :minSize="1" style="width: calc(100% - 10px);" ref="scrollBar">
      <div style="white-space: nowrap;">
        <th-layout-tab-item :closable="item.key != DEFAULT_ACTIVE_MENU" :key="item.key" v-for="(item) in tabStore.tabs"
          :label="item.title" :name="item.routeName" :active="active == item.routeName" @close="removeTab"
          @select="tabChange" />
      </div>
    </el-scrollbar>
    <el-icon class="tab-scroll--right" @click="setScrollLeft(SCROLL_RANGE)">
      <arrow-right-bold class="tab-scroll--right__arrow" />
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import { useLayoutTabsStore } from '@/stores/layoutTabs';
import { computed, ref, unref } from 'vue';
import ThLayoutTabItem from "./ThLayoutTabItem.vue"
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue"
import { DEFAULT_ACTIVE_MENU } from "@/utils/const"
import { useTabs } from "@/router/tabs"
const tabs = useTabs();
const tabStore = useLayoutTabsStore()
const active = computed(() => tabStore.active?.routeName)

function removeTab(name: string) {
  tabs.close(name)
}

function tabChange(name: string) {
  tabs.next(name)
}

// -----------------滚动条相关控制---------------------------
const scrollBar = ref()
const SCROLL_RANGE = 180 // 左右滑动变化幅度
// 左右滑动事件
function setScrollLeft(x: number) {
  const left = unref(scrollBar).wrapRef.scrollLeft
  unref(scrollBar).setScrollLeft(left + x)
}
</script>
<style lang="scss" scoped>
.tab-scroll {
  display: flex;
  align-items: center;
  // width: calc(100vw - 250px);

  @mixin arrow() {
    &__arrow {
      color: thVar.$th-word-search;
      cursor: pointer;
    }
  }

  &--left {
    margin-right: 16px;
    @include arrow()
  }

  &--right {
    margin-left: 16px;
    @include arrow()
  }
}
</style>