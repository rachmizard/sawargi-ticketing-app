export const CITY_OPTIONS = [
    {
        value: "all",
        label: "All",
    },
    {
        value: "jakarta",
        label: "Jakarta",
    },
    {
        value: "bandung",
        label: "Bandung",
    },
];

export const CITY_OPTIONS_WITHOUT_ALL = CITY_OPTIONS.filter(
    (option) => option.value !== "all"
);

export const SHUTTLE_STATUS_OPTIONS = [
    {
        value: "available",
        label: "Available",
    },
    {
        value: "unavailable",
        label: "Unavailable",
    },
];
