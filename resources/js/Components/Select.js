export default function Select({
    options = [],
    defaultValue,
    value,
    onChange,
    className,
    emptyOptionLabel = "Select",
    ...props
}) {
    return (
        <select
            {...props}
            defaultValue={defaultValue}
            className={
                `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                className
            }
            value={value}
            onChange={(e) => {
                onChange?.(e.target.value, options[e.target.selectedIndex - 1]);
            }}
        >
            <option>{emptyOptionLabel}</option>
            {options.map((option, key) => (
                <option key={key} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
