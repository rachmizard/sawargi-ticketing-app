import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Select from "@/Components/Select";

import { CITY_OPTIONS_WITHOUT_ALL } from "@/Utils/constants";

export default function OutletForm({
    handleSubmit,
    processing,
    setData,
    data,
    buttonSubmitLabel = "Submit",
}) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                >
                    Outlet Name
                </label>

                <Input
                    key="name"
                    value={data.name}
                    className="w-full"
                    handleChange={(e) => {
                        setData("name", e.target.value);
                    }}
                    placeholder="Input Name of Outlet.."
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                >
                    Address
                </label>

                <Input
                    key="address"
                    value={data.address}
                    className="w-full"
                    placeholder="Input Address of Outlet.."
                    handleChange={(e) => {
                        setData("address", e.target.value);
                    }}
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                >
                    City
                </label>

                <Select
                    key="city"
                    value={data.city}
                    className="w-full"
                    onChange={(value) => {
                        setData("city", value);
                    }}
                    options={CITY_OPTIONS_WITHOUT_ALL}
                    required
                    emptyOption
                    emptyOptionLabel="Choose Status of Outlet"
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                >
                    Phone
                </label>

                <Input
                    key="phone"
                    value={data.phone}
                    className="w-full"
                    placeholder="Input Phone of Outlet.."
                    handleChange={(e) => {
                        setData("phone", e.target.value);
                    }}
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status"
                >
                    Status
                </label>

                <Select
                    key="status"
                    value={data.status}
                    className="w-full"
                    onChange={(value) => {
                        setData("status", value);
                    }}
                    options={[
                        {
                            label: "Open",
                            value: "open",
                        },
                        {
                            label: "Close",
                            value: "close",
                        },
                    ]}
                    required
                    emptyOption
                    emptyOptionLabel="Choose Status"
                />
            </div>

            <div className="mb-4 flex justify-end">
                <Button
                    processing={processing}
                    colorScheme="gray"
                    variant="outline"
                    size="md"
                >
                    {buttonSubmitLabel}
                </Button>
            </div>
        </form>
    );
}
