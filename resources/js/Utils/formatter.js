export const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

export const formatDate = (value, { locale = "id-ID", options }) => {
    return new Intl.DateTimeFormat(locale, options).format(value);
};
