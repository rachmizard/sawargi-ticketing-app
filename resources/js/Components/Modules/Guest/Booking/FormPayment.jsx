import { usePage } from "@inertiajs/inertia-react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import AlertCard from "@/Components/AlertCard";
import Button from "@/Components/Button";

import { useBookingFormContext } from "./FormContext";
import { useBookingStepperContext } from "./Stepper";

import { formatRupiah } from "@/Utils/formatter";

export default function BookingFormPayment() {
    const { schedule } = usePage().props;

    const { register, getValues, formState, trigger } = useFormContext();
    const { handleSubmit } = useBookingFormContext();
    const { activeIndex, handleStepClick } = useBookingStepperContext();

    register("payment_method", {
        required: "Metode pembayaran harus dipilih",
    });

    const passengers = useWatch({
        name: "passengers",
        defaultValue: [],
    });

    const paymentMethod = useWatch({
        name: "payment_method",
        defaultValue: "cash",
    });

    const isCash = paymentMethod === "cash";
    const isTransfer = paymentMethod === "transfer";
    const price = formatRupiah(schedule.price * passengers?.length ?? 0);

    const finalSubmit = (e, values) => {
        e.preventDefault();
        const valid = trigger(["payment_method"]);
        if (!valid) return;

        handleSubmit(values);
    };

    return (
        <form onSubmit={(e) => finalSubmit(e, getValues())}>
            <div className="flex flex-col">
                {/* <p>{JSON.stringify(data, null, 2)}</p> */}

                <AlertCard
                    title="Pembayaran Cash"
                    variant="info"
                    isOpen={isCash}
                    infinite={isCash}
                >
                    <p>
                        Jika pembayaran cash, silahkan datang ke outlet yang
                        dituju
                    </p>
                </AlertCard>

                <AlertCard
                    title="Pembayaran Transfer"
                    variant="info"
                    isOpen={isTransfer}
                    infinite={isTransfer}
                >
                    <p>
                        Silahkan lakukan pembayaran melalui BCA Virtual Account
                        ke nomor{" "}
                        <span className="font-bold leading-loose">
                            1234567890
                        </span>
                        , dengan nominal{" "}
                        <span className="font-bold leading-loose">
                            {price} (
                            {`${
                                passengers?.length ?? 0
                            } Penumpang * ${formatRupiah(schedule.price)}  `}
                            )
                        </span>
                        , dan sertakan bukti transfer di halaman selanjutnya.
                    </p>
                </AlertCard>

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl text-gray-500 tracking-tighter leading-loose font-semibold">
                        Pilih Metode Pembayaran
                    </h1>
                    <div className="flex items-center space-x-2">
                        <Controller
                            name="payment_method"
                            render={({ field }) => (
                                <input
                                    id="cash"
                                    type="radio"
                                    name="payment_method"
                                    value="cash"
                                    onChange={field.onChange}
                                    checked={field.value === "cash"}
                                />
                            )}
                        />
                        <label
                            htmlFor="cash"
                            className="text-gray-600 font-bold tracking-wide"
                        >
                            Cash
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Controller
                            name="payment_method"
                            render={({ field }) => (
                                <input
                                    id="transfer"
                                    type="radio"
                                    name="payment_method"
                                    value="transfer"
                                    onChange={field.onChange}
                                    checked={field.value === "transfer"}
                                />
                            )}
                        />
                        <label
                            htmlFor="transfer"
                            className="text-gray-600 font-bold tracking-wide"
                        >
                            Transfer
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <Button
                        type="button"
                        colorScheme="blue"
                        onClick={() => {
                            handleStepClick(activeIndex - 1);
                        }}
                        className="gap-2 font-semibold"
                    >
                        <ArrowLeftIcon width={18} />
                        <span>Sebelumnya</span>
                    </Button>

                    <Button
                        type="submit"
                        colorScheme="green"
                        className="gap-2 font-semibold"
                        disabled={!formState.isValid}
                    >
                        <span>Pesan</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
