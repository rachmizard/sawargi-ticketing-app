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
        error,
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

    const errorClassName = error
        ? "border-red-500 focus:border-red-300 focus:ring-red-200"
        : "";

    const classNames = [
        "border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
        errorClassName,
        className,
    ];

    return (
        <div className="flex flex-col items-start gap-2">
            <input
                type={type}
                name={name}
                value={value}
                className={classNames.join(" ")}
                ref={ref}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                onClick={onClick}
                {...props}
            />

            {!!error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
