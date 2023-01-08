import { forwardRef, useState } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";

import {
    AlertCard,
    Button,
    Input,
    Select,
    ValidationErrors,
    WrapperContent,
} from "@/Components";

import Authenticated from "@/Layouts/Authenticated";

export default function TicketCreatePage(props) {
    const { shuttles, destinations } = props;

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [departCity, setDepartCity] = useState(null);

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
                departCity &&
                destination.city_type?.toLowerCase() !==
                    departCity?.toLowerCase()
        );

    const { errors, data, processing, wasSuccessful, reset, setData, post } =
        useForm("CreateTicketForm", {
            from_destination_id: "",
            to_destination_id: "",
            shuttle_id: "",
            price: 0,
            depart_date: new Date(),
            arrival_date: new Date(),
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        data.arrival_date = format(endDate, "yyyy-MM-dd HH:mm:ss");
        data.depart_date = format(startDate, "yyyy-MM-dd HH:mm:ss");
        data.price = parseInt(data.price);

        post(route("admin.tickets.store"), {
            data,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="inline-block font-semibold text-xl text-gray-800 leading-tight">
                    Create Ticket
                </h2>
            }
            backUrl={route("admin.tickets")}
        >
            <Head title="Ticket - Create" />

            <WrapperContent>
                <ValidationErrors errors={errors} />

                <AlertCard isOpen={wasSuccessful} variant="success">
                    <p>Ticket created successfully</p>
                </AlertCard>

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-3">
                        <div className="flex-1 mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="from_destination_id"
                            >
                                Depart At
                            </label>

                            <Select
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
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    setData("depart_date", date);
                                }}
                                startDate={startDate}
                                endDate={endDate}
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
                                selected={endDate}
                                onChange={(date) => {
                                    setEndDate(date);
                                    setData("arrival_date", date);
                                }}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
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
                            Create
                        </Button>
                    </div>
                </form>
            </WrapperContent>
        </Authenticated>
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
