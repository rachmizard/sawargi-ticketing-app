/* eslint-disable no-undef */
import { EyeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import { useState } from "react";

import {
    AlertCard,
    Button,
    Datatable,
    Modal,
    Pagination,
    WrapperContent,
} from "@/Components";

import Authenticated from "@/Layouts/Authenticated";
import { formatDate, formatRupiah } from "@/Utils/formatter";

export default function BookingPage(props) {
    const {
        ziggy: { query },
    } = props || {};

    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [booking, setBooking] = useState(null);

    const columnDefs = [
        {
            headerName: "ID",
            field: "id",
            render: (props) => {
                return props.id;
            },
        },
        {
            headerName: "Schedule",
            render: (props) => {
                return `${props?.from_outlet_name} - ${props?.to_outlet_name}`;
            },
        },
        {
            headerName: "Departure Date",
            render: (props) => {
                return formatDate(Date.parse(props.departure_date), {
                    locale: "id",
                    options: {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    },
                });
            },
        },
        {
            headerName: "Customer Name",
            render: (props) => {
                return props.name;
            },
        },
        {
            headerName: "Customer Phone",
            render: (props) => {
                return props.phone;
            },
        },
        {
            headerName: "Total Passenger",
            render: (props) => {
                return props?.passenger_count;
            },
        },
        {
            headerName: "Total Price",
            render: (props) => {
                return formatRupiah(props.total_price);
            },
        },
        {
            headerName: "Status",
            render: (props) => {
                return props.status;
            },
        },
        {
            headerName: "Action",
            field: "action",
            render: (props) => {
                return (
                    <Button
                        onClick={() => {
                            setOpenPaymentModal(true);
                            setBooking(props);
                        }}
                        size="sm"
                        colorScheme="blue"
                        variant="solid"
                    >
                        <EyeIcon width={18} />
                    </Button>
                );
            },
        },
    ];

    const handleChangePerPage = (value) => {
        Inertia.get(
            route("admin.bookings"),
            {
                ...query,
                per_page: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Booking List
                </h2>
            }
        >
            <Head title="Destinations" />

            <WrapperContent>
                <AlertCard isOpen={!!props.flash?.success} variant="success">
                    {props.flash?.success}
                </AlertCard>

                <div className="p-6 bg-white border-b border-gray-200">
                    {
                        // TODO: Add filter
                    }
                </div>
                <Datatable
                    columnDefs={columnDefs}
                    data={props.bookings.data ?? []}
                    paginationComponent={
                        <Pagination links={props.bookings.links ?? []} />
                    }
                    perPage={query.per_page ?? 10}
                    onChangePerPage={handleChangePerPage}
                />
            </WrapperContent>

            <ConfirmPaymentModal
                open={openPaymentModal}
                onClose={() => setOpenPaymentModal(false)}
                booking={booking}
            />
        </Authenticated>
    );
}

function ConfirmPaymentModal({ open, onClose, booking }) {
    const [isLoading, setIsLoading] = useState(false);
    const confirmPayment = (accept = false) => {
        Inertia.put(
            route("admin.bookings.update", booking.id),
            {
                booking_id: booking?.id,
                status: accept ? "complete" : "cancelled",
                payment_status: accept ? "success" : "failed",
            },
            {
                preserveState: false,
                onBefore: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            }
        );
    };

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
                </div>
            }
        >
            <div className="max-w-full space-y-4">
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
                                <th>Transfer Proof</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booking?.booking_payments?.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img
                                            src={item.transfer_proof_url}
                                            alt={item.transfer_proof_url}
                                            className="w-20 h-20 object-cover"
                                        />
                                    </td>
                                    <td>{item.method.toUpperCase()}</td>
                                    <td>
                                        {item.paid_at !== null
                                            ? "Paid"
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
