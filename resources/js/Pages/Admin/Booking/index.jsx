/* eslint-disable no-undef */
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import { EyeIcon } from "@heroicons/react/24/outline";

import {
    AlertCard,
    Button,
    Datatable,
    Pagination,
    WrapperContent,
} from "@/Components";

import Authenticated from "@/Layouts/Authenticated";
import {
    BookingConfirmPaymentModal,
    BookingFilterSection,
} from "@/Components/Modules";

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
                    <BookingFilterSection />
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

            <BookingConfirmPaymentModal
                open={openPaymentModal}
                onClose={() => setOpenPaymentModal(false)}
                booking={booking}
            />
        </Authenticated>
    );
}
