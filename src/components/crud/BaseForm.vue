<template>
    <el-form :model="columns" ref="form" label-width="auto">
        <el-row :gutter="10">
            <template v-for="(c, idx) in columns">
                <el-col :span="c.span || span" v-if="expend || (idx + 1) <= (24 / span)">
                    <el-form-item :label="c.label" :rules="isRule ? c.rules || [] : []" :prop="[idx, 'value']">
                        <!-- 下拉框逻辑 -->
                        <template v-if="c.is == 'ElSelect'">
                            <component :is="c.is" v-model="c.value" :style="{ width: '100%' }"
                                v-bind="c.props ? c.props : {}">
                                <el-option v-for="item in c.data || []" :key="item[c.optionValue]"
                                    :label="item[c.optionLabel]" :value="item[c.optionValue]">
                                </el-option>
                            </component>
                        </template>
                        <template v-else>
                            <component :is="c.is" v-model="c.value" :style="{ width: '100%' }"
                                v-bind="c.props ? c.props : {}">
                            </component>
                        </template>
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
    <div class=""></div>
</template>
<script setup lang="ts" >
import type { IBaseForm } from "./type";
import { useVModel } from "@vueuse/core";
import { ref, onUnmounted } from 'vue';
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

const columns = useVModel(props, "columns", emit)

// 重置数据
function reset() {
    for (const column of columns.value) {
        column.value = column.resetVal || ""
    }
}

// 页面销毁清除数据
onUnmounted(() => {
    reset()
})
</script>