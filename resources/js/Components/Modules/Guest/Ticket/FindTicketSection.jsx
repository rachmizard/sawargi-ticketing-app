import { Datepicker, Input } from "@/Components";
import Select from "@/Components/Select";
import {
    ArrowDownCircleIcon,
    ArrowUpCircleIcon,
    CalendarDaysIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function FindTicketSection() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="px-4 py-8">
            <h1 className="text-lg font-bold text-gray-500">
                Pesan Tiket Murah Jakarta Bandung !
            </h1>
            <div className="border-[0.4px] border-gray-100 my-2" />
            <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="col-span-2 sm:col-span-1">
                    <label className="inline-flex text-sm font-medium text-gray-700 gap-1">
                        <ArrowUpCircleIcon width={18} />
                        <span>Berangkat Dari</span>
                    </label>
                    <div className="mt-1">
                        <Select
                            className="w-full"
                            emptyOption
                            emptyOptionLabel="Pilih keberangkatan"
                        />
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="inline-flex text-sm font-medium text-gray-700 gap-1">
                        <ArrowDownCircleIcon width={18} />
                        <span>Tujuan Ke</span>
                    </label>
                    <div className="mt-1">
                        <Select
                            className="w-full"
                            emptyOption
                            emptyOptionLabel="Pilih keberangkatan terlebih dahulu"
                        />
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="inline-flex text-sm font-medium text-gray-700 gap-1">
                        <CalendarDaysIcon width={18} />
                        <span>Tanggal Pergi</span>
                    </label>
                    <div className="mt-1">
                        <Datepicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            withPortal
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="inline-flex text-sm font-medium text-gray-700 gap-1">
                        <UserIcon width={18} />
                        <span>Penumpang</span>
                    </label>
                    <div className="mt-1">
                        <Input
                            placeholder="Jumlah penumpang"
                            className="w-full"
                            type="number"
                            step={1}
                            min={1}
                            max={10}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
