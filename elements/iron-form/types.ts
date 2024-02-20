export type CommonConfig = {
    class?: string,
    style?: string
}

export type DatePickerConfigElem = CommonConfig & {
    type: "date",
    name: string,
    label: string,
    required?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    format?: string,
    min?: string,
    max?: string,
    dbType: "string"
}

export type CheckboxConfigElem = CommonConfig & {
    type: "checkbox",
    name: string,
    label: string | unknown,
    required?: boolean,
    disabled?: boolean,
    defaultValue?: boolean,
    dbType: "boolean"
}

export type FileConfigElem = CommonConfig & {
    type: "file",
    name: string,
    label: string,
    accept?: string,
    required?: boolean,
    disabled?: boolean,
    multiple?: boolean,
    dbType: "file"
}

export type SelectConfigElem = CommonConfig & {
    type: "select",
    name: string,
    label?: string,
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
export type TextAreaConfigElem = CommonConfig & {
    type: "textarea",
    name: string,
    label: string,
    required?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    minLength?: number,
    maxLength?: number,
    rows?: number,
    autocomplete?: string,
    dbType: "string"
}
export type ColorPickerConfigElem = CommonConfig & {
    type: "colorPicker",
    name: string,
    label?: string,
    required?: boolean,
    validate?: boolean,
    fromUser?: boolean,
    size?: number,
    dbType: "string"
}
export type ParagraphConfigElem = CommonConfig & {
    type: "paragraph",
    label?: "string",
    name?: string,
    text?: string | unknown,
    html?: unknown
}
export type ButtonConfigElem = CommonConfig & {
    type: "button",
    name: string,
    label: string,
    icon?: string,
    small?: boolean,
    smallest?: boolean,
    noMargin?: boolean,
    marginLeftRight?: boolean,
    iconSize?: string,
    event?: string
}

export type InputConfigElem = CommonConfig & {
    type: "number" | "text",
    name: string,
    label: string,
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

export type Option = {
    value: string,
    label: string | unknown
} | string

export type ConfigElem = DatePickerConfigElem | CheckboxConfigElem | FileConfigElem |
    SelectConfigElem | TextAreaConfigElem | ColorPickerConfigElem | ParagraphConfigElem |
    ButtonConfigElem | InputConfigElem

export type Configs = {
    elements: ConfigElem[]
}