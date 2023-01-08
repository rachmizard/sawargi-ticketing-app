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
import { DestinationFilterSection } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";

export default function Destination(props) {
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
            headerName: "Destination Name",
            field: "name",
            render: (props) => {
                return props.name;
            },
        },
        {
            headerName: "City",
            field: "city_type",
            render: (props) => {
                return props.city_type;
            },
        },
        {
            headerName: "Action",
            field: "action",
            render: (props) => {
                return (
                    <div className="flex gap-2">
                        <Link href={route("admin.destinations.show", props.id)}>
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
            route("admin.destinations"),
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
        Inertia.delete(route("admin.destinations.destroy", id), {
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
                    Destination List
                </h2>
            }
        >
            <Head title="Destinations" />

            <WrapperContent>
                <AlertCard isOpen={!!props.flash?.message} variant="success">
                    {props.flash?.message}
                </AlertCard>

                <div className="p-6 bg-white border-b border-gray-200">
                    <div className="flex gap-2 justify-between items-start mb-4">
                        <DestinationFilterSection
                            values={{
                                city: query?.city ?? "all",
                            }}
                            useServerSideFilter
                        />

                        <Link
                            href={route("admin.destinations.create")}
                            preserveScroll
                            allowFullScreen
                            as="button"
                        >
                            <Button colorScheme="gray" variant="outline">
                                Create Destination
                            </Button>
                        </Link>
                    </div>
                </div>
                <Datatable
                    columnDefs={columnDefs}
                    data={props.destinations.data ?? []}
                    paginationComponent={
                        <Pagination links={props.destinations.links ?? []} />
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
