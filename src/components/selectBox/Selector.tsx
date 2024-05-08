import { ChangeEvent, Fragment, KeyboardEvent, forwardRef } from "react";
import { IOptions } from "./Model";

interface ISelectorProps {
    options?: IOptions[];
    width?: number;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Selector = forwardRef<HTMLInputElement, ISelectorProps>(({ options, width, onKeyDown, onChange }, ref) => {

    return (
        <Fragment>
            {options?.map(option => <div key={option.value} className="selection-overflow-item">
                <span className="selection-item">{option.label}</span>
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