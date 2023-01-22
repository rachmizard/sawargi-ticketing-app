import { usePage } from "@inertiajs/inertia-react";

import BookingFormIdentity from "./FormIdentity";
import BookingStepper from "./Stepper";
import BookingFormSeat from "./FormSeat";
import BookingFormProvider from "./BookingContext";
import BookingFormPayment from "./FormPayment";

export default function BookingForm({ defaultValues, passengerCount = 0 }) {
    const {
        ziggy: { query },
    } = usePage().props;

    const validateFormIdentity = (data) => {
        if (
            data.name === "" ||
            data.phone === "" ||
            data.email === "" ||
            data.address === "" ||
            data.passengers?.length === 0
        ) {
            return false;
        }

        return true;
    };

    const validateFormSeat = (data) => data.seat_ids?.length >= passengerCount;

    return (
        <div className="mt-8 space-y-4">
            <BookingFormProvider
                defaultValues={{
                    name: defaultValues?.name || "",
                    phone: defaultValues?.phone || "",
                    email: defaultValues?.email || "",
                    address: defaultValues?.address || "",
                    passengers: [],
                    seat_ids: [],
                    schedule_id: query?.scheduleId,
                    payment_method: "",
                }}
            >
                <BookingStepper
                    steps={[
                        {
                            label: "Informasi Penumpang",
                            component: (
                                <BookingFormIdentity
                                    passengerCount={passengerCount}
                                />
                            ),
                            validate: validateFormIdentity,
                        },
                        {
                            label: "Pilih Kursi",
                            component: (
                                <BookingFormSeat
                                    passengerCount={passengerCount}
                                />
                            ),
                            validate: validateFormSeat,
                        },
                        {
                            label: "Pembayaran",
                            component: <BookingFormPayment />,
                        },
                    ]}
                />
            </BookingFormProvider>
        </div>
    );
}
