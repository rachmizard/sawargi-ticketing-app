import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import {
    ExclamationTriangleIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function AlertCard({
    isOpen,
    variant = "info",
    title,
    infinite = false,
    children,
}) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (infinite) {
            setShow(true);
            return;
        } else {
            if (!isOpen) {
                setShow(false);
                return;
            }

            setShow(true);

            const timeout = setTimeout(() => {
                setShow(false);
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    const variants = {
        info: {
            icon: <InformationCircleIcon width={28} height={28} />,
            title: title || "Info",
            className: "bg-blue-100 border-blue-500 text-blue-700",
        },
        success: {
            icon: <CheckCircleIcon width={28} height={28} />,
            title: title || "Success",
            className: "bg-green-100 border-green-500 text-green-700",
        },
        warning: {
            icon: <ExclamationTriangleIcon width={28} height={28} />,
            title: title || "Warning",
            className: "bg-yellow-100 border-yellow-500 text-yellow-700",
        },
        danger: {
            icon: <ExclamationCircleIcon width={28} height={28} />,
            title: title || "Danger",
            className: "bg-red-100 border-red-500 text-red-700",
        },
    }[variant];

    return (
        <Transition
            show={show}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
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
        </Transition>
    );
}
