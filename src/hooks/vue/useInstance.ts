import { createVNode, type Component, render, type AppContext } from "vue";

interface Options {
    appendTo?: HTMLElement | string;
    [key: string]: unknown;
}

interface Slots {
    [key: string]: (...args) => any;
}

const getAppendToElement = (props: Options): HTMLElement => {
    let appendTo: HTMLElement | null = document.body;
    if (props.appendTo) {
        if (typeof props.appendTo === 'string') {
            appendTo = document.querySelector<HTMLElement>(props.appendTo);
        }
        if (props.appendTo instanceof HTMLElement) {
            appendTo = props.appendTo;
        }
        if (!(appendTo instanceof HTMLElement)) {
            appendTo = document.body;
        }
    }
    return appendTo;
};

/**
 * @param { Component } component vue 组件
 * @param { Options } props 参数
 * @param appContext 上下文 const appContext = getCurrentInstance()?.appContext;
 * @description 将组件创建为一个vue实例，用于指令化应用
*/
export function useInstance(component: Component,
    props: Options = {},
    appContext: AppContext | null = null) {

    let instance;
    const container = document.createElement('div');

    /**
     * @param _props 组件props
    */
    function create(_props: Options = {},slots?: Slots) {
        instance = createVNode(component, { ...props, ..._props }, slots);
        instance.appContext = appContext;

        render(instance, container);
        getAppendToElement(props).appendChild(container);
    }

    function remove() {
        render(null, container);
        container.parentNode?.removeChild(container);
    }

    return {
        exposed: () => instance.component?.exposed,
        remove,
        create,
    }
}