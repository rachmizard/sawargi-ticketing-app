/* eslint-disable no-undef */
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import {
    ScheduleEmpty,
    ScheduleFilterForm,
    ScheduleResult,
} from "@/Components/Modules";

import UserLayout from "@/Layouts/User";

export default function Welcome(props) {
    const {
        auth,
        schedules,
        ziggy: { query },
    } = props;

    const isSearching = Object.keys(query).length > 0;

    function onFilter(values) {
        Inertia.get(route("welcome"), values, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function onBooking(schedule) {
        Inertia.get(route("booking.index"), {
            scheduleId: schedule.id,
            passenger: query.passenger,
        });
    }

    return (
        <UserLayout auth={auth}>
            <Head title="Welcome" />
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 pb-8 bg-white mt-5 shadow-sm rounded-md">
                <ScheduleFilterForm queries={query} onFilter={onFilter} />

                {isSearching && (
                    <ScheduleResult
                        onBooking={onBooking}
                        schedules={schedules}
                    />
                )}
                {!isSearching && <ScheduleEmpty />}
            </div>
        </UserLayout>
    );
}
