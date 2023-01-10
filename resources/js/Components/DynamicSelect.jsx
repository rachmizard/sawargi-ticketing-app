import ReactSelect from "react-select";

export default function DynamicSelect({ value, onChange, options, ...rest }) {
    return (
        <ReactSelect
            value={value}
            onChange={onChange}
            options={options}
            {...rest}
        />
    );
}
