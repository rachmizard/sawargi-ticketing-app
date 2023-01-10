import { Head, useForm } from "@inertiajs/inertia-react";

import { AlertCard, ValidationErrors, WrapperContent } from "@/Components";
import { ScheduleForm } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";

export default function ScheduleEditPage(props) {
    const { schedule, flash } = props;

    const { errors, data, processing, setData, put } = useForm({
        destination_id: schedule.destination_id,
        shuttle_id: schedule.shuttle_id,
        price: schedule.price,
        departure_date: schedule.departure_date,
        arrival_date: schedule.arrival_date,
        status: schedule.status?.toLowerCase(),
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        data.price = parseInt(data.price);

        // eslint-disable-next-line no-undef
        put(route("admin.schedules.update", schedule.id), {
            data,
            preserveScroll: true,
            preserveState: true,
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
