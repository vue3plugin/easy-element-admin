<template>
  <div class="right">
    <el-space :size="30">
      <el-space>
        <el-icon>
          <Setting />
        </el-icon>
        <div>
          设置
        </div>
      </el-space>
      <el-space>
        <el-icon>
          <Avatar />
        </el-icon>
        <div>欢迎您：张三</div>
      </el-space>
    </el-space>
  </div>
</template>
<script lang="ts" setup>
import { Avatar, Setting } from "@element-plus/icons-vue"
</script>
<style lang="scss" scoped>
.right {
  font-size: 18px;
}
</style>