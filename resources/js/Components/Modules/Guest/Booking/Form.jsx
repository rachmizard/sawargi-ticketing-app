import { useState } from "react";
import {
    ArrowLeftIcon,
    CheckIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    RectangleStackIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import Button from "@/Components/Button";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";

export default function BookingForm({ defaultValues, passengerCount = 0 }) {
    const {
        ziggy: { query },
    } = usePage().props;

    const { data, setData, post, errors } = useForm("BookingForm", {
        name: defaultValues?.name || "",
        phone: defaultValues?.phone || "",
        email: defaultValues?.email || "",
        address: defaultValues?.address || "",
        passengers: [],
        seat_ids: [],
        schedule_id: query?.scheduleId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // eslint-disable-next-line no-undef
        post(route("booking.store"), {
            preserveState: true,
            onSuccess: () => {
                // eslint-disable-next-line no-undef
                Inertia.replace(route("booking.payment"));
            },
        });
    };

    return (
        <div className="mt-8 space-y-4">
            <ValidationErrors errors={errors} />
            <form onSubmit={handleSubmit}>
                <Stepper
                    steps={[
                        {
                            label: "Informasi Penumpang",
                            component: (
                                <BookingFormIdentity
                                    data={data}
                                    handleChange={handleChange}
                                    passengerCount={passengerCount}
                                    setData={setData}
                                />
                            ),
                            validate: () => {
                                if (
                                    data.name === "" ||
                                    data.phone === "" ||
                                    data.email === "" ||
                                    data.address === "" ||
                                    data.passengers?.length === 0
                                ) {
                                    return false;
                                }

                                return true;
                            },
                        },
                        {
                            label: "Pilih Kursi",
                            component: (
                                <BookingFormSeat
                                    data={data}
                                    setData={setData}
                                    passengerCount={passengerCount}
                                />
                            ),
                            validate: () => {
                                return data.seat_ids?.length >= passengerCount;
                            },
                        },
                    ]}
                />
            </form>
        </div>
    );
}

function BookingFormIdentity({ data, setData, handleChange, passengerCount }) {
    const [orderIsPassenger, setOrderIsPassenger] = useState(false);

    const handleChangePassenger = (e) => {
        const { value, name } = e.target;
        const passengers = [...data.passengers];
        const index = name.split("[")[1].split("]")[0];
        passengers[index] = value;
        setData("passengers", passengers);
    };

    const mapPassengerInputs = Array.from(Array(passengerCount).keys()).map(
        (index, key) => (
            <div className="flex flex-col" key={key}>
                <label
                    className="inline-flex space-x-1 text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`passenger-${index}`}
                >
                    <UserCircleIcon width={18} />
                    <span>Nama Penumpang {index + 1}</span>
                </label>
                <Input
                    id={`passenger-${index}`}
                    name={`passengers[${index}]`}
                    placeholder={`Nama Penumpang ${index + 1}`}
                    className="w-full"
                    value={
                        data?.passengers?.length > 0
                            ? data.passengers[index]
                            : ""
                    }
                    handleChange={handleChangePassenger}
                />
            </div>
        )
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col">
                    <label
                        className="inline-flex space-x-1 text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        <UserCircleIcon width={18} />
                        <span>Nama Pemesan</span>
                    </label>
                    <Input
                        id="name"
                        placeholder="Nama Pemesan"
                        name="name"
                        className="w-full"
                        value={data.name}
                        handleChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        className="inline-flex space-x-1 text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                    >
                        <PhoneIcon width={18} />
                        <span>No. Telpon</span>
                    </label>
                    <Input
                        type="number"
                        id="phone"
                        name="phone"
                        placeholder="Masukan No. Telpon"
                        value={data.phone}
                        className="w-full"
                        handleChange={handleChange}
                    />
                </div>

                {mapPassengerInputs}
            </div>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col">
                    <label
                        className="inline-flex space-x-1 text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        <EnvelopeIcon width={18} />
                        <span>Email</span>
                    </label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Masukan Email Anda"
                        className="w-full"
                        name="email"
                        value={data.email}
                        handleChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        className="inline-flex space-x-1 text-gray-700 text-sm font-bold mb-2"
                        htmlFor="address"
                    >
                        <MapPinIcon width={18} />
                        <span>Address</span>
                    </label>
                    <Input
                        id="address"
                        placeholder="Masukan Alamat Anda"
                        className="w-full"
                        name="address"
                        value={data.address}
                        handleChange={handleChange}
                    />
                </div>

                <div className="flex gap-2">
                    <input
                        id="order"
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded transition duration-300 ease-in-out"
                        checked={orderIsPassenger}
                        onChange={(e) => {
                            setOrderIsPassenger(e.target.checked);
                            if (e.target.checked) {
                                setData("passengers", [data.name]);
                            } else {
                                setData("passengers", []);
                            }
                        }}
                    />

                    <label
                        className="inline-flex space-x-1 text-gray-700 text-sm font-bold mb-2"
                        htmlFor="order"
                    >
                        <span>Pemesan adalah penumpang</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

function Stepper({ steps = [], defaultActiveIndex = 0, onChange }) {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [errors, setErrors] = useState([]);
    const [valids, setValids] = useState([]);

    const handleStepClick = (index) => {
        const { validate } = steps[index - 1] || {};
        if (validate && !validate()) {
            if (errors.includes(index - 1)) {
                return;
            }

            setValids(valids.filter((valid) => valid !== index - 1));

            setErrors([...errors, index - 1]);
            return;
        }

        setErrors(errors.filter((error) => error !== index - 1));

        setValids([...valids, index - 1]);

        setActiveIndex(index);
        onChange && onChange(index);
    };

    const classNames = {
        counterWrapper: {
            base: "flex flex-col flex-shrink-0 items-center justify-center w-10 h-10 rounded-full",
            active: "bg-blue-400",
            inactive: "bg-gray-400",
            valid: "bg-green-400",
            error: "bg-red-600",
        },
        counterLabel: {
            base: "font-semibold",
            active: "text-blue-400",
            inactive: "text-gray-400",
            valid: "text-green-400",
            error: "text-red-600",
        },
    };

    const getCounterWrapperClass = (index) => {
        const baseClass = classNames.counterWrapper.base;

        if (errors.includes(index)) {
            return `${baseClass} ${classNames.counterWrapper.error}`;
        }

        if (valids.includes(index)) {
            return `${baseClass} ${classNames.counterWrapper.valid}`;
        }

        if (activeIndex === index) {
            return `${baseClass} ${classNames.counterWrapper.active}`;
        }

        return `${baseClass} ${classNames.counterWrapper.inactive}`;
    };

    const getCounterLabelClass = (index) => {
        const baseClass = classNames.counterLabel.base;

        if (errors.includes(index)) {
            return `${baseClass} ${classNames.counterLabel.error}`;
        }

        if (valids.includes(index)) {
            return `${baseClass} ${classNames.counterLabel.valid}`;
        }

        if (activeIndex === index) {
            return `${baseClass} ${classNames.counterLabel.active}`;
        }

        return `${baseClass} ${classNames.counterLabel.inactive}`;
    };

    return (
        <div className="max-w-full">
            <div className="flex flex-wrap gap-4 sm:gap-10">
                {steps.map((step, key) => (
                    <div
                        key={key}
                        onClick={() => handleStepClick(key)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleStepClick(key);
                            }
                        }}
                        tabIndex={0}
                        className="flex items-center gap-2 cursor-pointer :focus:outline-none :focus:ring-2 :focus:ring-blue-400"
                    >
                        <div className={getCounterWrapperClass(key)}>
                            {valids.includes(key) ? (
                                <CheckIcon className="text-white h-6" />
                            ) : (
                                <span className="text-white font-bold text-center text-xl">
                                    {key + 1}
                                </span>
                            )}
                        </div>

                        <span
                            role="button"
                            className={getCounterLabelClass(key)}
                        >
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>

            {errors.length > 0 && (
                <div className="mt-4">
                    <p className="text-red-500">
                        Masih ada formulir yang kosong!
                    </p>
                </div>
            )}

            <div className="mt-8">{steps && steps[activeIndex].component}</div>

            <div className="flex justify-end gap-4 mt-8">
                <Button
                    type="button"
                    colorScheme="blue"
                    disabled={activeIndex === 0}
                    onClick={() => {
                        activeIndex !== 0 && handleStepClick(activeIndex - 1);
                    }}
                    className="gap-2 font-semibold"
                >
                    <ArrowLeftIcon width={18} />
                    <span>Sebelumnya</span>
                </Button>

                {activeIndex !== steps.length - 1 && (
                    <Button
                        type="button"
                        colorScheme="blue"
                        onClick={() => {
                            activeIndex !== steps.length - 1 &&
                                handleStepClick(activeIndex + 1);
                        }}
                        className="gap-2 font-semibold"
                    >
                        <span>Selanjutnya</span>
                        <ArrowRightIcon width={18} />
                    </Button>
                )}

                {activeIndex === steps.length - 1 && (
                    <Button
                        type="submit"
                        colorScheme="green"
                        className="gap-2 font-semibold"
                    >
                        <span>Pesan</span>
                    </Button>
                )}
            </div>
        </div>
    );
}

function BookingFormSeat({ data, setData, passengerCount = 0 }) {
    const { schedule } = usePage().props;
    const { seats = [] } = schedule || {};

    const handleSeatClick = (seatNumber) => {
        if (data.seat_ids.length >= passengerCount) {
            if (data.seat_ids.includes(seatNumber)) {
                setData({
                    ...data,
                    seat_ids: data.seat_ids.filter(
                        (seat) => seat !== seatNumber
                    ),
                });
            }

            return;
        }

        if (data.seat_ids.includes(seatNumber)) {
            setData({
                ...data,
                seat_ids: data.seat_ids.filter((seat) => seat !== seatNumber),
            });
        } else {
            setData({
                ...data,
                seat_ids: [...data.seat_ids, seatNumber],
            });
        }
    };

    return (
        <div className="">
            <div className="max-w-full sm:max-w-xl mx-auto">
                <h1 className="text-2xl text-gray-500 text-center font-semibold leading-loose tracking-tighter">
                    Indikator Warna
                </h1>
                <div className="grid grid-cols-1 justify-items-start sm:grid-cols-3 sm:justify-items-center gap-4 mt-4">
                    <div className="flex gap-2 items-center">
                        <div className="bg-yellow-500 w-8 h-8 rounded-lg"></div>
                        <p className="">Sudah dipesan</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-sky-500 w-8 h-8 rounded-lg"></div>
                        <p className="">Kursi pilihan anda</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-gray-100 w-8 h-8 rounded-lg"></div>
                        <p className="">Belum dipilih</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mt-4">
                    <h1 className="text-lg text-gray-500 tracking-tighter leading-loose">
                        Pilih {passengerCount} kursi penumpang yang tersedia
                        dibawah ini
                    </h1>
                </div>
            </div>
            <div className="max-w-sm mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                    {seats.map((seat, key) => {
                        return (
                            <SeatCard
                                key={key}
                                selectedSeatIds={data.seat_ids}
                                seat={seat}
                                passengerCount={passengerCount}
                                onChange={handleSeatClick}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function SeatCard({
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
