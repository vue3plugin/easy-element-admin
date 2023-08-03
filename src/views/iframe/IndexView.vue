

<template>
  <iframe :src="src" v-if="src" :frameborder="0" width="100%" style="height:calc(100vh - 160px)"></iframe>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()

const src = ref();
onMounted(() => {
  src.value = route.query.src as string
})
</script>
