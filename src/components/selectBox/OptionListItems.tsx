import { FC, ReactNode } from "react";
import { IOptions } from "./Model";

interface IOptionListItemsProps {
    options?: IOptions[];
    value?: string[];
    currentIndex?: number;
    optionRender?: (value: IOptions) => ReactNode;
    onClick?: (value: string) => void;
}

const OptionListItems: FC<IOptionListItemsProps> = ({ options, value, currentIndex,onClick, optionRender }) => {
    return (
        <ul className="option-list-items">
            {options?.map((option, index) => {
                var className = 'option-list-item';
                className += value?.find(v => v === option.value) ? ' option-selected' : '';
                className += index === currentIndex ? ' option-active' : '';

                return <li
                    key={option.value}
                    id={option.value}
                    className={className}
                    onClick={()=> onClick && onClick(option.value as string)}
                >
                    {optionRender ? optionRender(option)
                        : option?.label}
                </li>
            })}
        </ul>
    )
}

export default OptionListItems;