import { createContext, useContext, useMemo } from "react";
import { useForm } from "@inertiajs/inertia-react";

import ValidationErrors from "@/Components/ValidationErrors";

export const BookingFormContext = createContext({
    data: {},
    setData: () => {},
    post: () => {},
    errors: {},
    handleChange: (e) => {},
    handleSubmit: (e) => {},
});

export const useBookingFormContext = () => {
    return useContext(BookingFormContext);
};

export default function BookingFormProvider({ children, defaultValues = {} }) {
    const { data, setData, post, errors } = useForm(
        "BookingForm",
        defaultValues
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // eslint-disable-next-line no-undef
        post(route("booking.store"), {
            preserveState: true,
        });
    };

    const value = useMemo(
        () => ({
            data,
            setData,
            post,
            errors,
            handleChange,
            handleSubmit,
        }),
        [data, setData, post, errors, handleChange, handleSubmit]
    );

    return (
        <BookingFormContext.Provider value={value}>
            <ValidationErrors errors={errors} />
            <form onSubmit={handleSubmit}>{children}</form>
        </BookingFormContext.Provider>
    );
}
