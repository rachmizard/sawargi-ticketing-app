import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

export default function OutletFilterSection({
    values,
    onChange,
    useServerSideFilter = false,
}) {
    const { query: defaultQuery } = usePage().props.ziggy;
    const [filter, setFilter] = React.useState(values);

    const handleFilterChange = (value, name) => {
        const queryParams = {
            ...defaultQuery,
        };

        if (value) {
            queryParams[name] = value;
        }

        onChange?.(queryParams);
        setFilter(queryParams);

        if (!useServerSideFilter) return;

        Inertia.get(route("admin.outlets"), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="flex">
            <div className="flex flex-1 flex-col gap-1">
                <label className="block text-sm font-medium text-gray-700">
                    Filter by City
                </label>
                <select
                    className="rounded-md"
                    placeholder="Filter by City"
                    value={values?.city || filter?.city || "all"}
                    onChange={({ target }) => {
                        handleFilterChange(target.value, "city");
                    }}
                >
                    <option value="all">All</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                </select>
            </div>
        </div>
    );
}
