import { Head } from "@inertiajs/inertia-react";
import {
    ArrowDownCircleIcon,
    ArrowUpCircleIcon,
    CalendarIcon,
    ClockIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import { AlertCard } from "@/Components";
import UserLayout from "@/Layouts/User";
import { formatDate } from "@/Utils/formatter";
import { BookingForm, BookingInformationCard } from "@/Components/Modules";

export default function BookingPage({ auth, schedule, ziggy: { query } }) {
    const { destination, departure_date, arrival_date } = schedule || {};

    const departureDate = formatDate(Date.parse(departure_date), {
        locale: "id-ID",
        options: {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        },
    });

    const departureTime = formatDate(Date.parse(departure_date), {
        locale: "id-ID",
        options: {
            hour: "numeric",
            minute: "numeric",
        },
    });

    const arrivalTime = formatDate(Date.parse(arrival_date), {
        locale: "id-ID",
        options: {
            hour: "numeric",
            minute: "numeric",
        },
    });

    return (
        <UserLayout auth={auth}>
            <Head title="Booking" />
            <div className="max-w-6xl mx-auto px-10 sm:px-6 lg:px-8 pb-8 pt-8 bg-white mt-5 shadow-sm rounded-md">
                <h1 className="text-2xl font-semibold text-gray-700">
                    Halaman Booking
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div>
                        <h2 className="text-lg text-gray-500 font-semibold mt-4">
                            Rute Perjalanan
                        </h2>
                        <div className="flex flex-col gap-4 mt-4">
                            <BookingInformationCard
                                icon={
                                    <ArrowUpCircleIcon
                                        width={20}
                                        className="text-gray-500"
                                    />
                                }
                                title={destination?.from_outlet?.name}
                                subtitle={destination?.from_outlet?.address}
                            />

                            <BookingInformationCard
                                icon={
                                    <ArrowDownCircleIcon
                                        width={20}
                                        className="text-gray-500"
                                    />
                                }
                                title={destination?.to_outlet?.name}
                                subtitle={destination?.to_outlet?.address}
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg text-gray-500 font-semibold mt-4">
                            Jadwal Keberangkatan
                        </h2>

                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex items-start">
                                <div className="max-w-xs space-y-4">
                                    <BookingInformationCard
                                        icon={
                                            <CalendarIcon
                                                width={20}
                                                className="text-gray-500"
                                            />
                                        }
                                        title={departureDate}
                                    />

                                    <BookingInformationCard
                                        icon={
                                            <ClockIcon
                                                width={20}
                                                className="text-gray-500"
                                            />
                                        }
                                        title={`${departureTime} - ${arrivalTime}`}
                                    />

                                    <div className="flex">
                                        <p className="text-md text-gray-500 ml-2"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg text-gray-500 font-semibold mt-4">
                            Penumpang
                        </h2>

                        <div className="flex">
                            <UserCircleIcon
                                width={20}
                                className="text-gray-500"
                            />
                            <p className="text-md text-gray-500 ml-2">
                                {query?.passenger}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <AlertCard isOpen infinite>
                        <p className="text-gray-700">
                            Mohon isi data diri anda terlebih dahulu.
                        </p>
                    </AlertCard>

                    <div className="mt-4">
                        <BookingForm
                            defaultValues={{
                                name: auth?.user?.name,
                                email: auth?.user?.email,
                                phone: auth?.user?.phone,
                                address: auth?.user?.address,
                            }}
                            passengerCount={Number(query?.passenger) ?? 0}
                        />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
