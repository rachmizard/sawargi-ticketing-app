/* eslint-disable no-undef */
import { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import {
    AlertCard,
    Button,
    Datatable,
    Modal,
    Pagination,
    WrapperContent,
} from "@/Components";

import Authenticated from "@/Layouts/Authenticated";

export default function Ticket(props) {
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
            headerName: "From",
            field: "from_destination_id",
            render: (props) => {
                return props.from_destination?.name;
            },
        },
        {
            headerName: "To",
            field: "to_destination_id",
            render: (props) => {
                return props.to_destination?.name;
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
                return props.price;
            },
        },
        {
            headerName: "Depart Date",
            field: "depart_date",
            render: (props) => {
                return props.depart_date;
            },
        },
        {
            headerName: "Arrival Date",
            field: "arrival_date",
            render: (props) => {
                return props.arrival_date;
            },
        },
        {
            headerName: "Action",
            field: "action",
            render: (props) => {
                return (
                    <div className="flex gap-2">
                        <Link href={route("admin.tickets.show", props.id)}>
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
            route("admin.tickets"),
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
        Inertia.delete(route("admin.tickets.destroy", id), {
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
                    Ticket List
                </h2>
            }
        >
            <Head title="Ticket" />

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
                            href={route("admin.tickets.create")}
                            preserveScroll
                            allowFullScreen
                            as="button"
                        >
                            <Button colorScheme="gray" variant="outline">
                                Create Ticket
                            </Button>
                        </Link>
                    </div>
                </div>
                <Datatable
                    columnDefs={columnDefs}
                    data={props.tickets.data ?? []}
                    paginationComponent={
                        <Pagination links={props.tickets.links ?? []} />
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
