/* eslint-disable no-undef */
import { Head, useForm } from "@inertiajs/inertia-react";

import { AlertCard, ValidationErrors, WrapperContent } from "@/Components";
import { OutletForm } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";

export default function OutletCreatePage(props) {
    const { auth, flash } = props;

    const { errors, data, processing, wasSuccessful, reset, setData, post } =
        useForm("CreateOutletForm", {
            name: "",
            phone: "",
            city: "",
            address: "",
            status: "open",
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("admin.outlets.store"), {
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
                    Create Outlet
                </h2>
            }
            backUrl={route("admin.outlets")}
        >
            <Head title="Outlet - Create" />

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

                <OutletForm
                    data={data}
                    handleSubmit={handleSubmit}
                    processing={processing}
                    setData={setData}
                    buttonSubmitLabel="Create"
                />
            </WrapperContent>
        </Authenticated>
    );
}
