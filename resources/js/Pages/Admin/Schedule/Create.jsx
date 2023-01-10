import { Head, useForm } from "@inertiajs/inertia-react";

import { AlertCard, ValidationErrors, WrapperContent } from "@/Components";
import { ScheduleForm } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";
import { format } from "date-fns";

export default function ScheduleCreatePage(props) {
    const { flash } = props;

    const { errors, data, processing, setData, post } = useForm(
        "CreateScheduleForm",
        {
            destination_id: "",
            shuttle_id: "",
            price: 0,
            departure_date: null,
            arrival_date: null,
            status: "pending",
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        data.price = parseInt(data.price);

        data.departure_date = format(
            new Date(data.departure_date),
            "yyyy-MM-dd HH:mm:ss"
        );

        data.arrival_date = format(
            new Date(data.arrival_date),
            "yyyy-MM-dd HH:mm:ss"
        );

        // eslint-disable-next-line no-undef
        post(route("admin.schedules.store"), {
            data,
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="inline-block font-semibold text-xl text-gray-800 leading-tight">
                    Create Schedule
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
                />
            </WrapperContent>
        </Authenticated>
    );
}
