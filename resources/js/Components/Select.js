import React from "react";

export default function Select({
    options = [],
    defaultValue,
    value,
    onChange,
}) {
    return (
        <select
            defaultValue={defaultValue}
            className="rounded-md py-1"
            value={value}
            onChange={(e) => {
                onChange?.(e.target.value, options[e.target.selectedIndex]);
            }}
        >
            {options.map((option, key) => (
                <option key={key} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
