export default function Badge({
    variant = "solid",
    colorScheme = "primary",
    children,
}) {
    const colorSchemesSolid = {
        primary: "bg-blue-500 text-white",
        secondary: "bg-gray-500 text-white",
        success: "bg-green-500 text-white",
        danger: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-white",
        info: "bg-blue-500 text-white",
        light: "bg-gray-200 text-gray-800",
        dark: "bg-gray-800 text-white",
    };

    const colorSchemesOutline = {
        primary: "border-blue-500 text-blue-500",
        secondary: "border-gray-500 text-gray-500",
        success: "border-green-500 text-green-500",
        danger: "border-red-500 text-red-500",
        warning: "border-yellow-500 text-yellow-500",
        info: "border-blue-500 text-blue-500",
        light: "border-gray-400 text-gray-400",
        dark: "border-gray-800 text-gray-800",
    };

    const variants = {
        solid: colorSchemesSolid[colorScheme],
        outline: `border ${colorSchemesOutline[colorScheme]}`,
    }[variant];

    const baseClassNames =
        "inline-block rounded-full px-3 py-1 text-xs font-semibold leading-tight";

    const classNames = [baseClassNames, variants].join(" ");

    return <div className={classNames}>{children}</div>;
}
