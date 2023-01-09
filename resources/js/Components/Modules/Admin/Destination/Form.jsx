import { usePage } from "@inertiajs/inertia-react";

import Button from "@/Components/Button";
import Select from "@/Components/Select";

export default function DestinationForm({
    handleSubmit,
    processing,
    setData,
    data,
}) {
    const { outlets, shuttles } = usePage().props;

    const departureOptions = outlets.map((outlet) => ({
        value: outlet.id,
        label: outlet.name,
        city_type: outlet.city_type,
    }));

    const arrivalOptions = outlets.map((outlet) => ({
        value: outlet.id,
        label: outlet.name,
        city_type: outlet.city_type,
    }));

    const shuttleOptions = shuttles.map((shuttle) => ({
        value: shuttle.id,
        label: shuttle.number_plate,
    }));
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="from_outlet_id"
                >
                    Departure From
                </label>

                <Select
                    key="from_outlet_id"
                    value={data.from_outlet_id}
                    className="w-full"
                    onChange={(value) => {
                        setData("from_outlet_id", value);
                    }}
                    options={departureOptions}
                    required
                    emptyOption
                    emptyOptionLabel="Choose Departure From"
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="to_outlet_id"
                >
                    Arrival To
                </label>

                <Select
                    key="to_outlet_id"
                    value={data.to_outlet_id}
                    className="w-full"
                    onChange={(value) => {
                        setData("to_outlet_id", value);
                    }}
                    options={arrivalOptions}
                    required
                    emptyOption
                    emptyOptionLabel="Choose Arrival To"
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="shuttle_id"
                >
                    Shuttle/Vehicle
                </label>

                <Select
                    key="shuttle_id"
                    value={data.shuttle_id}
                    className="w-full"
                    onChange={(value) => {
                        setData("shuttle_id", value);
                    }}
                    options={shuttleOptions}
                    required
                    emptyOption
                    emptyOptionLabel="Choose Shuttle/Vehicle"
                />
            </div>

            <div className="mb-4 flex justify-end">
                <Button
                    processing={processing}
                    colorScheme="gray"
                    variant="outline"
                    size="md"
                >
                    Create
                </Button>
            </div>
        </form>
    );
}
