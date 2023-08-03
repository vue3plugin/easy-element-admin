<template>
  <div class="th-tab" :class="{ active }" @click="selectTab(name)">
    <div class="th-tab-dot" :class="{ active }"></div>
    <div class="th-tab-content" :class="{ active }">{{ label }}</div>
    <div class="th-tab-close" @click="closeTab(name)">
      <el-icon v-if="closable">
        <CloseBold :class="{ active }" class="th-tab-close__icon" />
      </el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CloseBold } from "@element-plus/icons-vue"

defineProps({
  name: {
    default: "",
    type: String
  },
  label: {
    default: "",
    type: String
  },
  active: {
    default: false,
    type: Boolean
  },
  closable: {
    default: false,
    type: Boolean
  },
})

const emit = defineEmits<{
  (e: "close", name: string): void;
  (e: "select", name: string): void
}>()

const closeTab = (name: string) => emit("close", name)
const selectTab = (name: string) => emit("select", name)
</script>
<style lang="scss" scoped>

.th-tab {
  display: inline-flex;
  align-items: center;
  background-color: thVar.$th-bkg-primary;
  width: 180px;
  height: 32px;
  justify-content: space-between;

  box-sizing: border-box;
  padding: 0 15px;
  cursor: pointer;

  &.active {
    background-color: rgba($color: thVar.$th-secondary-green, $alpha: 0.1);
  }

  &:not(:last-child) {
    margin-right: 10px;
  }

  &-dot {
    width: 6px;
    height: 6px;
    background-color: thVar.$th-word-default;
    border-radius: 3px;
    float: left;

    &.active {
      background-color: thVar.$th-secondary-green;
    }
  }

  &-content {
    color: thVar.$th-word-search;
    font-size: 16px;

    &.active {
      color: thVar.$th-secondary-green;
    }
  }

  &-close {
    &__icon {
      color: thVar.$th-word-search;
      &.active {
        color: thVar.$th-secondary-green;
      }
    }
  }
}
</style>