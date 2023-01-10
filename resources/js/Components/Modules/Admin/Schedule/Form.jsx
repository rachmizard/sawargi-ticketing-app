import { forwardRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import { usePage } from "@inertiajs/inertia-react";

import { Button, DynamicSelect, Input } from "@/Components";

export default function ScheduleForm({
    onSubmit,
    data,
    setData,
    processing,
    buttonSubmitLabel = "Submit",
}) {
    const { destinations, shuttles } = usePage().props;

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const initialStartDate = !data?.departure_date
        ? new Date()
        : parse(data.departure_date, "yyyy-MM-dd HH:mm:ss", new Date());

    const initialEnddate = !data?.arrival_date
        ? new Date()
        : parse(data.arrival_date, "yyyy-MM-dd HH:mm:ss", new Date());

    const destinationOptions = destinations.map((destination) => ({
        value: destination.id,
        label: `${destination.from_outlet?.name} (${destination.from_outlet?.city}) - ${destination.to_outlet?.name} (${destination.to_outlet?.city})`,
    }));

    const shuttleOptions = shuttles.map((shuttle) => ({
        value: shuttle.id,
        label: `${shuttle.number_plate} - Capacity (${shuttle.capacity})`,
    }));

    const getSelectedDestination = () => {
        return destinationOptions.find(
            (destination) => destination.value === data?.destination_id
        );
    };

    const getSelectedShuttle = () => {
        return shuttleOptions.find(
            (destination) => destination.value === data?.shuttle_id
        );
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex gap-3">
                <div className="flex-1 mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="destination_id"
                    >
                        Destination
                    </label>

                    <DynamicSelect
                        key="destination_id"
                        value={getSelectedDestination()}
                        className="w-full"
                        placeholder="Select Depart City"
                        onChange={(object) => {
                            setData("destination_id", object?.value);
                        }}
                        options={destinationOptions}
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="shuttle"
                >
                    Vehicle/Shuttle
                </label>

                <DynamicSelect
                    key="shuttle"
                    value={getSelectedShuttle()}
                    className="w-full"
                    placeholder="Select Vehicle/Shuttle"
                    onChange={(object) => {
                        setData("shuttle_id", object?.value);
                    }}
                    options={shuttleOptions}
                    required
                />
            </div>

            <div className="flex gap-3">
                <div className="flex-1 mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="departure_date"
                    >
                        Depart Date Time
                    </label>
                    <ReactDatePicker
                        id="departure_date"
                        selected={startDate ?? initialStartDate}
                        onChange={(date) => {
                            setStartDate(date);
                            setData("departure_date", date);
                        }}
                        startDate={startDate ?? initialStartDate}
                        endDate={endDate ?? initialEnddate}
                        selectsStart
                        nextMonthButtonLabel=">"
                        minDate={new Date()}
                        previousMonthButtonLabel="<"
                        customInput={<ButtonInput />}
                        showTimeSelect
                        dateFormat="dd MMMM yyyy hh:mm a"
                    />
                </div>
                <div className="flex-1 mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="arrival_date"
                    >
                        Arrival Date Time
                    </label>

                    <ReactDatePicker
                        id="arrival_date"
                        selected={endDate ?? initialEnddate}
                        onChange={(date) => {
                            setEndDate(date);
                            setData("arrival_date", date);
                        }}
                        selectsStart
                        startDate={startDate ?? initialStartDate}
                        endDate={endDate ?? initialEnddate}
                        minDate={startDate ?? initialStartDate}
                        nextMonthButtonLabel=">"
                        previousMonthButtonLabel="<"
                        customInput={<ButtonInput />}
                        showTimeSelect
                        dateFormat="dd MMMM yyyy hh:mm a"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                >
                    Price
                </label>

                <Input
                    key="price"
                    value={data.price}
                    className="w-full"
                    type="number"
                    step={1000}
                    handleChange={(e) => {
                        setData("price", e.target.value);
                    }}
                    name="price"
                    required
                />
            </div>

            <div className="mb-4 flex justify-end">
                <Button
                    processing={processing}
                    colorScheme="gray"
                    variant="outline"
                    size="md"
                >
                    {buttonSubmitLabel}
                </Button>
            </div>
        </form>
    );
}

const ButtonInput = forwardRef(({ value, onClick }, ref) => (
    <button
        onClick={onClick}
        ref={ref}
        type="button"
        className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
    >
        {format(new Date(value), "dd MMMM yyyy hh:mm a")}
    </button>
));

ButtonInput.displayName = "ButtonInput";
