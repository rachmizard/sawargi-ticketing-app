import { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { format } from "date-fns";
import {
    ArrowUpCircleIcon,
    CalendarDaysIcon,
    MagnifyingGlassIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

import {
    AlertCard,
    Button,
    Datepicker,
    DynamicSelect,
    Select,
} from "@/Components";

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

export default function ScheduleFilterForm({ queries, onFilter }) {
    const { destinations } = usePage().props;

    const { destination_id, departure_date } = queries || {};

    const [error, setError] = useState(false);
    const [fields, setFields] = useState({
        selectedDate: new Date(),
        destinationId: parseInt(destination_id) ?? null,
        passenger: queries?.passenger ?? 0,
    });

    const destinationOptions = destinations.map((destination) => ({
        value: destination.id,
        label: `${destination.from_outlet?.name} - ${destination.to_outlet?.name}`,
    }));

    const selectedDestination = destinationOptions.find(
        (option) =>
            option.value === (fields.destinationId || parseInt(destination_id))
    );

    const selectedDepartureDate = fields.selectedDate
        ? fields.selectedDate
        : departure_date
        ? new Date(Date.parse(departure_date))
        : new Date();

    const handleChange = (fieldName, value) => {
        setFields((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    return (
        <div className="px-10 md:px-4 py-8">
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    if (
                        !fields.destinationId ||
                        !fields.selectedDate ||
                        !fields.passenger
                    ) {
                        setError(true);
                        return;
                    }

                    setError(false);

                    onFilter?.({
                        destination_id: fields.destinationId,
                        departure_date: formatDepartureDate(
                            fields.selectedDate
                        ),
                        passenger: fields.passenger,
                    });
                }}
            >
                <h1 className="text-lg font-bold text-gray-500">
                    Pesan Tiket Murah Jakarta Bandung !
                </h1>
                <AlertCard isOpen={error} variant="danger" infinite={error}>
                    Mohon isi semua data dengan benar untuk melanjutkan
                </AlertCard>
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
                                onChange={(e) =>
                                    handleChange("destinationId", e.value)
                                }
                                required
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
                                    handleChange("selectedDate", date);
                                }}
                                withPortal
                                minDate={new Date()}
                                dateFormat="dd MMMM yyyy"
                                className="w-full"
                                required
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
                                value={fields.passenger}
                                onChange={(value) => {
                                    handleChange("passenger", value);
                                }}
                                options={[
                                    {
                                        value: 0,
                                        label: "Pilih jumlah penumpang",
                                    },
                                    { value: 1, label: "1" },
                                    { value: 2, label: "2" },
                                    { value: 3, label: "3" },
                                ]}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Button
                            variant="solid"
                            className="gap-1"
                            colorScheme="gray"
                            size="md"
                            type="submit"
                        >
                            <MagnifyingGlassIcon width={24} />
                            Cari
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
