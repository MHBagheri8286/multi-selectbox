import { CSSProperties, ChangeEvent, KeyboardEvent, ReactNode } from "react";

export interface IOptions {
    label: string,
    value: string,
    emoji?: string,
    desc?: string,
}

export interface ISelectBoxProps {
    options?: IOptions[];
    defaultValue?: string[];
    style?: CSSProperties;
    classname?: string;
    onChange?: (value: string[]) => void;
    optionRender?: (value: IOptions) => ReactNode;
}

export interface IOptionListItemsProps {
    options: IOptions[];
    selectedOptions: string[];
    onClick: (value: string) => void;
    optionRender?: (value: IOptions) => ReactNode;
}

export interface ISelectorProps {
    options?: IOptions[];
    width?: number;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onRemoveItem: (value: string) => void;
}