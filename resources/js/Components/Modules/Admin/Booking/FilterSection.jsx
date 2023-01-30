import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

import Select from "@/Components/Select";
import DynamicSelect from "@/Components/DynamicSelect";
import Button from "@/Components/Button";
import Input from "@/Components/Input";

export default function BookingFilterSection() {
    const [status, setStatus] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const submit = (e) => {
        e.preventDefault();
        const payload = {};

        if (status.length > 0) {
            payload.status = status.map((item) => item.value);
        }

        if (customerName) {
            payload.customer_name = customerName;
        }

        if (paymentMethod) {
            payload.payment_method = paymentMethod;
        }

        Inertia.get(
            // eslint-disable-next-line no-undef
            route("admin.bookings"),
            payload,
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <form onSubmit={submit}>
            <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between w-full">
                <div className="flex flex-col flex-1 gap-2">
                    <label
                        htmlFor="select-status"
                        className="text-gray-500 tracking-tight"
                    >
                        Filter by Status
                    </label>
                    <div className="flex-1">
                        <DynamicSelect
                            key="select-status"
                            id="select-status"
                            isMulti
                            value={status}
                            name="status"
                            onChange={(values) => setStatus(values)}
                            className="w-full"
                            placeholder="Pending, Cancelled, Complete"
                            styles={{
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: "#a0aec0",
                                    textOverflow: "ellipsis",
                                }),
                                multiValueLabel: (provided) => ({
                                    ...provided,
                                    color: "white",
                                    backgroundColor: "#3182ce",
                                }),
                                multiValueRemove: (provided) => ({
                                    ...provided,
                                    color: "white",
                                    backgroundColor: "#3182ce",
                                }),
                            }}
                            options={[
                                { value: "cancelled", label: "Cancelled" },
                                { value: "pending", label: "Pending" },
                                { value: "complete", label: "Complete" },
                            ]}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="customer-name"
                        className="text-gray-500 tracking-tight"
                    >
                        Filter by Customer Name
                    </label>
                    <Input
                        id="customer-name"
                        type="text"
                        name="customer_name"
                        placeholder="Ex: Ujang"
                        value={customerName}
                        handleChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="select-payment-method"
                        className="text-gray-500 tracking-tight"
                    >
                        Filter by Payment Method
                    </label>
                    <Select
                        id="select-payment-method"
                        name="payment_method"
                        placeholder="Ex: Transfer, Cash"
                        value={paymentMethod}
                        onChange={(value) => {
                            setPaymentMethod(value);
                        }}
                        options={[
                            { value: "", label: "All" },
                            { value: "transfer", label: "Transfer" },
                            { value: "cash", label: "Cash" },
                        ]}
                    />
                </div>
                <Button variant="solid" colorScheme="gray">
                    <span>Filter</span>
                </Button>
            </div>
        </form>
    );
}
