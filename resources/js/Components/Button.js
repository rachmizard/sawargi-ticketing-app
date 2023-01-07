export default function Button({
    type = "submit",
    className = "",
    processing,
    disabled,
    children,
    colorScheme,
    variant = "solid",
    size = "md",
    onClick,
}) {
    const variants = {
        outline: {
            blue: "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white",
            green: "text-green-500 border-green-500 hover:bg-green-500 hover:text-white",
            red: "text-red-500 border-red-500 hover:bg-red-500 hover:text-white",
            gray: "text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white",
            black: "text-black border-black hover:bg-black hover:text-white",
            purple: "text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white",
        },
        solid: {
            blue: "text-white bg-blue-500 hover:bg-blue-600",
            green: "text-white bg-green-500 hover:bg-green-600",
            red: "text-white bg-red-500 hover:bg-red-600",
            gray: "text-white bg-gray-500 hover:bg-gray-600",
            black: "text-white bg-black hover:bg-gray-900",
            purple: "text-white bg-purple-500 hover:bg-purple-600",
        },
    }[variant];

    const baseClasses =
        "inline-flex items-center border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150";

    const sizes = {
        sm: "text-sm px-3 py-1",
        md: "text-md px-4 py-2",
        lg: "text-lg px-6 py-3",
    }[size];

    const classNames = {
        baseClasses,
        variants: variants[colorScheme],
        sizes,
        className,
    };

    const disableClassName = "opacity-50 cursor-not-allowed";
    const isDisabled = processing || disabled;

    const mergedClassNames =
        Object.values(classNames).join(" ") +
        (isDisabled ? ` ${disableClassName}` : "");

    return (
        <button
            type={type}
            onClick={onClick}
            className={mergedClassNames}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}
