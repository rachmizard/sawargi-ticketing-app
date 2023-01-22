import { RectangleStackIcon } from "@heroicons/react/24/outline";

export default function BookingSeatCard({
    selectedSeatIds = [],
    seat,
    passengerCount = 0,
    onChange,
}) {
    const isBooked = seat.status === "booked";
    const isNotEligibleSelected = selectedSeatIds.length >= passengerCount;

    const classNames = {
        wrapper: {
            base: "group flex justify-center items-center p-3 rounded-lg flex-col transition-all ease-out duration-100",
            unselected: "bg-gray-100 active:scale-90",
            selected: "bg-sky-500",
            booked: "bg-yellow-500 cursor-not-allowed",
            unavailable: "bg-slate-300 opacity-50 cursor-not-allowed",
        },
        icon: {
            base: "h-10",
            unselected: "text-gray-700",
            selected: "text-white",
            booked: "text-white",
            unavailable: "text-gray-700",
        },
        label: {
            base: "font-bold",
            unselected: "text-gray-700",
            selected: "text-white",
            booked: "text-white",
            unavailable: "text-gray-700",
        },
    };

    const getWrapperClass = () => {
        const baseClass = classNames.wrapper.base;

        if (isBooked) {
            return `${baseClass} ${classNames.wrapper.booked}`;
        }

        if (isNotEligibleSelected && !selectedSeatIds.includes(seat.id)) {
            return `${baseClass} ${classNames.wrapper.unavailable}`;
        }

        if (selectedSeatIds.includes(seat.id)) {
            return `${baseClass} ${classNames.wrapper.selected}`;
        }

        return `${baseClass} ${classNames.wrapper.unselected}`;
    };

    const getIconClass = () => {
        const baseClass = classNames.icon.base;

        if (isBooked) {
            return `${baseClass} ${classNames.icon.booked}`;
        }

        if (isNotEligibleSelected && !selectedSeatIds.includes(seat.id)) {
            return `${baseClass} ${classNames.icon.unavailable}`;
        }

        if (selectedSeatIds.includes(seat.id)) {
            return `${baseClass} ${classNames.icon.selected}`;
        }

        return `${baseClass} ${classNames.icon.unselected}`;
    };

    const getLabelClass = () => {
        const baseClass = classNames.label.base;

        if (isBooked) {
            return `${baseClass} ${classNames.label.booked}`;
        }

        if (isNotEligibleSelected && !selectedSeatIds.includes(seat.id)) {
            return `${baseClass} ${classNames.label.unavailable}`;
        }

        if (selectedSeatIds.includes(seat.id)) {
            return `${baseClass} ${classNames.label.selected}`;
        }

        return `${baseClass} ${classNames.label.unselected}`;
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-disabled="true"
            onClick={() => {
                if (
                    !isBooked ||
                    (selectedSeatIds.includes(seat.id) &&
                        !isNotEligibleSelected)
                ) {
                    onChange(seat.id);
                }
            }}
            className={getWrapperClass()}
        >
            <RectangleStackIcon className={getIconClass()} />
            <span className={getLabelClass()}>{seat.seat_number}</span>
        </div>
    );
}
