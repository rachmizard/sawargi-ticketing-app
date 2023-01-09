import { forwardRef, useEffect } from "react";

const Input = forwardRef(function Input(
    {
        type = "text",
        name,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
        onClick,
        ...props
    },
    ref
) {
    useEffect(() => {
        if (isFocused) {
            ref?.current?.focus();
        }

        return () => {
            ref?.current?.blur();
        };
    }, [isFocused]);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                ref={ref}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                onClick={onClick}
                {...props}
            />
        </div>
    );
});

Input.displayName = "Input";

export default Input;
