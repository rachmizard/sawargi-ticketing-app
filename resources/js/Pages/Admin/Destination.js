import React from "react";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import { Button, Datatable, Pagination } from "@/Components";
import { DestinationFilterSection } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";

export default function Destination(props) {
    const {
        ziggy: { query },
    } = props || {};

    const columnDefs = [
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
            render: () => {
                return (
                    <div className="flex gap-2">
                        <Button size="sm" colorScheme="gray" variant="outline">
                            Edit
                        </Button>
                        <Button size="sm" colorScheme="red" variant="outline">
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
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Destination List
                    </h2>

                    <Button colorScheme="gray" variant="outline">
                        Create Destination
                    </Button>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <DestinationFilterSection
                                values={{
                                    city: query?.city ?? "all",
                                }}
                                useServerSideFilter
                            />
                        </div>
                        <Datatable
                            columnDefs={columnDefs}
                            data={props.destinations.data ?? []}
                            paginationComponent={
                                <Pagination
                                    links={props.destinations.links ?? []}
                                />
                            }
                            onChangePerPage={handleChangePerPage}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
