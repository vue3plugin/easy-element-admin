import { watch, nextTick, type Ref, reactive, onMounted } from "vue";
import type { SearchColumn, TableColumn, TableProps } from "../type";
import { isDefined } from "@vueuse/core";

export function useProTable(_ref: Ref<any>, columns: Ref<TableColumn[]>, props?: TableProps) {

    const _props = isDefined(props) ? props : {} as TableProps

    const formColumn = reactive<Record<"add" | "edit" | "detail" | "search", SearchColumn[]>>({
        add: [],
        edit: [],
        detail: [],
        search: [],
    })

    watch([_ref, columns], ([table, columns]) => {
        /**
        * 解析增删改查 的column
       */
        const add: SearchColumn[] = []
        const edit: SearchColumn[] = []
        const detail: SearchColumn[] = []
        const search: SearchColumn[] = []

        columns.map((item) => ({
            key: item.key,
            label: item.label,
            ...(item.form || {})
        })) as SearchColumn[]
        for (const column of columns) {
            const _column = { key: column.key, label: column.label, ...(column.form || {}) } as SearchColumn

            if (column.add) add.push({ ..._column, value: "" })

            if (column.edit) {
                edit.push({..._column, resetVal: "" })
            }

            if (column.detail) detail.push({..._column})

            if (column.search) search.push({..._column})
        }
        formColumn.add = add
        formColumn.edit = edit
        formColumn.detail = detail
        formColumn.search = search

        /**
         * table 的column
        */
        if (!table) {
            setTimeout(() => {
                _ref.value.tablecolumns = columns
            }, 200)
            return
        }

        _ref.value.tablecolumns = columns

        _ref.value.columnChecked = _props.columnChecked || columns.map(it=>it.key)
    })

    /**
     * 设置列表数据
    */
    function setData<T = any>(data: T[]) {
        if (!_ref.value) {
            nextTick(() => {
                _ref.value.data = data
            })
            return
        }
        _ref.value.data = data
    }

    /**
     * 设置当前行数据，用于增删改查
    */
    function setRow<T = any>(data: T, type: "add" | "edit" | "detail" | "search") {
        for (const c of formColumn[type]) {
            c.value = data[c.key]
        }
    }

    /**
     * 表格其它属性
    */
    onMounted(()=>{
        _ref.value.size = _props.size || "default"
    })

    return {
        formColumn,
        setTableData: setData,
        setTableRow: setRow,
    }
}