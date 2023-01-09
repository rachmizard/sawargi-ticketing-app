import { forwardRef } from "react";
import { format } from "date-fns";

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
        value={format(new Date(value), "dd MMMM yyyy hh:mm a")}
        placeholder="Select Date"
        className="w-full"
    />
));

CustomDateInput.displayName = "DateInput";
