import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    // const apiKey = event.apiKey;
    const city = event.city;
    const params = {
        latitude: 38.84,
        longitude: -77.43,
        temperature_unit: 'fahrenheit'
    }

    fetch('https://api.open-meteo.com/v1/forecast' + new URLSearchParams(params))
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        });
};

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     return {
//         statusCode: 200,
//         //  Uncomment below to enable CORS requests
//         //  headers: {
//         //      "Access-Control-Allow-Origin": "*",
//         //      "Access-Control-Allow-Headers": "*"
//         //  }, 
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };
