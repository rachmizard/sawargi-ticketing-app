import { forwardRef, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { Button, Input, Select } from "@/Components";
import { usePage } from "@inertiajs/inertia-react";
import { format, parse } from "date-fns";

export default function TicketForm({
    onSubmit,
    data,
    setData,
    processing,
    buttonSubmitLabel = "Submit",
}) {
    const { destinations, ticket, shuttles } = usePage().props;

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [departCity, setDepartCity] = useState(null);

    const initialStartDate = !data?.depart_date
        ? new Date()
        : parse(data.depart_date, "yyyy-MM-dd HH:mm:ss", new Date());

    const initialEnddate = !data?.arrival_date
        ? new Date()
        : parse(data.arrival_date, "yyyy-MM-dd HH:mm:ss", new Date());

    const initialDepartCity = ticket?.from_destination?.city_type ?? null;

    const destinationOptions = destinations.map((destination) => ({
        value: destination.id,
        label: `${destination.name} - ${destination.city_type}`,
        city_type: destination.city_type,
    }));

    const shuttleOptions = shuttles.map((shuttle) => ({
        value: shuttle.id,
        label: `${shuttle.number_plate} - Capacity (${shuttle.capacity})`,
    }));

    const arrivalAtOptions = destinations
        .map((destination) => ({
            value: destination.id,
            label: `${destination.name} - ${destination.city_type}`,
            city_type: destination.city_type,
        }))
        .filter(
            (destination) =>
                (departCity || initialDepartCity) &&
                destination.city_type?.toLowerCase() !==
                    departCity?.toLowerCase()
        );

    return (
        <form onSubmit={onSubmit}>
            <div className="flex gap-3">
                <div className="flex-1 mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="from_destination_id"
                    >
                        Depart At
                    </label>

                    <Select
                        emptyOption
                        key="from_destination_id"
                        value={data.from_destination_id}
                        className="w-full"
                        onChange={(value, rest) => {
                            console.log(rest);
                            setDepartCity(rest.city_type);
                            setData("from_destination_id", value);
                        }}
                        options={destinationOptions}
                        required
                    />
                </div>

                <div className="flex-1 mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="to_destination_id"
                    >
                        Arrival At
                    </label>

                    <Select
                        emptyOption
                        key="to_destination_id"
                        value={data.to_destination_id}
                        className="w-full"
                        placeholder="Select Depart City"
                        emptyOptionLabel="Select Depart City"
                        onChange={(value) => {
                            setData("to_destination_id", value);
                        }}
                        options={arrivalAtOptions}
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

                <Select
                    emptyOption
                    key="shuttle"
                    value={data.shuttle_id}
                    className="w-full"
                    placeholder="Select Depart City First"
                    onChange={(value) => {
                        setData("shuttle_id", value);
                    }}
                    emptyOptionLabel="Select Vehicle/Shuttle"
                    options={shuttleOptions}
                    required
                />
            </div>

            <div className="flex gap-3">
                <div className="flex-1 mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="depart_date"
                    >
                        Depart Date Time
                    </label>
                    <ReactDatePicker
                        id="depart_date"
                        selected={startDate ?? initialStartDate}
                        onChange={(date) => {
                            setStartDate(date);
                            setData("depart_date", date);
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
