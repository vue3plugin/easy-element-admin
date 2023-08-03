<template>
    <BaseForm ref="ruleFormRef" v-bind="$attrs" :columns="columns" :expend="expend" :span="span"
        :btn-position="btnPosition">
        <el-space>
            <el-button @click="reset()">重置</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef.form)">{{ okText }}</el-button>
            <div class="flex items-center cursor-pointer" @click="expend = !expend"
                v-if="displayExpend && (24 / span) < columns.length">
                <template v-if="expend">
                    <span>收起</span>
                    <el-icon>
                        <ArrowUpBold />
                    </el-icon>
                </template>
                <template v-else>
                    <span>展开</span>
                    <el-icon>
                        <ArrowDownBold />
                    </el-icon>
                </template>
            </div>
        </el-space>
    </BaseForm>
</template>
<script setup lang="ts">
import { shallowRef, ref } from 'vue';
import { ArrowUpBold, ArrowDownBold } from "@element-plus/icons-vue"
import BaseForm from "./BaseForm.vue"
import type { IOperationBtn } from "./type";
import { useVModel } from "@vueuse/core";
import type { FormInstance } from 'element-plus/es';

const ruleFormRef = ref()

const props = withDefaults(defineProps<IOperationBtn>(), {
    span: 4,
    okText: "查询",
    displayExpend: true,
    btnPosition: "right"
})


const emit = defineEmits<{
    (e: "ok", value: Recordable): void
}>()


const columns = useVModel(props, "columns", emit)

// 重置数据
function reset() {
    for (const column of columns.value) {
        column.value = column.resetVal || ""
    }
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const obj = {}
            for (const column of columns.value) {
                obj[column.key] = column.value
            }
            emit("ok", obj)
        } else {
            console.log('error submit!', fields)
        }
    })
}

/**
 * 展开或者收起,
*/
const expend = shallowRef(true)

</script>