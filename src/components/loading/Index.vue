<template>
    <Arrowhead v-if="typeName == 'arrowhead'">
        <slot v-for="(slot, key) in slots" :name="key" :slot="slot"></slot>
    </Arrowhead>
    <Circle v-else-if="typeName == 'circle'">
        <slot v-for="(slot, key) in slots" :name="key" :slot="slot"></slot>
    </Circle>
    <Chrysanthemum v-else>
        <slot v-for="(slot, key) in slots" :name="key" :slot="slot"></slot>
    </Chrysanthemum>    
</template>
<script setup lang="ts">
import Chrysanthemum from "./Chrysanthemum.vue"
import Arrowhead from './Arrowhead.vue'
import Circle from './Circle.vue'
import { useSlots } from 'vue';
const props= defineProps({
    typeName:{
        type: String,
        default: 'chrysanthemum'
    }
})
const slots = useSlots()
</script>