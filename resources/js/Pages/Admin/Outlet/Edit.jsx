/* eslint-disable no-undef */
import { Head, useForm } from "@inertiajs/inertia-react";

import { AlertCard, ValidationErrors, WrapperContent } from "@/Components";
import { OutletForm } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";

export default function OutletEditPage(props) {
    const { auth, outlet, flash } = props;

    const {
        errors,
        data,
        transform,
        processing,
        wasSuccessful,
        reset,
        setData,
        put,
    } = useForm("EditOutletForm", {
        ...outlet,
        city: outlet.city?.toLowerCase(),
        status: outlet.status?.toLowerCase(),
    });

    transform((data) => ({
        ...data,
        city: data.city?.toLowerCase(),
        status: data.status?.toLowerCase(),
    }));

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("admin.outlets.update", outlet.id), {
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
                <h2 className="inline-block font-semibold text-xl text-gray-800 leading-tight">
                    Edit Outlet
                </h2>
            }
            backUrl={route("admin.outlets")}
        >
            <Head title="Outlet - Edit" />

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
                    buttonSubmitLabel="Update"
                />
            </WrapperContent>
        </Authenticated>
    );
}
