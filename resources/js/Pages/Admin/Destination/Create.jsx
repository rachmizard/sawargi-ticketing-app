/* eslint-disable no-undef */
import { Head, useForm } from "@inertiajs/inertia-react";

import {
    AlertCard,
    Button,
    Select,
    ValidationErrors,
    WrapperContent,
} from "@/Components";

import Authenticated from "@/Layouts/Authenticated";

export default function DestinationCreatePage(props) {
    const { auth, shuttles, outlets } = props;

    const { errors, data, processing, wasSuccessful, reset, setData, post } =
        useForm("CreateDestinationForm", {
            name: "",
            from_outlet_id: "",
            to_outlet_id: "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("admin.destinations.store"), {
            data,
            onSuccess: () => {
                reset();
            },
        });
    };

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
        <Authenticated
            auth={auth}
            header={
                <h2 className="inline-block  font-semibold text-xl text-gray-800 leading-tight">
                    Create Destination
                </h2>
            }
            backUrl={route("admin.destinations")}
        >
            <Head title="Destination - Create" />

            <WrapperContent>
                <ValidationErrors errors={errors} />

                <AlertCard isOpen={wasSuccessful} variant="success">
                    <p>Destination created successfully</p>
                </AlertCard>

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
            </WrapperContent>
        </Authenticated>
    );
}
