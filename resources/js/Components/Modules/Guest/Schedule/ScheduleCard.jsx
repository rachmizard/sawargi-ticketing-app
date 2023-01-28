import Button from "@/Components/Button";
import { formatRupiah } from "@/Utils/formatter";
import { TicketIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const formatDepartureDateToTime = (date) => {
    return format(date, "dd MMMM yyyy, HH:mm", {
        locale: id,
    });
};

export default function ScheduleCard({
    schedule = {},
    onBooking,
    passenger = 0,
}) {
    const { price, destination, departure_date, available_seats } =
        schedule || {};

    const { from_outlet, to_outlet } = destination || {};

    const isSeatEligible = available_seats >= passenger;
    const isAbleToOrder = isSeatEligible && available_seats > 0;

    const ticketIconColorClassnames = {
        seatNotEligible: "text-white",
        seatEligible: "text-white",
    }[isSeatEligible ? "seatEligible" : "seatNotEligible"];

    const ticketIconWrapperColorClassnames = {
        seatNotEligible: "bg-yellow-400",
        setEligible: "bg-blue-400",
    }[isSeatEligible ? "setEligible" : "seatNotEligible"];

    return (
        <div
            role="button"
            onClick={() => {
                isAbleToOrder && isSeatEligible && onBooking(schedule);
            }}
            className={`max-w-full ${
                isAbleToOrder && isSeatEligible
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
            } bg-white border-b border-b-gray-200 hover:bg-gray-100 transition duration-100 ease-in-out rounded-md`}
        >
            <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div
                            className={`flex items-center justify-center w-10 h-10 ${ticketIconWrapperColorClassnames} rounded-full`}
                        >
                            <TicketIcon
                                className={ticketIconColorClassnames}
                                width={20}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-gray-500">
                                {formatDepartureDateToTime(
                                    new Date(departure_date)
                                )}
                            </span>
                            <span className="text-md font-medium text-gray-500">
                                {from_outlet?.name} - {to_outlet?.name}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <span className="text-md truncate font-bold text-gray-600">
                            {formatRupiah(price)}
                        </span>

                        {!isSeatEligible ? (
                            <>
                                <span className="text-md font-medium text-gray-500">
                                    Tersedia {available_seats} kursi
                                </span>
                                <span className="text-md font-medium text-yellow-500">
                                    Kursi tidak mencukupi
                                </span>
                            </>
                        ) : (
                            <span className="text-md font-medium text-gray-500">
                                Tersedia {available_seats} kursi
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
