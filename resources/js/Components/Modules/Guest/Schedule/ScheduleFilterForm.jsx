import { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { format, parse } from "date-fns";
import {
    ArrowUpCircleIcon,
    CalendarDaysIcon,
    MagnifyingGlassIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

import { Button, Datepicker, DynamicSelect, Select } from "@/Components";

const formatDepartureDate = (date) => {
    return format(
        date.setHours(
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
        ),
        "yyyy-MM-dd HH:mm"
    );
};

const parseDepartureDate = (date) => {
    return parse(date, "yyyy-MM-dd HH:mm", new Date());
};

export default function ScheduleFilterForm({ queries, onFilter }) {
    const { destinations } = usePage().props;

    const { destination_id, departure_date } = queries || {};

    const [selectedDate, setSelectedDate] = useState(null);
    const [destinationId, setDestinationId] = useState(
        parseInt(destination_id) ?? null
    );
    const [passenger, setPassenger] = useState(queries?.passenger ?? 1);

    const destinationOptions = destinations.map((destination) => ({
        value: destination.id,
        label: `${destination.from_outlet?.name} - ${destination.to_outlet?.name}`,
    }));

    const selectedDestination = destinationOptions.find(
        (option) => option.value === (destinationId || parseInt(destination_id))
    );

    const selectedDepartureDate = selectedDate
        ? selectedDate
        : departure_date
        ? parseDepartureDate(departure_date)
        : new Date();

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
                        <span>Keberangkatan - Tujuan</span>
                    </label>
                    <div className="mt-1">
                        <DynamicSelect
                            className="w-full"
                            options={destinationOptions}
                            value={selectedDestination}
                            getOptionValue={(option) => option.value}
                            onChange={(e) => setDestinationId(e.value)}
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
                            selected={selectedDepartureDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                            }}
                            withPortal
                            minDate={new Date()}
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
                            value={passenger}
                            emptyOptionLabel="Pilih jumlah penumpang"
                            onChange={(value) => {
                                setPassenger(value);
                            }}
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
                        onClick={() => {
                            onFilter?.({
                                destination_id: destinationId,
                                departure_date:
                                    formatDepartureDate(selectedDate),
                                passenger,
                            });
                        }}
                    >
                        <MagnifyingGlassIcon width={24} />
                        Cari
                    </Button>
                </div>
            </div>
        </div>
    );
}
