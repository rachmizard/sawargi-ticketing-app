import Button from "@/Components/Button";
import { formatRupiah } from "@/Utils/formatter";
import { TicketIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

const formatDepartureDateToTime = (date) => {
    return format(date, "HH:mm");
};

export default function ScheduleCard({ schedule = {}, onBooking }) {
    const { price, destination, departure_date, available_seats } =
        schedule || {};

    const { from_outlet, to_outlet } = destination || {};

    return (
        <div className="max-w-xl bg-white hover:bg-gray-100 transition duration-100 ease-in-out shadow-md rounded-md">
            <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                            <TicketIcon width={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-medium text-gray-500">
                                {formatDepartureDateToTime(
                                    new Date(departure_date)
                                )}
                            </span>
                            <span className="text-md font-medium text-gray-500">
                                {from_outlet?.name} - {to_outlet?.name}
                            </span>

                            <span className="text-md font-medium text-gray-500">
                                Tersedia {available_seats} kursi
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-md truncate font-bold text-gray-600">
                            {formatRupiah(price)}
                        </span>

                        <Button
                            onClick={() => onBooking(schedule)}
                            size="md"
                            variant="outline"
                            colorScheme="blue"
                        >
                            Pesan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
