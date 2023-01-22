import { useState } from "react";
import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import Input from "@/Components/Input";
import { useBookingFormContext } from "./BookingContext";

export default function BookingFormIdentity({ passengerCount }) {
    const { data, setData, handleChange } = useBookingFormContext();
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
