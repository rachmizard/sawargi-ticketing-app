/* eslint-disable no-undef */
import { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { format } from "date-fns";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import {
    AlertCard,
    Badge,
    Button,
    Datatable,
    Modal,
    Pagination,
    WrapperContent,
} from "@/Components";

import Authenticated from "@/Layouts/Authenticated";
import { formatRupiah } from "@/Utils/formatter";

export default function Schedule(props) {
    const {
        ziggy: { query },
    } = props || {};

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [id, setId] = useState(null);

    const columnDefs = [
        {
            headerName: "ID",
            field: "id",
            render: (props) => {
                return props.id;
            },
        },
        {
            headerName: "Destination",
            field: "destination_id",
            render: (props) => {
                return (
                    <Badge variant="outline">
                        {props.destination?.from_outlet?.name} -{" "}
                        {props.destination?.to_outlet?.name}
                    </Badge>
                );
            },
        },
        {
            headerName: "Vehicle/Shuttle",
            field: "shuttle_id",
            render: (props) => {
                return props.shuttle?.number_plate;
            },
        },
        {
            headerName: "Price",
            field: "price",
            render: (props) => {
                return formatRupiah(props.price);
            },
        },
        {
            headerName: "Departure Date",
            field: "departure_date",
            render: (props) => {
                return format(
                    new Date(props.departure_date),
                    "dd MMM yyyy HH:mm"
                );
            },
        },
        {
            headerName: "Arrival Date",
            field: "arrival_date",
            render: (props) => {
                return format(
                    new Date(props.arrival_date),
                    "dd MMM yyyy HH:mm"
                );
            },
        },
        {
            headerName: "Seats Available",
            field: "seats",
            render: (props) => {
                return (
                    <Badge variant="outline" colorScheme="success">
                        {props.vacant_seats_count}
                    </Badge>
                );
            },
        },
        {
            headerName: "Action",
            field: "action",
            render: (props) => {
                return (
                    <div className="flex gap-2">
                        <Link href={route("admin.schedules.show", props.id)}>
                            <Button
                                size="sm"
                                colorScheme="gray"
                                variant="outline"
                            >
                                Edit
                            </Button>
                        </Link>
                        <Button
                            size="sm"
                            onClick={() => {
                                setConfirmDelete(true);
                                setId(props.id);
                            }}
                            colorScheme="red"
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];

    const handleChangePerPage = (value) => {
        Inertia.get(
            route("admin.schedules"),
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

    const handleDelete = () => {
        Inertia.delete(route("admin.schedules.destroy", id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setConfirmDelete(false);
            },
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Schedule List
                </h2>
            }
        >
            <Head title="Schedule" />

            <WrapperContent>
                <AlertCard isOpen={!!props.flash?.success} variant="success">
                    {props.flash?.success}
                </AlertCard>

                <AlertCard isOpen={!!props.flash?.error} variant="danger">
                    {props.flash?.error}
                </AlertCard>

                <div className="p-6 bg-white border-b border-gray-200">
                    <div className="flex justify-end items-start mb-4">
                        <Link
                            href={route("admin.schedules.create")}
                            preserveScroll
                            allowFullScreen
                            as="button"
                        >
                            <Button colorScheme="gray" variant="outline">
                                Create Schedule
                            </Button>
                        </Link>
                    </div>
                </div>
                <Datatable
                    columnDefs={columnDefs}
                    data={props.schedules.data ?? []}
                    paginationComponent={
                        <Pagination links={props.schedules.links ?? []} />
                    }
                    perPage={query.per_page ?? 10}
                    onChangePerPage={handleChangePerPage}
                />
            </WrapperContent>

            <Modal
                title={
                    <div className="flex items-center gap-2">
                        <ExclamationCircleIcon
                            width={28}
                            height={28}
                            className="text-red-500"
                        />
                        <p>Are you sure want to delete this data?</p>
                    </div>
                }
                isOpen={confirmDelete}
                onClose={() => {
                    setConfirmDelete(false);
                }}
                footer={
                    <div className="flex justify-end gap-2">
                        <Button
                            size="sm"
                            onClick={() => {
                                setConfirmDelete(false);
                            }}
                            colorScheme="red"
                            variant="solid"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            colorScheme="gray"
                            variant="solid"
                            onClick={handleDelete}
                        >
                            Yes, I&apos;m sure
                        </Button>
                    </div>
                }
            >
                <p>This will erase data forever! </p>
            </Modal>
        </Authenticated>
    );
}
