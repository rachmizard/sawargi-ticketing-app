import { TicketIcon } from "@heroicons/react/24/outline";

import ApplicationLogo from "@/Components/ApplicationLogo";

export default function ScheduleEmpty() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <ApplicationLogo className="h-28" />
            </div>
            <div className="text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Cari Jadwal Anda Sekarang
                </h3>
                <div className="flex flex-col justify-center items-center gap-2 mt-2">
                    <p className="text-sm text-gray-500">
                        Silahkan masukan destinasi dan tanggal untuk mencari
                        jadwal
                    </p>
                    <TicketIcon width={58} className="text-gray-500" />
                </div>
            </div>
        </div>
    );
}
