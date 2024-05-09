import {CSSProperties, MouseEvent} from 'react'

export interface IIconProps{
    name: string;
    color?: string;
    size?: number;
    className?: string;
    style?: CSSProperties;
    onClick?: (e: MouseEvent) => void;
}