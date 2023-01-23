import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { usePage } from "@inertiajs/inertia-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import Button from "@/Components/Button";
import { useBookingFormContext } from "./FormContext";

import BookingSeatCard from "./SeatCard";
import { useBookingStepperContext } from "./Stepper";

export default function BookingFormSeat({ passengerCount = 0 }) {
    const { schedule } = usePage().props;
    const { seats = [] } = schedule || {};

    const { trigger, setValue, formState, getValues } = useFormContext();
    const { setData } = useBookingFormContext();
    const { activeIndex, handleStepClick, steps } = useBookingStepperContext();

    useFieldArray({
        name: "seat_ids",
        rules: {
            minLength: {
                message: `${passengerCount} kursi harus dipilih`,
                value: passengerCount,
            },
            maxLength: {
                message: `Maksimal ${passengerCount} kursi yang dapat dipilih`,
                value: passengerCount,
            },
            required: "Silahkan pilih kursi terlebih dahulu",
        },
    });

    const selectedSeatIds = useWatch({
        name: "seat_ids",
        defaultValue: [],
    });

    const handleSeatClick = (seatNumber) => {
        if (selectedSeatIds.length >= passengerCount) {
            if (selectedSeatIds.includes(seatNumber)) {
                setValue(
                    "seat_ids",
                    selectedSeatIds.filter((seat) => seat !== seatNumber),
                    {
                        shouldValidate: true,
                    }
                );
            }

            return;
        }

        if (selectedSeatIds.includes(seatNumber)) {
            setValue(
                "seat_ids",
                selectedSeatIds.filter((seat) => seat !== seatNumber),
                {
                    shouldValidate: true,
                }
            );
        } else {
            setValue("seat_ids", [...selectedSeatIds, seatNumber], {
                shouldValidate: true,
            });
        }
    };

    const errorSeatIds = formState?.errors?.seat_ids?.root?.message;

    const submit = async (e, values) => {
        e.preventDefault();

        const valid = await trigger(["seat_ids"]);
        if (!valid) return;

        setData(values);

        activeIndex !== steps.length - 1 && handleStepClick(activeIndex + 1);
    };

    return (
        <form onSubmit={(e) => submit(e, getValues())}>
            <div className="max-w-full sm:max-w-xl mx-auto">
                <h1 className="text-2xl text-gray-500 text-center font-semibold leading-loose tracking-tighter">
                    Indikator Warna
                </h1>
                <div className="grid grid-cols-1 justify-items-start sm:grid-cols-3 sm:justify-items-center gap-4 mt-4">
                    <div className="flex gap-2 items-center">
                        <div className="bg-yellow-500 w-8 h-8 rounded-lg"></div>
                        <p className="">Sudah dipesan</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-sky-500 w-8 h-8 rounded-lg"></div>
                        <p className="">Kursi pilihan anda</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-gray-100 w-8 h-8 rounded-lg"></div>
                        <p className="">Belum dipilih</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mt-4">
                    <h1
                        className={`text-lg ${
                            errorSeatIds ? "text-red-500" : "text-gray-500"
                        } tracking-tighter leading-loose`}
                    >
                        Pilih {passengerCount} kursi penumpang yang tersedia
                        dibawah ini
                    </h1>
                </div>
            </div>
            <div className="max-w-sm mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                    {seats.map((seat, key) => {
                        return (
                            <BookingSeatCard
                                key={key}
                                selectedSeatIds={selectedSeatIds}
                                seat={seat}
                                passengerCount={passengerCount}
                                onChange={handleSeatClick}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <Button
                    type="button"
                    colorScheme="blue"
                    onClick={() => {
                        activeIndex !== steps.length - 1 &&
                            handleStepClick(activeIndex - 1);
                    }}
                    className="gap-2 font-semibold"
                >
                    <ArrowLeftIcon width={18} />
                    <span>Sebelumnya</span>
                </Button>

                {activeIndex !== steps.length - 1 && (
                    <Button
                        type="submit"
                        colorScheme="blue"
                        className="gap-2 font-semibold"
                    >
                        <span>Selanjutnya</span>
                        <ArrowRightIcon width={18} />
                    </Button>
                )}
            </div>
        </form>
    );
}
