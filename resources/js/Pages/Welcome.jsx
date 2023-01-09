/* eslint-disable no-undef */
import { Head } from "@inertiajs/inertia-react";

import { FindTicketSection, ScheduleCard } from "@/Components/Modules";
import UserLayout from "@/Layouts/User";

export default function Welcome(props) {
    return (
        <UserLayout {...props}>
            <Head title="Welcome" />
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 bg-white shadow-sm rounded-md">
                <div className="mt-5">
                    <FindTicketSection />
                </div>

                <div className="mt-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <ScheduleCard />
                        <ScheduleCard />
                        <ScheduleCard />
                        <ScheduleCard />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
