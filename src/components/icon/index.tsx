import { FC } from "react";
import { IIconProps } from "./Model";
import './_layout.scss';
const Icon: FC<IIconProps> = (props) => {
    const { size, name, className, color,style, onClick } = props;

    return (
        <span
            className={`icon icon-${name} ${className ?? ''}`}
            style={{...style, fontSize: size, color }}
            onClick={onClick}
        >
        </span>
    )
}

export default Icon;