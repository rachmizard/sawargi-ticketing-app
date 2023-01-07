import React from "react";
import { Inertia } from "@inertiajs/inertia";

export default function DestinationFilterSection({
    values,
    onChange,
    useServerSideFilter = false,
}) {
    const [filter, setFilter] = React.useState(values);

    const handleFilterChange = (value, name) => {
        const queryParams = {};

        if (value) {
            queryParams[name] = value;
        }

        onChange?.(queryParams);
        setFilter(queryParams);

        if (!useServerSideFilter) return;

        Inertia.get(route("admin.destinations"), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="flex">
            <div className="flex w-[50%] flex-col gap-1">
                <label className="block text-sm font-medium text-gray-700">
                    Filter by City
                </label>
                <select
                    className="rounded-md"
                    placeholder="Filter by City"
                    value={filter?.city || "all"}
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
