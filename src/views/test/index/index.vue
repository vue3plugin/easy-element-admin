
<template>
  我是测试主页
  <el-input v-model="demoInput" />
  <el-button type="primary" @click="onClick">点击下钻详情页面</el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const demoInput = ref("")

const router = useRouter()

defineOptions({
  route: {}
})

function onClick(){
  router.push({
    name: "testdetails2indexview"
  })
}
</script>