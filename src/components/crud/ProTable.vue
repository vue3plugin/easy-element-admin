<template>
    <el-card>
        <template #header>
            <div class=" flex justify-between">
                <div>
                    <slot name="title">{{ title }}</slot>
                </div>
                <div class=" inline-flex gap-2 items-center">
                    <slot name="extra"></slot>
                    <TableTips v-model:size="size" v-model:columnChecked="columnChecked" :columns="tablecolumns" />
                </div>
            </div>
        </template>
        <el-table :data="data" stripe style="width: 100%" @selection-change="handleSelectionChange" v-bind="{ size }">
            <el-table-column v-if="selection"  type="selection" width="55" />
            <template v-for="column in _tablecolumns" :key="column.key">
                <el-table-column :label="column.label" :prop="column.key" v-if="!column.hidden"
                    v-bind="{ ...(column.props || {}) }">
                    <template #default="{ row, $index }">
                        <slot :name="`table-${column.key}`" :record="row" :text="row[column.key]" :index="$index">
                            {{ row[column.key] }}
                        </slot>
                    </template>

                </el-table-column>
            </template>

            <el-table-column #default="{ row, $index }" :width="actionWidth">
                <div ref="tableAction" class="flex justify-between">
                    <slot name="action" :record="row" :index="$index"></slot>
                </div>
            </el-table-column>
        </el-table>
    </el-card>
</template>
  
<script lang="ts" setup>
import type { TableColumn } from './type';
import { ref, unref, computed } from 'vue';
import TableTips from "./components/TableTips.vue"

defineProps<{
    selection?: boolean;
    title?: string;
}>()

const tableAction = ref<HTMLElement>()

const actionWidth = computed(() => {
    if (!unref(tableAction)) return 0
    const length = unref(tableAction)?.children?.length || 0
    let width = 0
    for (const table of unref(tableAction)?.children || []) {
        width += (table as HTMLElement).offsetWidth
    }
    return width + ((length - 1) * 10)
})


const tablecolumns = ref<TableColumn[]>([])
const data = ref<any[]>([]) // 外部传入的数据
const selectedData = ref<any[]>([]) // 选中的data

// ------------------属性系列------------------------------
const size = ref()
const columnChecked = ref<string[]>([]) // 展示的列

const _tablecolumns = computed(() => {
    if (unref(columnChecked).length === 0) return unref(tablecolumns)

    const _result: TableColumn[] = []

    unref(tablecolumns).forEach(item => {
        if (unref(columnChecked).includes(item.key)) {
            _result.push(item)
        }
    })

    return _result
})

const handleSelectionChange = (val: []) => {
    selectedData.value = val
}

defineExpose({
    tablecolumns,
    data,
    selectedData,
    size,
    columnChecked,
})
</script>