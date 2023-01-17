export const dateToEpoch = (dateISOString) => {
    let date = new Date(dateISOString);
    return date.valueOf() / 1000;
}

export const epochPlusDays = (dateEpoch, numberOfDays) => {
    return dateEpoch + (numberOfDays * 3600 * 24);
}

export const toISOStringWithTimezone = date => {
    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');

    //return '2023-01-07T08:40'
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes());
}

export const parseDateISOString = (dateISOString) => {
    let dateObj = {
        dateEpoch: 0,
        dateISO: "",
        month: "Abr",
        weekday: "Abr",
        year: 4040
    }

    dateISOString = dateISOString ? dateISOString : toISOStringWithTimezone(new Date());
    let date = new Date(dateISOString);
    dateObj.dateEpoch = date.valueOf() / 1000;
    dateObj.dateISO = dateISOString;
    dateObj.month = date.toLocaleString('default', { month: 'short' });
    dateObj.weekday = date.toLocaleString('default', { weekday: 'short' });
    dateObj.year = Number(date.toLocaleString('default', { year: 'numeric' }));

    return dateObj;
}