<template>
    <el-card>
        <pro-form v-model:columns="formColumn.search" :span="6" @ok="submit" :btn-position="'float-end'" :is-rule="false" />
    </el-card>

    <ProTable selection ref="tableRef" class=" mt-4" title="人员表">
        <template #extra>
            <pro-click :type="'dialog'" :x-props="{ 'title': '' }">
                <template #dialog-default>
                    <pro-form v-model:columns="formColumn.add" :span="6" @ok="submit" :btn-position="'center'" />
                </template>
                <el-button>新增</el-button>
            </pro-click>
        </template>
        <template #table-input2="{ record }">
            {{ record }}
        </template>
        <template #action>
            <pro-click :type="'custom'" :x-props="{ 'title': '' }">
                <el-button>测试</el-button>
            </pro-click>
            <pro-click :type="'dialog'" :x-props="{ 'title': '22222222' }">
                <template #dialog-default>
                    <pro-form v-model:columns="formColumn.edit" :span="6" @ok="submit" :btn-position="'center'" />
                </template>
                <el-button>测试弹窗</el-button>
            </pro-click>
            <pro-click :type="'drawer'" :x-props="{ title: '测试抽屉', }">
                <template #drawer-default>
                    <pro-form v-model:columns="formColumn.edit" :span="24" ok-text="保存" @ok="submit"
                        :btn-position="'center'" :display-expend="false" />
                </template>
                <el-button>测试抽屉</el-button>
            </pro-click>
            <pro-click :type="'popconfirm'" :x-props="{ title: '确定要删除吗' }">
                <template #action>
                    <pro-form v-model:columns="formColumn.edit" :span="6" @ok="submit" :btn-position="'center'" />
                </template>
                <el-button>二次确认</el-button>
            </pro-click>
        </template>
    </ProTable>
</template>
<script lang="ts" setup>
import { ref } from 'vue';


import type { TableColumn } from '@/components/crud/type';
import { useProTable } from '@/components/crud/hooks/useProTable';

const tableRef = ref()
const columns = ref<TableColumn[]>([
    {
        label: "输入框",
        key: "input",
        search: true,
        edit: true,
        add: true,
        form: {
            value: "",
            is: "ElInput",
            resetVal: "222",
            rules: [
                { required: true, message: "请输入" }
            ],
            props: {
                'onUpdate:modelValue'(val) {
                    console.log(val)
                }
            }
        },
    },
    {
        label: "输入框1",
        key: "input2",
        edit: true,
        add: true,
        form: {
            value: "",
            is: "ElSelect",
            resetVal: "222",
            optionLabel: "key",
            optionValue: "value",
            data: [{ key: '张三', value: "123" }],
            rules: [
                { required: true, message: "请输入" }
            ],
        }
    },
    {
        label: "输入框2",
        key: "input3",
    },
    {
        label: "输入框3",
        key: "input4",
    },
    {
        label: "输入框4",
        key: "input5",
    },
    {
        label: "输入框5",
        key: "input6",
    },
])

const { formColumn, setTableData, selectedData } = useProTable(tableRef, columns)

setTableData([
    {
        input: 1223,
    },
    {
        input: 1223,
    },
    {
        input: 1223,
    },
    {
        input: 1223,
    },
    {
        input: 1223,
    },
    {
        input: 1223,
    },
    {
        input: 1223,
    },
    {
        input: 1223,
    },
    {
        input: 1223,
    },
    {
        input: 1223,
    },
])

function submit(row) {
    alert(JSON.stringify(row))
}

defineOptions({
    name: "dashboard",
    route: {}
})
</script>