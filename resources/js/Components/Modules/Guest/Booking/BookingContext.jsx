import { createContext, useContext, useMemo } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { FormProvider, useForm as useReactHookForm } from "react-hook-form";

import ValidationErrors from "@/Components/ValidationErrors";

export const BookingFormContext = createContext({
    data: {},
    setData: () => {},
    post: () => {},
    errors: {},
    handleChange: (e) => {},
    handleSubmit: (values) => {},
});

export const useBookingFormContext = () => {
    return useContext(BookingFormContext);
};

export default function BookingFormProvider({
    children,
    defaultValues = {},
    onInvalid,
}) {
    const { data, setData, post, errors } = useForm(
        "BookingForm",
        defaultValues
    );

    const methods = useReactHookForm({
        defaultValues,
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (values) => {
        // eslint-disable-next-line no-undef
        Inertia.post(route("booking.store"), values, {
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
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit, onInvalid)}>
                    {children}
                </form>
            </FormProvider>
        </BookingFormContext.Provider>
    );
}
