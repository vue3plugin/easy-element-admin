import type { HowAxiosRequestConfig } from "howuse/axios";
import { useDefAxiosRequest } from '@/utils/request';
import { usePagination } from "./usePagination";
import { unref } from "vue";

export function useReqPagination<T, R>(conf: HowAxiosRequestConfig) {
    const { data, execute } = useDefAxiosRequest(conf)
    const { changeSize, changeCurrent, size, current, total } = usePagination()

    let lastConf: HowAxiosRequestConfig;

    function load() {
        execute({
            params: {
                current: unref(current),
                size: unref(size),
                ...(lastConf.params || {})
            },
        })
    }

    function search(conf: HowAxiosRequestConfig) {
        lastConf = conf
        load()
    }

    /**
     * 修改页面大小修改数据
    */
    function handleChangeSize(_size: number) {
        changeSize(_size)
        load()
    }

    /**
     * 修改页面页码
    */
    function handleChangeCurrent(_current: number) {
        changeCurrent(_current)
        load()
    }

    return {
        load,
        search,
        data,
        handleChangeSize,
        handleChangeCurrent,
        size,
        current,
        total,
    }
}