<template>
    <el-tooltip content="上传" placement="top-start">
        <div @click="$emit('upload')">
            <el-icon>
                <Upload class=" cursor-pointer" />
            </el-icon>
        </div>
    </el-tooltip>
    <el-tooltip content="下载" placement="top-start">
        <div @click="$emit('download')">
            <el-icon>
                <Download class=" cursor-pointer" />
            </el-icon>
        </div>
    </el-tooltip>

    <el-popover placement="bottom" trigger="click" popper-class=" !p-0">
        <template #reference>
            <div>
                <el-tooltip content="密度" placement="top-start">
                    <el-icon>
                        <Switch class=" cursor-pointer" />
                    </el-icon>
                </el-tooltip>
            </div>
        </template>
        <el-card size="small">
            <template #header>密度</template>
            <el-radio-group v-model="size" class="ml-4">
                <el-radio label="large" value="large">宽松</el-radio>
                <el-radio label="default" value="default">正常</el-radio>
                <el-radio label="small" value="small">紧凑</el-radio>
            </el-radio-group>
        </el-card>

    </el-popover>

    <el-popover placement="bottom" popper-class=" !p-0" trigger="click"
        content="this is content, this is content, this is content">
        <template #reference>
            <div>
                <el-tooltip content="列设置" placement="top-start">
                    <el-icon>
                        <Setting class=" cursor-pointer" />
                    </el-icon>
                </el-tooltip>
            </div>
        </template>
        <el-card size="small">
            <template #header>列设置</template>
            <el-checkbox-group v-model="columnChecked">
                <template v-for="column in columns" :key="column.key">
                    <el-checkbox :label="column.key" v-if="!column.hidden">{{ column.label }}</el-checkbox>
                </template>
            </el-checkbox-group>

        </el-card>
    </el-popover>
</template>
<script lang="ts" setup>
import { Switch, Setting, Upload, Download } from "@element-plus/icons-vue"
import { useVModels } from '@vueuse/core';
import type { TableColumn } from '../type';

const props = withDefaults(defineProps<{
    size: 'large' | 'default' | 'small',
    columnChecked: string[],
    columns: TableColumn[],
}>(), {
    size: "default",
    columnChecked: () => []
})

const emit = defineEmits<{
    (e: 'download'): void;
    (e: 'upload'): void;
}>()

const { size, columnChecked } = useVModels(props, emit)
</script>