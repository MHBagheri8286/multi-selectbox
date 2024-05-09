import { FC } from "react";
import Icon from "../icon";
import { IOptionListItemsProps } from "./Model";

const OptionListItems: FC<IOptionListItemsProps> = (props) => {
    const { options, selectedOptions, onClick, optionRender } = props;

    return (
        <ul className="option-list-items">
            {
                options.length ? options?.map((option, index) => {
                    var className = 'option-list-item';
                    className += selectedOptions?.find(v => v === option.value) ? ' option-selected' : '';

                    return <li
                        key={option.value}
                        className={className}
                        onClick={() => onClick(option.value)}
                    >
                        {
                            optionRender ? optionRender(option)
                                : <>
                                    <div className="caption trim">
                                        <span>{option?.label}</span>
                                        {option.emoji && <span className="emoji">{option.emoji}</span>}
                                    </div>
                                    {
                                        selectedOptions?.find(v => v === option.value) &&
                                        <Icon
                                            name="checked"
                                            color="#7d91c9"
                                            style={{ fontWeight: 'bolder' }}
                                        />
                                    }
                                </>
                        }
                    </li>
                })
                    : <span>No Item</span>
            }
        </ul>
    )
}

export default OptionListItems;