import { createContext, useMemo } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ValidationErrors from "@/Components/ValidationErrors";
import { useContext } from "react";

const BookingFormContext = createContext();

export const useBookingFormContext = () => useContext(BookingFormContext);

export default function BookingFormProvider({ children }) {
    const {
        ziggy: { query },
        errors,
    } = usePage().props;

    const { data, setData } = useForm("BookingForm");

    const handleSubmit = (values) => {
        values.schedule_id = query?.scheduleId;
        values.passengers = values.passengers.map(
            (passenger) => passenger.value
        );

        // eslint-disable-next-line no-undef
        Inertia.post(route("booking.store"), values, {
            data: values,
            preserveState: true,
        });
    };

    const value = useMemo(
        () => ({
            data,
            setData,
            handleSubmit,
        }),
        [data, setData]
    );

    return (
        <BookingFormContext.Provider value={value}>
            <ValidationErrors errors={errors} />
            {children}
        </BookingFormContext.Provider>
    );
}
