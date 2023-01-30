/* eslint-disable no-undef */
import { Head, useForm } from "@inertiajs/inertia-react";

import { AlertCard, ValidationErrors, WrapperContent } from "@/Components";
import { DestinationForm } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";

export default function DestinationCreatePage(props) {
    const { auth, flash } = props;

    const { errors, data, processing, setData, post } = useForm(
        "CreateDestinationForm",
        {
            from_outlet_id: "",
            to_outlet_id: "",
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("admin.destinations.store"), {
            data,
        });
    };

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

                <AlertCard isOpen={!!flash?.success} variant="success">
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
