import { usePage } from "@inertiajs/inertia-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import BookingSeatCard from "./SeatCard";

export default function BookingFormSeat({ passengerCount = 0 }) {
    const { schedule } = usePage().props;
    const { seats = [] } = schedule || {};

    const { setValue, formState } = useFormContext();

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

    return (
        <div className="">
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
        </div>
    );
}
