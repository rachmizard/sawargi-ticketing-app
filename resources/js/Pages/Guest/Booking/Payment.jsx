import { Head } from "@inertiajs/inertia-react";

import UserLayout from "@/Layouts/User";

export default function BookingPaymentPage({ auth }) {
    return (
        <UserLayout auth={auth}>
            <Head title="Confirmation Payment" />
            <div className="max-w-xl mx-auto px-10 sm:px-6 lg:px-8 pb-8 pt-8 bg-white mt-5 shadow-sm rounded-md">
                <h1 className="text-2xl text-center tracking-tighter font-semibold text-gray-500">
                    Halaman Konfirmasi Pembayaran
                </h1>
            </div>
        </UserLayout>
    );
}
