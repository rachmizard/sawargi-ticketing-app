/* eslint-disable no-undef */
import { useState } from "react";
import {
    ArrowLeftIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useForm, usePage } from "@inertiajs/inertia-react";

import Button from "@/Components/Button";
import Input from "@/Components/Input";

export default function BookingForm({ defaultValues, passengerCount = 0 }) {
    const {
        ziggy: { query },
    } = usePage().props;

    const { data, setData, post } = useForm("BookingForm", {
        name: defaultValues?.name || "",
        phone: defaultValues?.phone || "",
        email: defaultValues?.email || "",
        address: defaultValues?.address || "",
        passengerNames: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("booking.store"), {
            data: {
                ...data,
                passengerNames: data.passengerNames.filter(
                    (name) => name !== null
                ),
                schedule_id: query?.scheduleId,
            },
            preserveState: true,
        });
    };

    return (
        <div className="mt-8 space-y-4">
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
                                    data.passengerNames?.length === 0
                                ) {
                                    return false;
                                }

                                return true;
                            },
                        },
                        {
                            label: "Pilih Kursi",
                            component: <p>Helo</p>,
                            validate: () => {
                                return true;
                            },
                        },
                    ]}
                />
            </form>
        </div>
    );
}

function BookingFormIdentity({ data, setData, handleChange, passengerCount }) {
    const handleChangePassenger = (e) => {
        const { value, name } = e.target;
        const passengerNames = [...data.passengerNames];
        const index = name.split("[")[1].split("]")[0];
        passengerNames[index] = value;
        setData("passengerNames", passengerNames);
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
                    name={`passengerNames[${index}]`}
                    placeholder={`Nama Penumpang ${index + 1}`}
                    className="w-full"
                    value={data.passengerNames[index] ?? ""}
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
            </div>
        </div>
    );
}

function Stepper({ steps = [], defaultActiveIndex = 0, onChange }) {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [errors, setErrors] = useState([]);

    const handleStepClick = (index) => {
        const { validate } = steps[index - 1] || {};
        if (validate && !validate()) {
            if (errors.includes(index - 1)) {
                return;
            }

            setErrors([...errors, index - 1]);
            return;
        }

        setErrors(errors.filter((error) => error !== index - 1));

        setActiveIndex(index);
        onChange && onChange(index);
    };

    const classNames = {
        counterWrapper: {
            base: "flex flex-col flex-shrink-0 items-center justify-center w-10 h-10 rounded-full",
            active: "bg-blue-400",
            inactive: "bg-gray-400",
            error: "bg-red-600",
        },
        counterLabel: {
            base: "font-semibold",
            active: "text-blue-400",
            inactive: "text-gray-400",
            error: "text-red-600",
        },
    };

    const getCounterWrapperClass = (index) => {
        const baseClass = classNames.counterWrapper.base;

        if (errors.includes(index)) {
            return `${baseClass} ${classNames.counterWrapper.error}`;
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

        if (activeIndex === index) {
            return `${baseClass} ${classNames.counterLabel.active}`;
        }

        return `${baseClass} ${classNames.counterLabel.inactive}`;
    };

    return (
        <div className="max-w-full">
            <div className="flex flex-wrap gap-4">
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
                            <span className="text-white font-bold text-center text-xl">
                                {key + 1}
                            </span>
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

            <div className="mt-8">{steps[activeIndex].component}</div>

            <div className="flex justify-end gap-4 mt-8">
                <Button
                    type="button"
                    colorScheme="gray"
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
            </div>
        </div>
    );
}
