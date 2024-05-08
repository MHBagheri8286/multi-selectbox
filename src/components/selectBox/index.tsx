import { CSSProperties, FC, KeyboardEvent, MouseEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { IOptions } from "./Model";
import OptionListItems from "./OptionListItems";
import Selector from "./Selector";
import { getTextWidth, searchInAllProperties } from "./Utility";
import './_layout.scss';

interface ISelectBoxProps {
    options?: IOptions[];
    defaultValue?: string[];
    mode?: 'single' | 'multiple' | 'tags'; // In tags mode, allow user to select tags from list or input custom tag.
    style?: CSSProperties;
    onChange?: (value: string[]) => void;
    optionRender?: (value: IOptions) => ReactNode;
}

const SelectBox: FC<ISelectBoxProps> = ({ mode = 'tags', ...props }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceTimer = useRef<NodeJS.Timeout>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [options, setOptions] = useState<IOptions[]>(props.options || []);
    const [values, setValues] = useState<string[]>(props.defaultValue || []);
    const [isOptionListVisible, setIsOptionListVisible] = useState<boolean>(false);
    const [inputWidth, setInputWidth] = useState<number>(15);
    let [currentIndex, setCurrentIndex] = useState<number>(0);
    const filteredOptions = useMemo(() => options.filter(option => !searchValue || searchInAllProperties<IOptions>(option, searchValue)), [searchValue]); // Filter option list based on search value

    // Close option list by clicking outside
    useEffect(() => {
        document.addEventListener("click", handleOuterClick);

        return () => {
            document.removeEventListener("click", handleOuterClick);
        };
    }, []);

    // Scroll to current option when arrow up (down) key down
    useEffect(() => {
        if(filteredOptions[currentIndex]){
            const element = document.getElementById(`${filteredOptions[currentIndex].value}`);
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, [currentIndex])

    const handleOuterClick = (e: any) => {
        resetInputValue();
        setIsOptionListVisible(false);
        inputRef.current?.blur();
    }

    const onInputChange = () => {
        // Add debounce to avoid re rendering every input character
        clearTimeout(debounceTimer.current);
        setInputWidth(getTextWidth(inputRef.current?.value as string) );
        debounceTimer.current = setTimeout(() => {
            setSearchValue(inputRef.current?.value as string);
            setCurrentIndex(0);
        }, 200)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const keyCode = e.key;
        switch (keyCode) {
            case "Enter":
                if (filteredOptions.length) { manageValue(filteredOptions[currentIndex].value as string, currentIndex); }
                else if (inputRef.current?.value) {
                    options.unshift({ label: inputRef.current?.value, value: inputRef.current?.value });
                    setOptions(options.slice());
                }
                resetInputValue();
                break;
            case "ArrowDown":
                setCurrentIndex((currentIndex + 1) % filteredOptions.length);
                break;
            case "ArrowUp":
                setCurrentIndex(currentIndex - 1 < 0 ? filteredOptions.length - 1 : currentIndex - 1);
                break;
        }
    }

    const resetInputValue = () => {
        setSearchValue('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const onSelectBoxClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsOptionListVisible(true);
        inputRef.current?.focus();
    }

    const manageValue = (value: string, index: number) => {
        const findIndex = values.findIndex(v => value === v);
        if (findIndex === -1 && filteredOptions[index]) { values.push(filteredOptions[index].value as string); }
        else { values.splice(findIndex, 1);}
        setValues(values.slice());
    }

    const onOptionClick = (value: string)=>{
        currentIndex = filteredOptions.findIndex(o => o.value === value);
        manageValue(value,currentIndex);
        setCurrentIndex(currentIndex);
    }

    return (
        <div
            className="select-box"
            style={props.style}
            onClick={onSelectBoxClick}
        >
            <section className="selector-section">
                <Selector
                    ref={inputRef}
                    width={inputWidth}
                    options={options?.filter(option => values?.some(v => v === option.value))}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                />
            </section>
            <section className={`option-list-section ${isOptionListVisible ? 'show' : ''}`}>
                <OptionListItems
                    options={filteredOptions}
                    value={values}
                    currentIndex={currentIndex}
                    optionRender={props.optionRender}
                    onClick={onOptionClick}
                />
            </section>
        </div>
    )
}

export default SelectBox

