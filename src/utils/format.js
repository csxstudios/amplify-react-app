export const formatNumber = (number) => {
    return number ? number.toLocaleString('en-US', { maximumFractionDigits: 0 }) : 0;
}

export const formatDecimal = (number, decimalPlaces) => {
    return number ? number.toLocaleString('en-US', { maximumFractionDigits: decimalPlaces }) : 0;
}

export const formatCurrency = (number) => {
    return number ? number.toLocaleString('en-US', { style: "currency", currency: "USD" }) : "$-";
}

export const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "Date error";
}

export const formatTime = (date) => {
    return date ? new Date(date).toLocaleTimeString() : "Time error";
}