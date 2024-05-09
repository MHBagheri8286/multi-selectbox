export function searchInAllProperties<T>(record: T, term: string) {
    for (const property in record)
        if (record[property] && String(record[property]).toLowerCase().indexOf(term?.toLowerCase()) !== -1)
            return true;
    return false;
}

export function getTextWidth(str: string) {
    const text = document.createElement("span");
    document.body.appendChild(text);
    text.style.font = "BlinkMacSystemFont";
    text.style.fontSize = 18 + "px";
    text.style.height = 'auto';
    text.style.width = 'auto';
    text.style.position = 'absolute';
    text.style.whiteSpace = 'no-wrap';
    text.innerHTML = str || '';
    const width = Math.ceil(text.clientWidth) || 15;
    document.body.removeChild(text);
    return width;
} 