import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from "./Icons";

export default function AlertCard({ variant = "info", title, children }) {
    const variants = {
        info: {
            icon: <InfoIcon />,
            title: title || "Info",
            className: "bg-blue-100 border-blue-500 text-blue-700",
        },
        success: {
            icon: <SuccessIcon />,
            title: title || "Success",
            className: "bg-green-100 border-green-500 text-green-700",
        },
        warning: {
            icon: <WarningIcon />,
            title: title || "Warning",
            className: "bg-yellow-100 border-yellow-500 text-yellow-700",
        },
        danger: {
            icon: <DangerIcon />,
            title: title || "Danger",
            className: "bg-red-100 border-red-500 text-red-700",
        },
    }[variant];

    return (
        <div
            className={
                variants.className + " rounded-b my-3 px-4 py-3 shadow-md"
            }
            role="alert"
        >
            <div className="flex">
                <div className="py-2 pr-3">{variants.icon}</div>
                <div>
                    <p className="font-bold">{variants.title}</p>
                    {children}
                </div>
            </div>
        </div>
    );
}
