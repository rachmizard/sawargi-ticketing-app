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

    return (
        <div className="mt-8 space-y-4">
            <BookingFormProvider
                defaultValues={{
                    name: defaultValues?.name || "",
                    phone: defaultValues?.phone || "",
                    email: defaultValues?.email || "",
                    address: defaultValues?.address || "",
                    passengers: Array.from({ length: passengerCount }).map(
                        () => ({
                            value: "",
                        })
                    ),
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
                            validate: [
                                "name",
                                "phone",
                                "email",
                                "address",
                                "passengers",
                            ],
                        },
                        {
                            label: "Pilih Kursi",
                            component: (
                                <BookingFormSeat
                                    passengerCount={passengerCount}
                                />
                            ),
                            validate: ["seat_ids"],
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
