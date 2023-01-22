import { usePage } from "@inertiajs/inertia-react";
import { useBookingFormContext } from "./BookingContext";
import BookingSeatCard from "./SeatCard";

export default function BookingFormSeat({ passengerCount = 0 }) {
    const { schedule } = usePage().props;
    const { seats = [] } = schedule || {};

    const { data, setData } = useBookingFormContext();

    const handleSeatClick = (seatNumber) => {
        if (data.seat_ids.length >= passengerCount) {
            if (data.seat_ids.includes(seatNumber)) {
                setData({
                    ...data,
                    seat_ids: data.seat_ids.filter(
                        (seat) => seat !== seatNumber
                    ),
                });
            }

            return;
        }

        if (data.seat_ids.includes(seatNumber)) {
            setData({
                ...data,
                seat_ids: data.seat_ids.filter((seat) => seat !== seatNumber),
            });
        } else {
            setData({
                ...data,
                seat_ids: [...data.seat_ids, seatNumber],
            });
        }
    };

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
                    <h1 className="text-lg text-gray-500 tracking-tighter leading-loose">
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
                                selectedSeatIds={data.seat_ids}
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
