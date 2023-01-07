import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import { Button, Datatable, Pagination, WrapperContent } from "@/Components";
import { DestinationFilterSection } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";

export default function Destination(props) {
    const {
        ziggy: { query },
    } = props || {};

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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Destination List
                </h2>
            }
        >
            <Head title="Destinations" />

            <WrapperContent>
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
        </Authenticated>
    );
}
