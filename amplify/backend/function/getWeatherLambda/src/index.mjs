import fetch from 'node-fetch';

export const handler = async (event) => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=38.84&longitude=-77.43&current_weather=true&temperature_unit=fahrenheit');
    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
