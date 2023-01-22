import AlertCard from "@/Components/AlertCard";
import { formatRupiah } from "@/Utils/formatter";
import { usePage } from "@inertiajs/inertia-react";
import { useBookingFormContext } from "./BookingContext";

export default function BookingFormPayment() {
    const { data, handleChange } = useBookingFormContext();
    const { schedule } = usePage().props;

    const isCash = data.payment_method === "cash";
    const isTransfer = data.payment_method === "transfer";
    const price = formatRupiah(schedule.price * data.passengers?.length ?? 0);

    return (
        <div className="flex flex-col">
            {/* <p>{JSON.stringify(data, null, 2)}</p> */}

            <AlertCard
                title="Pembayaran Cash"
                variant="info"
                isOpen={isCash}
                infinite={isCash}
            >
                <p>
                    Jika pembayaran cash, silahkan datang ke outlet yang dituju
                </p>
            </AlertCard>

            <AlertCard
                title="Pembayaran Transfer"
                variant="info"
                isOpen={isTransfer}
                infinite={isTransfer}
            >
                <p>
                    Silahkan lakukan pembayaran melalui BCA Virtual Account ke
                    nomor{" "}
                    <span className="font-bold leading-loose">1234567890</span>,
                    dengan nominal{" "}
                    <span className="font-bold leading-loose">
                        {price} (
                        {`${
                            data.passengers?.length ?? 0
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
                    <input
                        id="cash"
                        type="radio"
                        name="payment_method"
                        value="cash"
                        onChange={handleChange}
                        checked={isCash}
                    />
                    <label
                        htmlFor="cash"
                        className="text-gray-600 font-bold tracking-wide"
                    >
                        Cash
                    </label>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        id="transfer"
                        name="payment_method"
                        value="transfer"
                        type="radio"
                        onChange={handleChange}
                        checked={isTransfer}
                    />
                    <label
                        htmlFor="transfer"
                        className="text-gray-600 font-bold tracking-wide"
                    >
                        Transfer
                    </label>
                </div>
            </div>
        </div>
    );
}
