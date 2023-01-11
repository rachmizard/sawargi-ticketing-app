import { useState } from "react";
import {
    ArrowUpCircleIcon,
    CalendarDaysIcon,
    MagnifyingGlassIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

import { Button, Datepicker, Select } from "@/Components";

export default function ScheduleFilterForm() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="px-10 md:px-4 py-8">
            <h1 className="text-lg font-bold text-gray-500">
                Pesan Tiket Murah Jakarta Bandung !
            </h1>
            <div className="border-[0.4px] border-gray-100 my-2" />
            <div className="grid grid-cols-1 md:grid-cols-4 items-end gap-4 mt-4">
                <div className="col-span-2 sm:col-span-1">
                    <label className="inline-flex text-sm font-medium text-gray-700 gap-1">
                        <ArrowUpCircleIcon width={18} />
                        <span>Destinasi Tujuan</span>
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
                        <CalendarDaysIcon width={18} />
                        <span>Tanggal Pergi</span>
                    </label>
                    <div className="mt-1">
                        <Datepicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            withPortal
                            dateFormat="dd MMMM yyyy"
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
                        <Select
                            placeholder="Jumlah penumpang"
                            className="w-full"
                            emptyOption
                            emptyOptionLabel="Pilih jumlah penumpang"
                            options={[
                                { value: 1, label: "1" },
                                { value: 2, label: "2" },
                                { value: 3, label: "3" },
                            ]}
                        />
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <Button
                        variant="solid"
                        className="gap-1"
                        colorScheme="gray"
                        size="md"
                    >
                        <MagnifyingGlassIcon width={24} />
                        Cari
                    </Button>
                </div>
            </div>
        </div>
    );
}
