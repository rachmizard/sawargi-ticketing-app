import { forwardRef } from "react";

import ReactDatePicker from "react-datepicker";
import Input from "./Input";

export default function Datepicker({
    selected = new Date(),
    onChange,
    ...rest
}) {
    return (
        <ReactDatePicker
            selected={selected}
            customInput={<CustomDateInput />}
            onChange={onChange}
            {...rest}
        />
    );
}

const CustomDateInput = forwardRef(({ value = new Date(), onClick }, ref) => (
    <Input
        ref={ref}
        onClick={onClick}
        value={value}
        placeholder="Select Date"
        className="w-full"
    />
));

CustomDateInput.displayName = "DateInput";
