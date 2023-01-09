/* eslint-disable no-undef */
import { Head, useForm } from "@inertiajs/inertia-react";

import { AlertCard, ValidationErrors, WrapperContent } from "@/Components";
import { DestinationForm } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";

export default function DestinationCreatePage(props) {
    const { auth, destination, flash } = props;

    const { errors, data, processing, wasSuccessful, reset, setData, post } =
        useForm("EditDestinationForm", {
            from_outlet_id: destination.from_outlet_id,
            to_outlet_id: destination.to_outlet_id,
            shuttle_id: destination.shuttle_id,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("admin.destinations.update", destination.id), {
            data,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Authenticated
            auth={auth}
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

                <AlertCard
                    isOpen={wasSuccessful || !!flash?.success}
                    variant="success"
                >
                    <p>{flash?.success}</p>
                </AlertCard>

                <AlertCard isOpen={!!flash?.error} variant="danger">
                    <p>{flash?.error}</p>
                </AlertCard>

                <DestinationForm
                    data={data}
                    handleSubmit={handleSubmit}
                    processing={processing}
                    setData={setData}
                />
            </WrapperContent>
        </Authenticated>
    );
}
