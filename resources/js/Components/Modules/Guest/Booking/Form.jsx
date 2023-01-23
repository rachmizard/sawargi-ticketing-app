import { FormProvider, useForm as useReactHookForm } from "react-hook-form";

import BookingFormIdentity from "./FormIdentity";
import BookingStepper from "./Stepper";
import BookingFormSeat from "./FormSeat";
import BookingFormProvider, { useBookingFormContext } from "./FormContext";
import BookingFormPayment from "./FormPayment";

export default function BookingForm({ defaultValues, passengerCount = 0 }) {
    return (
        <div className="mt-8 space-y-4">
            <BookingFormProvider>
                <BookingStepper
                    steps={[
                        {
                            label: "Informasi Penumpang",
                            component: (
                                <ReactHookFormProvider
                                    defaultValues={{
                                        name: defaultValues?.name || "",
                                        phone: defaultValues?.phone || "",
                                        email: defaultValues?.email || "",
                                        address: defaultValues?.address || "",
                                        passengers: Array.from({
                                            length: passengerCount,
                                        }).map(() => ({
                                            value: "",
                                        })),
                                    }}
                                    reValidateMode="onChange"
                                    mode="onChange"
                                >
                                    <BookingFormIdentity
                                        passengerCount={passengerCount}
                                    />
                                </ReactHookFormProvider>
                            ),
                        },
                        {
                            label: "Pilih Kursi",
                            component: (
                                <ReactHookFormProvider
                                    defaultValues={{
                                        seat_ids: [],
                                    }}
                                >
                                    <BookingFormSeat
                                        passengerCount={passengerCount}
                                    />
                                </ReactHookFormProvider>
                            ),
                        },
                        {
                            label: "Pembayaran",
                            component: (
                                <ReactHookFormProvider
                                    defaultValues={{
                                        payment_method: "",
                                    }}
                                >
                                    <BookingFormPayment />
                                </ReactHookFormProvider>
                            ),
                        },
                    ]}
                />
            </BookingFormProvider>
        </div>
    );
}

const ReactHookFormProvider = ({ children, defaultValues, ...options }) => {
    const { data } = useBookingFormContext();

    const methods = useReactHookForm({
        defaultValues: data,
        ...options,
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
};
