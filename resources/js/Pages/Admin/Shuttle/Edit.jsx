import { Head, useForm } from "@inertiajs/inertia-react";

import {
    AlertCard,
    Button,
    Input,
    Select,
    ValidationErrors,
    WrapperContent,
} from "@/Components";

import Authenticated from "@/Layouts/Authenticated";

import { SHUTTLE_STATUS_OPTIONS } from "@/Utils/constants";

export default function ShuttleEditPage(props) {
    const { shuttle } = props;

    const { errors, data, processing, wasSuccessful, reset, setData, put } =
        useForm("EditShuttleForm", {
            number_plate: shuttle.number_plate,
            capacity: shuttle.capacity,
            status: shuttle.status?.toLowerCase(),
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("admin.shuttles.update", shuttle.id), {
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
                <h2 className="inline-block  font-semibold text-xl text-gray-800 leading-tight">
                    Edit Shuttle
                </h2>
            }
            backUrl={route("admin.shuttles")}
        >
            <Head title="Shuttle - Edit" />

            <WrapperContent>
                <ValidationErrors errors={errors} />

                <AlertCard isOpen={wasSuccessful} variant="success">
                    <p>Shuttle updated successfully</p>
                </AlertCard>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="number_plate"
                        >
                            Plate Number
                        </label>

                        <Input
                            key="number_plate"
                            isFocused={true}
                            value={data.number_plate}
                            className="w-full"
                            handleChange={(e) => {
                                setData("number_plate", e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="capacity"
                        >
                            Capacity
                        </label>

                        <Input
                            key="capacity"
                            value={data.capacity}
                            className="w-full"
                            handleChange={(e) => {
                                setData("capacity", e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="status"
                        >
                            Status
                        </label>

                        <Select
                            key="status"
                            value={data.status}
                            className="w-full"
                            onChange={(value) => {
                                setData("status", value);
                            }}
                            options={SHUTTLE_STATUS_OPTIONS}
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
                            Edit
                        </Button>
                    </div>
                </form>
            </WrapperContent>
        </Authenticated>
    );
}
