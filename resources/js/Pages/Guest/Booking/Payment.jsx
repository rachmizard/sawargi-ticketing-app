import { useState, useEffect } from "react";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import {
    ArrowDownCircleIcon,
    ArrowUpCircleIcon,
    BanknotesIcon,
    CalendarDaysIcon,
    IdentificationIcon,
    PhoneIcon,
    TruckIcon,
    UserGroupIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

import UserLayout from "@/Layouts/User";
import { AlertCard, Button } from "@/Components";
import { formatRupiah, formatDate } from "@/Utils/formatter";

export default function BookingPaymentPage({ auth, booking }) {
    const bookingPayment = booking.booking_payments[0] ?? null;
    const schedule = booking?.schedule ?? null;
    const isCash = bookingPayment?.method === "cash";
    const isTransfer = bookingPayment?.method === "transfer";

    return (
        <UserLayout auth={auth}>
            <Head title="Confirmation Payment" />
            <div className="max-w-xl mx-auto px-10 sm:px-6 lg:px-8 pb-8 pt-8 bg-white mt-5 shadow-sm rounded-md">
                <AlertCard
                    variant="info"
                    title="Info Pembayaran"
                    isOpen={isCash}
                    infinite={isCash}
                >
                    <p>Silahkan lakukan pembayaran dioutlet</p>
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
                            {formatRupiah(booking?.total_price)}
                        </span>
                    </p>
                </AlertCard>

                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold text-2xl text-gray-400 tracking-tighter">
                            Jadwal Keberangkatan
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="block">
                                <p className="text-gray-400 text-sm">
                                    Keberangkatan
                                </p>
                                <div className="flex items-center gap-2">
                                    <ArrowUpCircleIcon className="h-5 text-gray-500" />
                                    <p className="font-semibold text-gray-700">
                                        {
                                            schedule?.destination?.from_outlet
                                                ?.name
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="block">
                                <p className="text-gray-400 text-sm">Tujuan</p>
                                <div className="flex items-center gap-2">
                                    <ArrowDownCircleIcon className="h-5 text-gray-500" />
                                    <p className="font-semibold text-gray-700">
                                        {schedule?.destination?.to_outlet?.name}
                                    </p>
                                </div>
                            </div>

                            <div className="block">
                                <p className="text-gray-400 text-sm">
                                    Tanggal Keberangkatan
                                </p>
                                <div className="flex items-center gap-2">
                                    <CalendarDaysIcon className="h-5 text-gray-500" />
                                    <p className="font-semibold text-gray-700">
                                        {formatDate(
                                            Date.parse(
                                                schedule?.departure_date
                                            ),
                                            {
                                                locale: "id-ID",
                                                options: {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                },
                                            }
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="block">
                                <p className="text-gray-400 text-sm">Shuttle</p>
                                <div className="flex items-center gap-2">
                                    <TruckIcon className="h-5 text-gray-500" />
                                    <p className="font-semibold text-gray-700">
                                        {schedule?.shuttle?.number_plate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold text-2xl text-gray-400 tracking-tighter">
                            Informasi Pemesan
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="block">
                                <p className="text-gray-400 text-sm">
                                    Nama Pemesan
                                </p>
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-5 text-gray-500" />
                                    <p className="font-semibold text-gray-700">
                                        {booking?.name}
                                    </p>
                                </div>
                            </div>

                            <div className="block">
                                <p className="text-gray-400 text-sm">
                                    Jumlah Penumpang
                                </p>
                                <div className="flex items-center gap-2">
                                    <UserGroupIcon className="h-5 text-gray-500" />
                                    <p className="font-semibold text-gray-700">
                                        {booking?.booking_seats.length}
                                    </p>
                                </div>
                            </div>

                            <div className="block">
                                <p className="text-gray-400 text-sm">Email</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold truncate text-gray-700">
                                        {booking?.email}
                                    </p>
                                </div>
                            </div>

                            <div className="block">
                                <p className="text-gray-400 text-sm">
                                    Nomor Telepon
                                </p>
                                <div className="flex items-center gap-2">
                                    <PhoneIcon className="h-5 text-gray-500" />
                                    <p className="font-semibold text-gray-700">
                                        {booking?.phone}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="text-left text-gray-400 text-sm">
                                        No.
                                    </th>
                                    <th className="text-left text-gray-400 text-sm">
                                        Nama Penumpang
                                    </th>
                                    <th className="text-left text-gray-400 text-sm">
                                        Nomor Kursi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {booking?.booking_seats.map(
                                    (bookingSeat, key) => (
                                        <tr key={bookingSeat.id}>
                                            <td className="text-gray-700 font-semibold">
                                                {key + 1}
                                            </td>
                                            <td className="text-gray-700 font-semibold">
                                                {bookingSeat?.name}
                                            </td>
                                            <td className="text-gray-700 font-semibold">
                                                {bookingSeat?.seat?.seat_number}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold text-2xl text-gray-400 tracking-tighter">
                            Pembayaran
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="block">
                                <p className="text-gray-400 text-sm">
                                    Kode Booking
                                </p>
                                <div className="flex items-center gap-2">
                                    <IdentificationIcon className="h-5 text-gray-500" />
                                    <p className="font-semibold text-gray-700">
                                        {booking?.id}
                                    </p>
                                </div>
                            </div>
                            <div className="block">
                                <p className="text-gray-400 text-sm">
                                    Metode Pembayaran
                                </p>
                                <div className="flex items-center gap-2">
                                    <BanknotesIcon className="h-5 text-gray-500" />
                                    <p className="font-semibold text-gray-700">
                                        {bookingPayment?.method === "transfer"
                                            ? "Transfer"
                                            : "Tunai"}
                                    </p>
                                </div>
                            </div>

                            <div className="block">
                                <p className="text-gray-400 text-sm">
                                    Total Harga
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-gray-700">
                                        {formatRupiah(booking?.total_price)}
                                    </p>
                                </div>
                            </div>

                            <ExpiredPaymentSection
                                expiredAt={bookingPayment?.expired_at}
                            />
                        </div>
                    </div>

                    <PaymentActionButtons
                        expiredAt={bookingPayment?.expired_at}
                        isTransfer={isTransfer}
                        forceRedirect={false}
                        onExpired={() => {
                            // eslint-disable-next-line no-undef
                            Inertia.replace(route("welcome"));
                        }}
                    />
                </div>
            </div>
        </UserLayout>
    );
}

function PaymentActionButtons({
    expiredAt,
    isTransfer,
    onExpired,
    forceRedirect,
}) {
    const timeLeft = useTimeLeft(expiredAt);
    const isExpiredPayment = timeLeft <= 0;

    useEffect(() => {
        if (isExpiredPayment && onExpired && forceRedirect) {
            onExpired();
        }
    }, [isExpiredPayment, onExpired]);

    return (
        <>
            {isTransfer && !isExpiredPayment && (
                <Button className="w-full" colorScheme="green">
                    Bayar
                </Button>
            )}

            {isExpiredPayment && (
                <Button
                    className="w-full"
                    colorScheme="red"
                    onClick={onExpired}
                >
                    Pembayaran Berakhir
                </Button>
            )}
        </>
    );
}

function ExpiredPaymentSection({ expiredAt }) {
    const timeLeft = useTimeLeft(expiredAt);
    const isExpiredPayment = timeLeft <= 0;
    const isThreeMinutesLeft = timeLeft <= 1000 * 60 * 3 && !isExpiredPayment;

    const textClassNames = {
        expired: "text-red-500",
        warning: "text-yellow-500",
        default: "text-gray-700",
    }[
        isThreeMinutesLeft
            ? "warning"
            : isExpiredPayment
            ? "expired"
            : "default"
    ];

    return (
        <div className="block">
            <p className="text-gray-400 text-sm">Sisa Waktu Pembayaran</p>
            <div className="flex items-center gap-2">
                <p className={`font-semibold ${textClassNames}`}>
                    {isExpiredPayment
                        ? "Expired"
                        : new Date(timeLeft).toISOString().substr(11, 8)}
                </p>
            </div>
        </div>
    );
}

function useTimeLeft(expiredAt) {
    const [timeLeft, setTimeLeft] = useState(
        Date.parse(expiredAt) - Date.now()
    );

    useEffect(() => {
        if (!expiredAt) return;
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            const timeLeft = Date.parse(expiredAt) - Date.now();
            setTimeLeft(timeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiredAt]);

    return timeLeft;
}
