<template>
  <div class="common_module w-full box-border">
    <div class="common_header box-border" v-if="title">
      <div class="common_header_border flex items-center justify-between">
        <div class="common_header_border_title flex h-full">
          <slot name="title">
            <div :style="{ color: link ? '#00aa94' : '' }">{{ title }}</div>
          </slot>
        </div>
        <div>
          <slot name="extra"></slot>
        </div>
      </div>
    </div>
    <div class="common_content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>


defineProps({
  title: {
    default: "未命名",
    type: String,
  },
  subBarHight: {
    // 子模块方块的高度
    default: "16px",
    type: String,
  },
  link: {
    default: false, //标题是否为链接色
    type: Boolean,
  },
})
</script>
<style scoped lang="scss">
.common_module {
  background: thVar.$th-bkg-primary;

  .common_header {
    width: 100%;
    font-size: 16px;
    height: 64px;
    padding: 0 20px;

    .common_header_border {
      position: relative;
      padding: 15px 0;
      border-bottom: 2px thVar.$th-word-default dashed;
    }
  }

  .common_content {
    padding: 15px 24px;
  }
}</style>
