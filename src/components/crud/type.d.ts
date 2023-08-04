export type FormItemType = 'ElInput' | 'ElInputNumber' | 'ElRadio' | 'ElRate' | 'ElSelect' | 'ElSelectV2' | 'ElSlider' | 'ElSwitch' | 'ElTimePicker' | 'ElTimeSelect' | 'ElTransfer' | 'ElUpload'

export interface SearchColumn {
    label: string;
    key: string; // 向后端提交的数据的键值
    value: any; // 必要字段，向后端提交的数据
    resetVal?: any; // 默认值，需要和value保持一致，如果value没有设置，则赋值resetVal
    rules?: Recordable[];
    span?: number; // 表单占据的宽度, 参数取值于 el-col 
    is: FormItemType, // element组件名称
    optionLabel?: string; // 下拉框使用
    optionValue?: string; // 下拉框使用
    data: any[]; // 数据源，下拉框使用
    props?: Recordable;
}

export interface TableColumn {
    key: string; // 对应后端的字段 
    label: string; // 标题
    add?: boolean,
    edit?: boolean,
    search?: boolean,
    detail?: boolean,
    props?: Recordable;
    hidden?: boolean; // 用于隐藏表格不显示的字段
    form?: Partial<Omit<SearchColumn, "label" | "key">>; // 用于导出表单的CRUD
}

export interface TableProps {
    size?: 'large' | 'default' | 'small',
    columnChecked?: string[], // 默认选中的列
}


export interface IBaseForm {
    columns: SearchColumn[],
    span: number,
    btnPosition?: "right" | "left" | "center" | "float-end" | "col",  // col 是栅格模式，位于栅格最后
    expend?: boolean, // 是否折叠除第一行的所有行最后一行
    isRule?: boolean; //是否开启表单校验
}

export interface IOperationBtn extends Omit<IBaseForm, "size"> {
    okText?: string;
    displayExpend?: boolean;
    hiddenReset?: boolean; // 隐藏重置按钮
}


/**
 * action 组件的相关类型
*/
export interface ProActionMixProps {
    "popconfirm": {
        "title"?: string;
        "confirm-button-text"?: string;
        "confirm-button-type"?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
        "icon"?: string | Component;
        "hide-icon"?: boolean;
        "hide-after"?: string;
        "teleported"?: boolean;
        "persistent"?: boolean;
        "width"?: string | number;
    },
    "dialog": {
        visible?: boolean;
        title?: string;
        width?: string | number;
        fullscreen?: boolean;
        top?: string;
        modal?: boolean;
        title?: string;
        "modal-class"?: string;
        "append-to-body"?: boolean;
        "lock-scroll"?: boolean;
        "open-delay"?: number;
        "close-delay"?: number;
        "close-on-click-modal"?: boolean;
        "close-on-press-escape"?: boolean;
        "show-close"?: boolean;
        "before-close"?: Function;
        draggable?: boolean;
        center?: boolean;
        "align-center"?: boolean;
        "destroy-on-close"?: boolean;
    },
    "drawer": {
        visible?: boolean;
        title?: string;
    },
    "custom": {
        title?: string;
    },
}

export type ConfirmType = keyof ProActionMixProps