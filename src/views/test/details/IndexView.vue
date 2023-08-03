<template>
  我是详情页
  <span style="color: blue;" @click="router.push({ name: 'testDetailItempath' })">testDetailItempath</span>
  <el-input v-model="demoInput" />
</template>
<script lang="ts" setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  route: {}
})

const router = useRouter()
const demoInput = ref("")

</script>