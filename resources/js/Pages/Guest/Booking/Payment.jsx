import {
    ArrowDownCircleIcon,
    ArrowPathIcon,
    ArrowUpCircleIcon,
    BanknotesIcon,
    CalendarDaysIcon,
    IdentificationIcon,
    PhoneIcon,
    TruckIcon,
    UserGroupIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { Inertia } from "@inertiajs/inertia";
import {
    Head,
    useForm as useInertiaForm,
    usePage,
} from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
    AlertCard,
    Button,
    Modal,
    Progressbar,
    ValidationErrors,
} from "@/Components";
import UserLayout from "@/Layouts/User";
import { formatDate, formatRupiah } from "@/Utils/formatter";

export default function BookingPaymentPage({ auth, booking }) {
    const [isOpenUploadTransferProof, setOpenUploadTransferProof] =
        useState(false);
    const [isExpired, setExpired] = useState(false);

    const bookingPayment = booking.booking_payments[0] ?? null;
    const schedule = booking?.schedule ?? null;
    const isCash = bookingPayment?.method === "cash";
    const isTransfer = bookingPayment?.method === "transfer";

    const userHasTransferredProof =
        !!bookingPayment?.transfer_proof || !!bookingPayment.paid_at;

    function setExpiredClientAndServer() {
        setExpired(true);
        Inertia.put(
            // eslint-disable-next-line no-undef
            route("booking.expired", booking.id),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }

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

                    <PaymentInformation
                        booking={booking}
                        bookingPayment={bookingPayment}
                        userHasTransferredProof={userHasTransferredProof}
                    />

                    <PaymentActionButtons
                        expiredAt={bookingPayment?.expired_at}
                        isWaitingConfirmation={userHasTransferredProof}
                        isTransfer={isTransfer}
                        forceRedirect
                        onPay={() => setOpenUploadTransferProof(true)}
                        onExpired={setExpiredClientAndServer}
                    />
                </div>
            </div>

            <Modal
                isOpen={isOpenUploadTransferProof && !isExpired}
                onClose={() => setOpenUploadTransferProof(false)}
            >
                <div className="max-w-lg space-y-4">
                    <PaymentInformation
                        title={
                            <h2 className="font-bold text-2xl text-gray-400 tracking-tighter">
                                Upload Bukti Pembayaran
                            </h2>
                        }
                        booking={booking}
                        bookingPayment={bookingPayment}
                    />

                    <FormUploadTransferProof
                        booking={booking}
                        isTransfer={isTransfer}
                        userHasTransferredProof={userHasTransferredProof}
                    />
                </div>
            </Modal>
        </UserLayout>
    );
}

function PaymentActionButtons({
    expiredAt,
    isTransfer,
    onExpired,
    forceRedirect,
    isWaitingConfirmation,
    onPay,
}) {
    const timeLeft = useTimeLeft(expiredAt, isWaitingConfirmation);
    const isExpiredPayment = timeLeft <= 0;

    useEffect(() => {
        if (
            isExpiredPayment &&
            onExpired &&
            forceRedirect &&
            !isWaitingConfirmation
        ) {
            onExpired();
        }
    }, [isExpiredPayment, onExpired, forceRedirect, isWaitingConfirmation]);

    return (
        <div>
            {isTransfer && !isExpiredPayment && !isWaitingConfirmation && (
                <Button onClick={onPay} className="w-full" colorScheme="green">
                    Bayar
                </Button>
            )}

            {isExpiredPayment && !isWaitingConfirmation && (
                <Button
                    className="w-full"
                    colorScheme="red"
                    onClick={onExpired}
                >
                    Pembayaran Berakhir
                </Button>
            )}

            {isWaitingConfirmation && (
                <div className="w-full flex items-center justify-center gap-2">
                    <ArrowPathIcon className="w-6 h-6 animate-spin \" />
                    <span>Menunggu Konfirmasi Admin</span>
                </div>
            )}
        </div>
    );
}

function ExpiredPaymentSection({ expiredAt, userHasTransferredProof }) {
    const timeLeft = useTimeLeft(expiredAt, userHasTransferredProof);
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

            {userHasTransferredProof && <p>Pembayaran diproses</p>}

            {!isExpiredPayment && !userHasTransferredProof && (
                <div className="flex items-center gap-2">
                    <p className={`font-semibold ${textClassNames}`}>
                        {isExpiredPayment
                            ? "Expired"
                            : new Date(timeLeft).toISOString().substr(11, 8)}
                    </p>
                </div>
            )}
        </div>
    );
}

