import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { Modal, Button, ValidationErrors } from "@/Components";
import { formatRupiah } from "@/Utils/formatter";
import { usePage } from "@inertiajs/inertia-react";

export default function BookingConfirmPaymentModal({ open, onClose, booking }) {
    const { errors } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);

    const findIfUserHasTransferred = booking?.booking_payments.find(
        (item) =>
            item.status === "pending" &&
            item.method === "transfer" &&
            item.transfer_proof_url !== null &&
            item.paid_at !== null
    );

    const findIfUserPaymentMethodIsCash = booking?.booking_payments.find(
        (item) => item.status === "pending" && item.method === "cash"
    );

    const paymentMethod =
        findIfUserHasTransferred || findIfUserPaymentMethodIsCash;

    const confirmPayment = (accept = false) => {
        Inertia.put(
            // eslint-disable-next-line no-undef
            route("admin.bookings.update", booking.id),
            {
                booking_id: booking?.id,
                method: paymentMethod?.method,
                status: accept ? "complete" : "cancelled",
                payment_status: accept ? "success" : "failed",
            },
            {
                preserveState: true,
                onBefore: () => setIsLoading(true),
                onError: () => setIsLoading(false),
                onSuccess: () => {
                    setIsLoading(false);
                    onClose && onClose();
                },
            }
        );
    };

    const isEligibleTransferMethod =
        booking?.status === "pending" &&
        findIfUserHasTransferred?.transfer_proof_url !== null &&
        findIfUserHasTransferred?.paid_at !== null;

    const isEligibleCashMethod =
        booking?.status === "pending" &&
        findIfUserPaymentMethodIsCash?.method === "cash";

    return (
        <Modal
            title={
                <div className="flex items-center gap-2">
                    <InformationCircleIcon
                        width={28}
                        height={28}
                        className="text-blue-500"
                    />
                    <p>Confirm Payment</p>
                </div>
            }
            isOpen={open}
            onClose={() => {
                onClose && onClose();
            }}
            footer={
                <div className="flex justify-end gap-2">
                    {(isEligibleTransferMethod || isEligibleCashMethod) && (
                        <>
                            <Button
                                size="sm"
                                colorScheme="blue"
                                disabled={isLoading}
                                onClick={() => confirmPayment(true)}
                            >
                                {isLoading ? "Loading..." : "Accept Payment"}
                            </Button>
                            <Button
                                size="sm"
                                colorScheme="red"
                                disabled={isLoading}
                                onClick={() => confirmPayment(false)}
                            >
                                {isLoading ? "Loading..." : "Decline Payment"}
                            </Button>
                        </>
                    )}
                </div>
            }
        >
            <div className="max-w-full space-y-4">
                <ValidationErrors errors={errors} />
                <div className="flex flex-col justify-end gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <div>Destination</div>
                        <div>
                            <p className="text-gray-500">
                                {booking?.from_outlet_name} -{" "}
                                {booking?.to_outlet_name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div>Schedule Price</div>
                        <div>
                            <p className="text-gray-500">
                                {formatRupiah(booking?.schedule_price)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div>Customer Name</div>
                        <div>
                            <p className="text-gray-500">{booking?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div>Customer Phone</div>
                        <div>
                            <p className="text-gray-500">{booking?.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div>Customer Email</div>
                        <div>
                            <p className="text-gray-500">{booking?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div>Address</div>
                        <div>
                            <p className="text-gray-500">{booking?.address}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div>Total Passenger</div>
                        <div>
                            <p className="text-gray-500">
                                {booking?.passenger_count}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div>Total Price</div>
                        <div>
                            <p className="text-gray-500">
                                {formatRupiah(booking?.total_price)}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <table className="table-auto text-sm w-full">
                        <thead>
                            <tr>
                                <th>Transaction Id</th>
                                <th>Transfer Proof</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booking?.booking_payments?.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        {item.method === "cash" ? (
                                            "-"
                                        ) : (
                                            <img
                                                src={item.transfer_proof_url}
                                                alt={item.transfer_proof_url}
                                                className="w-20 h-20 object-cover"
                                            />
                                        )}
                                    </td>
                                    <td>{item.method.toUpperCase()}</td>
                                    <td>
                                        {item.status === "success" &&
                                        item.paid_at !== null
                                            ? "Paid"
                                            : item.status === "failed"
                                            ? "Cancelled"
                                            : "Unpaid"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
}
