<template>
    <el-form :model="columns" ref="form" label-width="auto">
        <el-row :gutter="10">
            <template v-for="(c, idx) in columns">
                <el-col :span="c.span || span" v-if="expend || (idx + 1) <= (24 / span)">
                    <el-form-item :label="c.label" :rules="isRule ? c.rules || [] : []" :prop="[idx, 'value']">
                        <component :is="c.is" v-model="c.value" :style="{ width: '100%' }" v-bind="c.props ? c.props : {}">
                            <slot></slot>
                        </component>
                    </el-form-item>
                </el-col>
            </template>
            <el-col :span="span" v-if="btnPosition == 'col'">
                <el-form-item>
                    <slot></slot>
                </el-form-item>
            </el-col>
            <div v-else-if="btnPosition == 'float-end'" class=" absolute right-0">
                <slot></slot>
            </div>
        </el-row>
        <el-row v-if="btnPosition == 'right'" class="justify-end">
            <slot></slot>
        </el-row>
        <el-row v-else-if="btnPosition == 'center'" class=" justify-center">
            <slot></slot>
        </el-row>
        <el-row v-else-if="btnPosition == 'left'">
            <slot></slot>
        </el-row>

    </el-form>
</template>
<script setup lang="ts" >
import type { IBaseForm } from "./type";
import { useVModel } from "@vueuse/core";
import { ref, onMounted } from 'vue';
const form = ref()

const props = withDefaults(defineProps<IBaseForm>(), {
    span: 4,
    btnPosition: "right",
    expend: false,
    isRule: true,
})

const emit = defineEmits()

defineExpose({
    form
})

onMounted(() => {
    console.log({ form })
})

const columns = useVModel(props, "columns", emit)

/**
 * @description 收集columns的字段
*/
setTimeout(() => {
    reset()
}, 200)

// 重置数据
function reset() {
    for (const column of columns.value) {
        column.value = column.resetVal || ""
    }
}
</script>