function FormUploadTransferProof({
    booking,
    isTransfer,
    userHasTransferredProof,
}) {
    const { errors } = usePage().props;
    const { post, processing, wasSuccessful, setData, progress } =
        useInertiaForm("FormUploadTransferProof", {
            transfer_proof: null,
            booking_id: booking.id,
        });
    const [previewImg, setPreviewImg] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const { handleSubmit, register, watch, formState } = useForm({
        defaultValues: {
            transfer_proof: null,
            booking_id: booking.id,
        },
    });
    const { isValid, isDirty } = formState;

    const file = watch("transfer_proof");

    const submit = (values) => {
        // eslint-disable-next-line no-undef
        post(route("booking.pay", booking.id), {
            data: values,
            forceFormData: true,
        });
    };

    const readImageFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener(
                "load",
                () => resolve(reader.result),
                false
            );
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if (file && file.length > 0 && !isUploading) {
            (async () => {
                setIsUploading(true);
                const preview = await readImageFile(file[0]);
                setPreviewImg(preview);
                setIsUploading(false);
            })();
        }
    }, [file]);

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
            <ValidationErrors errors={errors} />

            <AlertCard
                title="Pembayaran Transfer"
                variant="info"
                isOpen={isTransfer && !userHasTransferredProof}
                infinite={isTransfer && !userHasTransferredProof}
            >
                <p>
                    Silahkan lakukan pembayaran melalui BCA Virtual Account ke
                    nomor{" "}
                    <span className="font-bold leading-loose">1234567890</span>,
                    dengan nominal{" "}
                    <span className="font-bold leading-loose">
                        {formatRupiah(booking?.total_price)}
                    </span>
                </p>
            </AlertCard>

            <AlertCard
                isOpen={wasSuccessful || userHasTransferredProof}
                infinite={wasSuccessful || userHasTransferredProof}
                variant="success"
                title="Pembayaran Berhasil"
            >
                <p>
                    Pembayaran berhasil, silahkan tunggu konfirmasi dari admin.
                </p>
                <p>
                    Terima kasih telah menggunakan layanan kami Sawargi Ticket
                    App.
                </p>
            </AlertCard>

            {!userHasTransferredProof && (
                <input
                    type="file"
                    multiple={false}
                    accept="image/*"
                    {...register("transfer_proof", {
                        required: "File harus diisi",
                        onChange: (e) => {
                            setData("transfer_proof", e.target.files[0]);
                        },
                    })}
                />
            )}

            {progress && (
                <Progressbar max={100} progress={progress.percentage} />
            )}

            {isUploading && (
                <div className="w-full block border border-gray-400 rounded-md min-h-[2rem]">
                    <div className="flex items-center justify-center h-full">
                        <p>Uploading...</p>
                    </div>
                </div>
            )}

            {file &&
                file.length > 0 &&
                !isUploading &&
                !userHasTransferredProof && (
                    <div className="w-full block min-h-[2rem]">
                        <div className="flex items-center justify-center h-full">
                            <img
                                src={previewImg}
                                className="object-cover"
                                alt="Gambar"
                            />
                        </div>
                    </div>
                )}

            {!userHasTransferredProof && (
                <Button
                    type="submit"
                    disabled={!isValid || !isDirty || processing}
                    className="w-full"
                    colorScheme="blue"
                >
                    Lampirkan
                </Button>
            )}
        </form>
    );
}

function PaymentInformation({
    title = "Pembayaran",
    booking,
    bookingPayment,
    userHasTransferredProof,
}) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl text-gray-400 tracking-tighter">
                {title}
            </h2>

            <div className="grid grid-cols-3 gap-4">
                <div className="block">
                    <p className="text-gray-400 text-sm">Kode Booking</p>
                    <div className="flex items-center gap-2">
                        <IdentificationIcon className="h-5 text-gray-500" />
                        <p className="font-semibold text-gray-700">
                            {booking?.id}
                        </p>
                    </div>
                </div>
                <div className="block">
                    <p className="text-gray-400 text-sm">Metode Pembayaran</p>
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
                    <p className="text-gray-400 text-sm">Total Harga</p>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-700">
                            {formatRupiah(booking?.total_price)}
                        </p>
                    </div>
                </div>

                <ExpiredPaymentSection
                    expiredAt={bookingPayment?.expired_at}
                    userHasTransferredProof={userHasTransferredProof}
                />
            </div>
        </div>
    );
}

function useTimeLeft(expiredAt, isStop = false) {
    const [timeLeft, setTimeLeft] = useState(
        Date.parse(expiredAt) - Date.now()
    );

    useEffect(() => {
        if (!expiredAt || isStop) return;
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            const timeLeft = Date.parse(expiredAt) - Date.now();
            setTimeLeft(timeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiredAt, isStop]);

    return timeLeft;
}
