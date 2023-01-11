/* eslint-disable no-undef */
import { Head } from "@inertiajs/inertia-react";

import {
    ScheduleEmpty,
    ScheduleFilterForm,
    ScheduleResult,
} from "@/Components/Modules";

import UserLayout from "@/Layouts/User";

export default function Welcome(props) {
    return (
        <UserLayout {...props}>
            <Head title="Welcome" />
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 pb-8 bg-white mt-5 shadow-sm rounded-md">
                <ScheduleFilterForm />

                {/* <ScheduleResult /> */}
                <ScheduleEmpty />
            </div>
        </UserLayout>
    );
}
