import { Fragment, forwardRef } from "react";
import Icon from "../icon";
import { ISelectorProps } from "./Model";

const Selector = forwardRef<HTMLInputElement, ISelectorProps>((props, ref) => {
    const { options, width, onKeyDown, onChange,onRemoveItem } = props;

    return (
        <Fragment>
            {options?.map(option => <div key={option.value} className="selection-overflow-item">
                <div className="selection-item">
                    <span>{option.label}</span>
                    <Icon
                        name="trash"
                        size={10}
                        style={{cursor: 'pointer'}}
                        onClick={()=> onRemoveItem(option.value)}
                    />
                </div>
            </div>)}
            <div className="selection-overflow-item">
                <div className="selection-search" >
                    <input
                        ref={ref}
                        style={{ width }}
                        onKeyDown={onKeyDown}
                        onChange={onChange}
                    />
                </div>
            </div>
        </Fragment>
    )
})

export default Selector;