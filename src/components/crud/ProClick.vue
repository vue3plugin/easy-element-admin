
<template>
    <div class="inline-block" @click="handleProClick">
        <template v-if="type == 'popconfirm'">
            <el-popconfirm v-bind="xProps">
                <template #reference>
                    <slot></slot>
                </template>
            </el-popconfirm>
        </template>
        <template v-else-if="type == 'dialog'">
            <el-dialog v-model="visible" v-bind="xProps" @close="cancelMask" append-to-body>
                <template #header>
                    <slot name="dialog-header"></slot>
                </template>
                <template #footer>
                    <slot name="dialog-footer"></slot>
                </template>
                <template>
                    <slot name="dialog-default"></slot>
                </template>
            </el-dialog>
            <slot></slot>
        </template>
        <template v-else-if="type == 'drawer'">
            <el-drawer v-model="visible" v-bind="xProps" append-to-body>
                <template #header>
                    <slot name="drawer-header"></slot>
                </template>
                <template #default>
                    <slot name="drawer-default"></slot>
                </template>
                <template #footer>
                    <slot name="drawer-footer"></slot>
                </template>
            </el-drawer>
            <slot></slot>
        </template>
        <template v-else>
            <div>
                <slot></slot>
            </div>
        </template>
    </div>
</template>
<script lang="ts" setup>
import type { ConfirmType, ProActionMixProps } from './type';
import { ref } from 'vue';

type ProActionProps = {
    type?: ConfirmType; // 是否弹出确认框
    xProps: ProActionMixProps[ProActionProps["type"]];
}

const props = withDefaults(
    defineProps<ProActionProps>(),
    {
        type: "custom",
        xProps: () => ({}),
    })

const emit = defineEmits<{
    (e: "onToggle", val: boolean): void;
    (e: "click",): void;
}>()

const visible = ref(false)

function handleProClick(e: Event) {
    e.stopPropagation()
    if (props.type == 'dialog' || props.type == 'drawer') {
        visible.value = true
    }
    emit("click")
}

// 关闭弹窗或者抽屉
function cancelMask() {
    if (props.type == 'dialog' || props.type == 'drawer') {
        visible.value = false
    }
}
</script>