export const formatNumber = (number) => {
    return number.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export const formatDecimal = (number, decimalPlaces) => {
    return number.toLocaleString('en-US', { maximumFractionDigits: decimalPlaces });
}

export const formatCurrency = (number) => {
    return number.toLocaleString('en-US', { style: "currency", currency: "USD" });
}