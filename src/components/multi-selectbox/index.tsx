import { FC, KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IOptions, ISelectBoxProps } from "./Model";
import OptionListItems from "./OptionListItems";
import Selector from "./Selector";
import { getTextWidth, searchInAllProperties } from "./Utility";
import './_layout.scss';
import Icon from "../icon";

const MultiSelectBox: FC<ISelectBoxProps> = (props) => {
    const { defaultValue, style, optionRender, classname } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceTimer = useRef<NodeJS.Timeout>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [options, setOptions] = useState<IOptions[]>(props.options || []);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultValue || []);
    const [isOptionListVisible, setIsOptionListVisible] = useState<boolean>(false);
    const [inputWidth, setInputWidth] = useState<number>(15);
    const filteredOptions = useMemo(() => options.filter(option => !searchValue || searchInAllProperties<IOptions>(option, searchValue)), [options, searchValue]); // Filter option list based on search value

    const handleOuterClick = useCallback((e: any) => {
        resetInputValue();
        setIsOptionListVisible(false);
        inputRef.current?.blur();
    }, [])

    // Close option list by clicking outside
    useEffect(() => {
        document.addEventListener("click", handleOuterClick);

        return () => {
            document.removeEventListener("click", handleOuterClick);
        };
    }, [handleOuterClick]);

    const onInputChange = () => {
        // Add debounce to avoid re rendering every input character
        clearTimeout(debounceTimer.current);
        setInputWidth(getTextWidth(inputRef.current?.value as string));
        debounceTimer.current = setTimeout(() => {
            setSearchValue(inputRef.current?.value as string);
        }, 500)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const keyCode = e.key;
        switch (keyCode) {
            case "Enter":
                if (inputRef.current?.value) {
                    options.unshift({ label: inputRef.current?.value, value: inputRef.current?.value });
                    setOptions(options.slice());
                }
                resetInputValue();
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

    const onOptionClick = (value: string) => {
        const findIndex = selectedOptions.findIndex(v => value === v);
        if (findIndex === -1) { selectedOptions.push(value); }
        else { selectedOptions.splice(findIndex, 1); }
        setSelectedOptions(selectedOptions.slice());
    }

    const onRemoveItemClick = (value: string) => {
        const findIndex = selectedOptions.findIndex(v => value === v);
        selectedOptions.splice(findIndex, 1);
        setSelectedOptions(selectedOptions.slice());
    }

    return (
        <div
            className={`multi-select-box ${isOptionListVisible ? ' focused' : ''} ${classname ?? ''}`}
            style={style}
            onClick={onSelectBoxClick}
        >
            <section className="selector-section">
                <Selector
                    ref={inputRef}
                    width={inputWidth}
                    options={selectedOptions.map(v => ({ ...options.find(option => option.value === v) as IOptions }))}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    onRemoveItem={onRemoveItemClick}
                />
            </section>
            <section className={`option-list-section ${isOptionListVisible ? 'show' : ''}`}>
                <OptionListItems
                    options={filteredOptions}
                    selectedOptions={selectedOptions}
                    onClick={onOptionClick}
                    optionRender={optionRender}
                />
            </section>
            <Icon name="arrow-down"/>
        </div>
    )
}

export default MultiSelectBox

