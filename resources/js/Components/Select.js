import React from "react";

export default function Select({
    options = [],
    defaultValue,
    value,
    onChange,
    className,
    ...props
}) {
    return (
        <select
            defaultValue={defaultValue}
            className={
                `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                className
            }
            value={value}
            onChange={(e) => {
                onChange?.(e.target.value, options[e.target.selectedIndex]);
            }}
            {...props}
        >
            {options.map((option, key) => (
                <option key={key} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
