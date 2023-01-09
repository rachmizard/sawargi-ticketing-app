import { Head, useForm } from "@inertiajs/inertia-react";

import { AlertCard, ValidationErrors, WrapperContent } from "@/Components";
import { TicketForm } from "@/Components/Modules";

import Authenticated from "@/Layouts/Authenticated";
import { format } from "date-fns";

export default function TicketCreatePage(props) {
    const { errors, data, processing, wasSuccessful, reset, setData, post } =
        useForm("CreateTicketForm", {
            from_destination_id: "",
            to_destination_id: "",
            shuttle_id: "",
            price: 0,
            depart_date: null,
            arrival_date: null,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        data.price = parseInt(data.price);

        if (data.depart_date === null || data.arrival_date === null) {
            data.depart_date = null;
            data.arrival_date = null;
        } else {
            data.arrival_date = format(data.arrival_date, "yyyy-MM-dd HH:mm");
            data.depart_date = format(data.depart_date, "yyyy-MM-dd HH:mm");
        }

        // eslint-disable-next-line no-undef
        post(route("admin.tickets.store"), {
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
                    Create Ticket
                </h2>
            }
            // eslint-disable-next-line no-undef
            backUrl={route("admin.tickets")}
        >
            <Head title="Ticket - Create" />

            <WrapperContent>
                <ValidationErrors errors={errors} />

                <AlertCard isOpen={wasSuccessful} variant="success">
                    <p>Ticket created successfully</p>
                </AlertCard>

                <TicketForm
                    data={data}
                    setData={setData}
                    onSubmit={handleSubmit}
                    processing={processing}
                />
            </WrapperContent>
        </Authenticated>
    );
}
