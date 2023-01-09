import { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
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

export default function Shuttle(props) {
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
            headerName: "Number Plate",
            field: "number_plate",
            render: (props) => {
                return props.number_plate;
            },
        },
        {
            headerName: "Capacity",
            field: "capacity",
            render: (props) => {
                return props.capacity;
            },
        },
        {
            headerName: "Status",
            field: "status",
            render: (props) => {
                return (
                    <Badge
                        variant="outline"
                        colorScheme={
                            props.status === "available" ? "success" : "light"
                        }
                    >
                        {props.status[0].toUpperCase() + props.status.slice(1)}
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
                        <Link href={route("admin.shuttles.show", props.id)}>
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
            route("admin.shuttles"),
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
        Inertia.delete(route("admin.shuttles.destroy", id), {
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
                    Shuttle List
                </h2>
            }
        >
            <Head title="Shuttle" />

            <WrapperContent>
                <AlertCard isOpen={!!props.flash?.message} variant="success">
                    {props.flash?.message}
                </AlertCard>

                <div className="p-6 bg-white border-b border-gray-200">
                    <div className="flex justify-end items-start mb-4">
                        <Link
                            href={route("admin.shuttles.create")}
                            preserveScroll
                            allowFullScreen
                            as="button"
                        >
                            <Button colorScheme="gray" variant="outline">
                                Create Shuttle
                            </Button>
                        </Link>
                    </div>
                </div>
                <Datatable
                    columnDefs={columnDefs}
                    data={props.shuttles.data ?? []}
                    paginationComponent={
                        <Pagination links={props.shuttles.links ?? []} />
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
