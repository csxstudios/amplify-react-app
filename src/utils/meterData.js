import { API } from 'aws-amplify';

export const prevMeterBill = [
    {
        meterStart: 80131,
        dateStart: new Date("12/09/2022 12:00").valueOf() / 1000,
        meterEnd: 82395,
        dateEnd: new Date("1/11/2023 12:00").valueOf() / 1000
    }
];

export const calculateMeterBill = (meterOld, meterNew, dateEpochOld, dateEpochNew) => {
    let meterCalc = {
        meterStart: meterOld,
        meterEnd: meterNew,
        dateStart: dateEpochOld,
        dateEnd: dateEpochNew,
        meterDiff: 0,
        epochDiff: 0,
        hoursDiff: 0,
        kwh: 0,
        kwd: 0,
        kwm: 0,
        kwy: 0,
        rate: 0.097310,
        taxRate: 0.0306136844580296,
        //The 2023 power cost adjustment (PCA) is $8.55 per month for a customer using 1,000 kilowatt-hours per month, a 95-cent reduction from the 2022 PCA rate
        powerCostAdjustmentRate: 8.55 / 1000,
        dist300kWhRate: 0.021090,
        distOver300kWhRate: 0.016090,
        dist300kWhCharge: 0,
        distOver300kWhCharge: 0,
        supplyCharge: 0,
        powerCostAdjustmentCharge: 0,
        serviceCharge: 15,
        subtotal: 0,
        taxCharge: 0,
        total: 0,
    }

    meterCalc.meterDiff = meterNew - meterOld;
    meterCalc.epochDiff = dateEpochNew - dateEpochOld;
    meterCalc.hoursDiff = meterCalc.epochDiff / 3600;
    meterCalc.kwh = meterCalc.meterDiff / meterCalc.hoursDiff;
    meterCalc.kwd = meterCalc.kwh * 24;
    meterCalc.kwm = meterCalc.kwd * 30;
    meterCalc.kwy = meterCalc.kwd * 365;
    meterCalc.dist300kWhCharge = 300 * meterCalc.dist300kWhRate;
    meterCalc.distOver300kWhCharge = (meterCalc.meterDiff - 300) * meterCalc.distOver300kWhRate;
    meterCalc.supplyCharge = meterCalc.meterDiff * meterCalc.rate;
    meterCalc.powerCostAdjustmentCharge = meterCalc.meterDiff * meterCalc.powerCostAdjustmentRate;
    meterCalc.subtotal = meterCalc.dist300kWhCharge + meterCalc.distOver300kWhCharge + meterCalc.supplyCharge + meterCalc.serviceCharge + meterCalc.powerCostAdjustmentCharge;
    meterCalc.taxCharge = meterCalc.subtotal * meterCalc.taxRate;
    meterCalc.total = meterCalc.subtotal + meterCalc.taxCharge;

    return meterCalc;
}

export const getLastMeterValue = async () => {
    const myInit = {
        queryStringParameters: {
            user: "csx"
        }
    };

    console.log("getLastMeterValue");
    const apiData = await API.get('meterApi', '/meter', myInit);

    return apiData;
}

export const getLastMeterOnDate = async (dateEpoch) => {
    const myInit = {
        queryStringParameters: {
            user: "csx"
        }
    };

    console.log("getLastMeterOnDate");
    const apiData = await API.get('meterApi', '/meter', myInit);

    return apiData;
}

export const getCurrentWeather = async (e) => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=38.84&longitude=-77.43&current_weather=true&temperature_unit=fahrenheit');
    const data = await response.json();
    console.log("getCurrentWeather", data);
    return data;
};