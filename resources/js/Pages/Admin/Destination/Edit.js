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

import { CITY_OPTIONS_WITHOUT_ALL } from "@/Utils/constants";

export default function DestinationEditPage(props) {
    const { destination, flash } = props;

    const { errors, data, processing, wasSuccessful, setData, put } = useForm(
        "UpdateDestinationForm",
        {
            name: destination.name,
            city_type: destination.city_type.toLowerCase(),
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("admin.destinations.update", destination?.id), {
            data,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="inline-block  font-semibold text-xl text-gray-800 leading-tight">
                    Edit Destination
                </h2>
            }
            backUrl={route("admin.destinations")}
        >
            <Head title="Destination - Edit" />

            <WrapperContent>
                <ValidationErrors errors={errors} />

                <AlertCard isOpen={wasSuccessful} variant="success">
                    {flash?.message}
                </AlertCard>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Destination Name
                        </label>

                        <Input
                            key="name"
                            isFocused={true}
                            value={data.name}
                            className="w-full"
                            handleChange={(e) => {
                                setData("name", e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="city"
                        >
                            City
                        </label>

                        <Select
                            key="city"
                            value={data.city_type}
                            className="w-full"
                            onChange={(value) => {
                                setData("city_type", value);
                            }}
                            options={CITY_OPTIONS_WITHOUT_ALL}
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
