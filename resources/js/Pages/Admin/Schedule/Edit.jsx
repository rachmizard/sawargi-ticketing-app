import { Head, useForm } from "@inertiajs/inertia-react";

import { AlertCard, ValidationErrors, WrapperContent } from "@/Components";
import { ScheduleForm } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";

export default function ScheduleEditPage(props) {
    const { ticket, flash } = props;

    const { errors, data, processing, reset, setData, put } = useForm({
        destination_id: ticket.destination_id,
        shuttle_id: ticket.shuttle_id,
        price: ticket.price,
        depart_date: ticket.depart_date,
        arrival_date: ticket.arrival_date,
        status: ticket.status?.toLowerCase(),
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        data.price = parseInt(data.price);

        // eslint-disable-next-line no-undef
        put(route("admin.schedules.update", ticket.id), {
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
                    Edit Schedule
                </h2>
            }
            // eslint-disable-next-line no-undef
            backUrl={route("admin.schedules")}
        >
            <Head title="Schedule - Create" />

            <WrapperContent>
                <ValidationErrors errors={errors} />

                <AlertCard isOpen={!!flash?.success} variant="success">
                    <p>{flash?.success}</p>
                </AlertCard>

                <AlertCard isOpen={!!flash?.error} variant="danger">
                    <p>{flash?.error}</p>
                </AlertCard>

                <ScheduleForm
                    data={data}
                    setData={setData}
                    onSubmit={handleSubmit}
                    processing={processing}
                    buttonSubmitLabel="Update"
                />
            </WrapperContent>
        </Authenticated>
    );
}
