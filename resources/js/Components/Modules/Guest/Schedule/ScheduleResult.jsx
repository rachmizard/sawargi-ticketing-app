import { Link } from "@inertiajs/inertia-react";
import { ScheduleCard } from "..";

export default function ScheduleResult({ schedules = [] }) {
    if (schedules.length === 0) {
        return (
            <div className="text-center py-8">
                <h1 className="text-lg font-medium text-gray-500">
                    Tidak ada jadwal keberangkatan
                </h1>
            </div>
        );
    }

    return (
        <div className="pb-8 px-10 md:px-4">
            <div className="flex items-center justify-between py-4">
                <h1 className="text-xl font-medium text-gray-500">
                    Jadwal Keberangkatan
                </h1>

                <Link className="">
                    <span className="text-sm font-medium text-gray-500 underline decoration-gray-500">
                        See all
                    </span>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {schedules.map((schedule, key) => (
                    <ScheduleCard key={key} schedule={schedule} />
                ))}
            </div>
        </div>
    );
}
