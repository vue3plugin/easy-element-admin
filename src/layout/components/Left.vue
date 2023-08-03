<template>
  <div class="layout-top--left">
    <div class="layout-top--left-logo"></div>
    <div class="layout-top--left-title">某某某管理平台</div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.layout-top {
  &--left {
    display: flex;

    &-logo {
      height: 38px;
      width: 127px;
      background-color: #676767;
      margin-right: 15px;
    }

    &-title {
      font-size: 28px;
      color: #FFF;
    }
  }
}
</style>