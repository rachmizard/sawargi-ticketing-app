import { useState } from "react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";

import Button from "@/Components/Button";
import { useBookingFormContext } from "./BookingContext";

export default function BookingStepper({
    steps = [],
    defaultActiveIndex = 0,
    onChange,
}) {
    const { data } = useBookingFormContext();

    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [errors, setErrors] = useState([]);
    const [valids, setValids] = useState([]);

    const handleStepClick = (index) => {
        const { validate } = steps[index - 1] || {};
        if (validate && !validate(data)) {
            if (errors.includes(index - 1)) {
                return;
            }

            setValids(valids.filter((valid) => valid !== index - 1));

            setErrors([...errors, index - 1]);
            return;
        }

        setErrors(errors.filter((error) => error !== index - 1));

        setValids([...valids, index - 1]);

        setActiveIndex(index);
        onChange && onChange(index);
    };

    const classNames = {
        counterWrapper: {
            base: "flex flex-col flex-shrink-0 items-center justify-center w-10 h-10 rounded-full",
            active: "bg-blue-400",
            inactive: "bg-gray-400",
            valid: "bg-green-400",
            error: "bg-red-600",
        },
        counterLabel: {
            base: "font-semibold",
            active: "text-blue-400",
            inactive: "text-gray-400",
            valid: "text-green-400",
            error: "text-red-600",
        },
    };

    const getCounterWrapperClass = (index) => {
        const baseClass = classNames.counterWrapper.base;

        if (errors.includes(index)) {
            return `${baseClass} ${classNames.counterWrapper.error}`;
        }

        if (valids.includes(index)) {
            return `${baseClass} ${classNames.counterWrapper.valid}`;
        }

        if (activeIndex === index) {
            return `${baseClass} ${classNames.counterWrapper.active}`;
        }

        return `${baseClass} ${classNames.counterWrapper.inactive}`;
    };

    const getCounterLabelClass = (index) => {
        const baseClass = classNames.counterLabel.base;

        if (errors.includes(index)) {
            return `${baseClass} ${classNames.counterLabel.error}`;
        }

        if (valids.includes(index)) {
            return `${baseClass} ${classNames.counterLabel.valid}`;
        }

        if (activeIndex === index) {
            return `${baseClass} ${classNames.counterLabel.active}`;
        }

        return `${baseClass} ${classNames.counterLabel.inactive}`;
    };

    return (
        <div className="max-w-full">
            <div className="flex flex-wrap gap-4 sm:gap-10">
                {steps.map((step, key) => (
                    <div
                        key={key}
                        onClick={() => handleStepClick(key)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleStepClick(key);
                            }
                        }}
                        tabIndex={0}
                        className="flex items-center gap-2 cursor-pointer :focus:outline-none :focus:ring-2 :focus:ring-blue-400"
                    >
                        <div className={getCounterWrapperClass(key)}>
                            {valids.includes(key) ? (
                                <CheckIcon className="text-white h-6" />
                            ) : (
                                <span className="text-white font-bold text-center text-xl">
                                    {key + 1}
                                </span>
                            )}
                        </div>

                        <span
                            role="button"
                            className={getCounterLabelClass(key)}
                        >
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>

            {errors.length > 0 && (
                <div className="mt-4">
                    <p className="text-red-500">
                        Masih ada formulir yang kosong!
                    </p>
                </div>
            )}

            <div className="mt-8">{steps && steps[activeIndex].component}</div>

            <div className="flex justify-end gap-4 mt-8">
                <Button
                    type="button"
                    colorScheme="blue"
                    disabled={activeIndex === 0}
                    onClick={() => {
                        activeIndex !== 0 && handleStepClick(activeIndex - 1);
                    }}
                    className="gap-2 font-semibold"
                >
                    <ArrowLeftIcon width={18} />
                    <span>Sebelumnya</span>
                </Button>

                {activeIndex !== steps.length - 1 && (
                    <Button
                        type="button"
                        colorScheme="blue"
                        onClick={() => {
                            activeIndex !== steps.length - 1 &&
                                handleStepClick(activeIndex + 1);
                        }}
                        className="gap-2 font-semibold"
                    >
                        <span>Selanjutnya</span>
                        <ArrowRightIcon width={18} />
                    </Button>
                )}

                {activeIndex === steps.length - 1 && (
                    <Button
                        type="submit"
                        colorScheme="green"
                        className="gap-2 font-semibold"
                    >
                        <span>Pesan</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
