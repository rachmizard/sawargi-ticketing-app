import React from "react";
import Select from "./Select";

export default function Datatable({
    columnDefs = [],
    data = [],
    paginationComponent = null,
    onChangePerPage,
    perPage = 10,
}) {
    const [showPerPage, setShowPerPage] = React.useState(perPage);

    const showPerPageOptions = [5, 10, 20, 50, 100];

    return (
        <div className="p-6 bg-white border-b border-gray-200">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {columnDefs.map((column, key) => (
                            <th key={key} className="px-4 py-2">
                                {column.headerName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((data) => {
                        return (
                            <tr key={data.id}>
                                {columnDefs.map((column, key) => (
                                    <td key={key} className="border px-4 py-2">
                                        {column?.render(data) ??
                                            data[column.field]}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                {paginationComponent}

                <Select
                    value={showPerPage}
                    options={showPerPageOptions.map((value) => ({
                        value,
                        label: `${value} Entries`,
                    }))}
                    onChange={(value) => {
                        setShowPerPage(parseInt(value));
                        onChangePerPage?.(value);
                    }}
                />
            </div>
        </div>
    );
}
