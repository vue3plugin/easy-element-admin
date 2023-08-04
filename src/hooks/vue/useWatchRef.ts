import { computed, ref, watch, type Ref } from "vue"

/**
 * 监听组件内某个数据的变化, 并返回一个ref, 并且数据发生变化时回填组件内数据
*/
export function useWatchRef<T>(_ref: Ref, key: string) {
    const target = ref<T>()
    watch(computed(() => _ref.value ? _ref.value[key] : undefined), (t) => target.value = t)
    watch(target,(t)=> _ref.value[key] = t)
    return target
}