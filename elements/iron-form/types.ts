
export type CommonConfig = {
    class?: string,
    style?: string
}

export type CommonConfigWithLabel = CommonConfig & {
    label: string | object,
    name: string,
}

export function hasLabel(v: ConfigElem): v is ConfigElemWithLabel {
    return ["date", "checkbox", "file", "select", "textarea", "button", "number", "text"].includes(v.type)
}

export type DatePickerConfigElem = CommonConfigWithLabel & {
    type: "date",
    required?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    format?: string,
    min?: string,
    max?: string,
    dbType: "string"
}

export type CheckboxConfigElem = CommonConfigWithLabel & {
    type: "checkbox",
    required?: boolean,
    disabled?: boolean,
    defaultValue?: boolean,
    dbType: "boolean"
}

export type FileConfigElem = CommonConfigWithLabel & {
    type: "file",
    accept?: string,
    required?: boolean,
    disabled?: boolean,
    multiple?: boolean,
    dbType: "file"
}

export type SelectConfigElem = CommonConfigWithLabel & {
    type: "select",
    required?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    multiple?: boolean,
    freeText?: boolean,
    allowDuplicates?: boolean,
    itemValueProperty?: string,
    itemLabelProperty?: string,
    itemImageProperty?: string,
    options: Option[],
    preventSelection?: boolean,
    isDropdownMenu?: boolean,
    dbType: "string" | "list",
    saveLabel?: boolean
}
export type TextAreaConfigElem = CommonConfigWithLabel & {
    type: "textarea",
    required?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    minLength?: number,
    maxLength?: number,
    rows?: number,
    autocomplete?: string,
    dbType: "string"
}

export type ButtonConfigElem = CommonConfigWithLabel & {
    type: "button",
    icon?: string,
    small?: boolean,
    smallest?: boolean,
    noMargin?: boolean,
    marginLeftRight?: boolean,
    iconSize?: string,
    event?: string
}

export type InputConfigElem = CommonConfigWithLabel & {
    type: "number" | "text",
    required?: boolean,
    disabled?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number,
    step?: number,
    isCNP?: boolean,
    isCIF?: boolean,
    isEmail?: boolean,
    autocomplete?: boolean,
    defaultValue?: string | number,
    dbType: "string" | "integer" | "double"
}

export type ColorPickerConfigElem = CommonConfig & {
    type: "colorPicker",
    name: string,
    required?: boolean,
    size?: number,
    dbType: "string"
}
export type ParagraphConfigElem = CommonConfig & {
    type: "paragraph",
    name?: string,
    text?: string | unknown,
    html?: unknown
}

export type Option = {
    value: string,
    label: string | unknown
} | string

export type ConfigElemWithLabel = DatePickerConfigElem | CheckboxConfigElem | FileConfigElem |
    SelectConfigElem | TextAreaConfigElem |
    ButtonConfigElem | InputConfigElem;

export type ConfigElem = ConfigElemWithLabel | ColorPickerConfigElem | ParagraphConfigElem
export type Configs = {
    elements: ConfigElem[]
}

export type IconDropdownElem = {
    icon: string,
    direction?: string,
    eventToFire?: string,
    options: string[],
    openedDropdown?: boolean,
    itemValueProperty?: string,
    itemLabelProperty?: string,
    isNative?: boolean
}

export type LoadingElem = {
    opened?: boolean
}

export type TableElem = {
    columns?: Column[],
    items?: Item[],
    viewHieght?: number,
    rowHeight?: number,
    selectedItems: Item[],
}

export type Column = {
    filterable?: boolean,
    name?: string,
    sortable?: boolean,
    title?: string
}


export type Item = {
    initialIndex?: number,
    isSelected?: boolean
}

export type TabElem = {
    pages?: string[],
    selectedTab?: number
}

export type IconElem = {
    icon: string,
    svgIcon?: SVGElement,
    size?: number
}

export type ToastElem = {
    message: string,
    icon: object,
    type?: string,
    opened?: boolean,
    timeout?: number
}

export type ToggleButtonElem = {
    checked?: boolean,
    value?: boolean
}

