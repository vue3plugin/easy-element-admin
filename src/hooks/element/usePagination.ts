import { ref } from "vue";

export function usePagination() {
    const current = ref(1)
    const size = ref(1)
    const total = ref(1)

    function changeSize(_size: number) {
        size.value = _size
    }

    function changeCurrent(_current: number) {
        if (_current <= 1) {
            current.value = 1
            return
        }
        current.value = _current
    }

    return {
        current,
        size,
        total,
        changeSize,
        changeCurrent,
    }
}