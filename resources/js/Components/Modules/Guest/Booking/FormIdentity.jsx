import {
    ArrowRightIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
    Controller,
    useFieldArray,
    useFormContext,
    useWatch,
} from "react-hook-form";

import Input from "@/Components/Input";
import Button from "@/Components/Button";

import { useBookingStepperContext } from "./Stepper";
import { useBookingFormContext } from "./FormContext";

export default function BookingFormIdentity({ passengerCount }) {
    const { setValue, control, getValues, trigger, formState } =
        useFormContext();
    const { setData } = useBookingFormContext();
    const { activeIndex, handleStepClick, steps } = useBookingStepperContext();

    const customerName = useWatch({
        name: "name",
    });

    const { fields } = useFieldArray({
        name: "passengers",
        control,
        rules: {
            minLength: {
                message: `Minimal ${passengerCount} Penumpang`,
                value: passengerCount,
            },
            required: "Nama penumpang wajib di isi",
        },
    });

    const submit = async (e, values) => {
        e.preventDefault();

        const valid = await trigger([
            "name",
            "phone",
            "email",
            "address",
            "passangers",
        ]);

        if (!valid) return;

        setData(values);
        activeIndex !== steps.length - 1 && handleStepClick(activeIndex + 1);
    };

    return (
        <form onSubmit={(e) => submit(e, getValues())}>
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
                        <Controller
                            control={control}
                            name="name"
                            rules={{
                                required: "Nama Pemesan tidak boleh kosong",
                            }}
                            render={({ field, fieldState }) => (
                                <Input
                                    id="name"
                                    placeholder="Nama Pemesan"
                                    name="name"
                                    className="w-full"
                                    handleChange={field.onChange}
                                    error={fieldState.error?.message}
                                    {...field}
                                />
                            )}
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
                        <Controller
                            control={control}
                            name="phone"
                            rules={{
                                required: "No. Telpon tidak boleh kosong",
                            }}
                            render={({ field, fieldState }) => (
                                <Input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    placeholder="Masukan No. Telpon"
                                    className="w-full"
                                    handleChange={field.onChange}
                                    error={fieldState.error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </div>

                    {fields.map((item, index) => (
                        <div className="flex flex-col" key={item.id}>
                            <label
                                className="inline-flex space-x-1 text-gray-700 text-sm font-bold mb-2"
                                htmlFor={`passenger-${index}`}
                            >
                                <UserCircleIcon width={18} />
                                <span>Nama Penumpang {index + 1}</span>
                            </label>

                            <Controller
                                control={control}
                                name={`passengers.${index}.value`}
                                rules={{
                                    minLength: {
                                        value: passengerCount,
                                        message:
                                            "Nama Penumpang tidak boleh kosong",
                                    },
                                    required: `Nama Penumpang ${
                                        index + 1
                                    } tidak boleh kosong`,
                                }}
                                render={({ field, formState: { errors } }) => (
                                    <Input
                                        id={`passenger-${index}`}
                                        placeholder={`Nama Penumpang ${
                                            index + 1
                                        }`}
                                        className="w-full"
                                        handleChange={field.onChange}
                                        error={
                                            errors?.passengers?.[index]?.value
                                                ?.message
                                        }
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    ))}
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

                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: "Email tidak boleh kosong",
                                validate: (value) => {
                                    if (!value.includes("@")) {
                                        return "Email tidak valid";
                                    }
                                    return true;
                                },
                            }}
                            render={({ field, formState: { errors } }) => (
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Masukan Email Anda"
                                    className="w-full"
                                    handleChange={field.onChange}
                                    error={errors?.email?.message}
                                    {...field}
                                />
                            )}
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
                        <Controller
                            control={control}
                            name="address"
                            rules={{
                                required: "Alamat tidak boleh kosong",
                            }}
                            render={({ field, formState: { errors } }) => (
                                <Input
                                    id="address"
                                    placeholder="Masukan Alamat Anda"
                                    className="w-full"
                                    handleChange={field.onChange}
                                    error={errors?.address?.message}
                                    {...field}
                                />
                            )}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Controller
                            control={control}
                            name="customer_is_passenger"
                            render={({ field: { onChange, ...field } }) => (
                                <input
                                    id="customer_is_passenger"
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded transition duration-300 ease-in-out"
                                    checked={Boolean(field.value)}
                                    onChange={(e) => {
                                        let value = "";

                                        if (e.target.checked) {
                                            value = customerName;
                                        } else {
                                            value = "";
                                        }

                                        setValue(
                                            "passengers.0",
                                            {
                                                value,
                                            },
                                            {
                                                shouldValidate: true,
                                            }
                                        );

                                        onChange(e.target.checked);
                                    }}
                                    {...field}
                                />
                            )}
                        />

                        <label
                            className="inline-flex space-x-1 text-gray-700 text-sm font-bold mb-2"
                            htmlFor="customer_is_passenger"
                        >
                            <span>Pemesan adalah penumpang</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                {activeIndex !== steps.length - 1 && (
                    <Button
                        type="submit"
                        colorScheme="blue"
                        className="gap-2 font-semibold"
                    >
                        <span>Selanjutnya</span>
                        <ArrowRightIcon width={18} />
                    </Button>
                )}
            </div>
        </form>
    );
}
