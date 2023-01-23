import { useState, createContext, useContext, useMemo } from "react";

const BookingStepperContext = createContext({
    activeIndex: 0,
    setActiveIndex: (index) => {},
    handleStepClick: (index) => {},
    steps: [],
});

export const useBookingStepperContext = () => useContext(BookingStepperContext);

export default function BookingStepper({
    steps = [],
    defaultActiveIndex = 0,
    onChange,
}) {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

    const handleStepClick = async (index) => {
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

        // if (errorSteps.includes(index)) {
        //     return `${baseClass} ${classNames.counterWrapper.error}`;
        // }

        // if (validSteps.includes(index)) {
        //     return `${baseClass} ${classNames.counterWrapper.valid}`;
        // }

        if (activeIndex === index) {
            return `${baseClass} ${classNames.counterWrapper.active}`;
        }

        return `${baseClass} ${classNames.counterWrapper.inactive}`;
    };

    const getCounterLabelClass = (index) => {
        const baseClass = classNames.counterLabel.base;

        // if (errorSteps.includes(index)) {
        //     return `${baseClass} ${classNames.counterLabel.error}`;
        // }

        // if (validSteps.includes(index)) {
        //     return `${baseClass} ${classNames.counterLabel.valid}`;
        // }

        if (activeIndex === index) {
            return `${baseClass} ${classNames.counterLabel.active}`;
        }

        return `${baseClass} ${classNames.counterLabel.inactive}`;
    };

    const value = useMemo(() => ({
        activeIndex,
        setActiveIndex,
        handleStepClick,
        steps,
    }));

    return (
        <BookingStepperContext.Provider value={value}>
            <div className="max-w-full">
                <div className="flex flex-wrap gap-4 sm:gap-10">
                    {steps.map((step, key) => (
                        <div
                            key={key}
                            className="flex items-center gap-2 :focus:outline-none :focus:ring-2 :focus:ring-blue-400"
                        >
                            <div className={getCounterWrapperClass(key)}>
                                {/* {validSteps.includes(key) ? (
                                <CheckIcon className="text-white h-6" />
                            ) : (
                                <span className="text-white font-bold text-center text-xl">
                                    {key + 1}
                                </span>
                            )} */}
                                <span className="text-white font-bold text-center text-xl">
                                    {key + 1}
                                </span>
                            </div>

                            <span className={getCounterLabelClass(key)}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
                {/* 
            {errorSteps.length > 0 && (
                <div className="mt-4">
                    <p className="text-red-500">
                        Masih ada formulir yang kosong!
                    </p>
                </div>
            )} */}

                <div className="mt-8">
                    {steps && steps[activeIndex].component}
                </div>
            </div>
        </BookingStepperContext.Provider>
    );
}
