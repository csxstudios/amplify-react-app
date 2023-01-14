import { React, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { AppContext } from '../providers/AppProvider';

const MeterCard = () => {
    const appContext = useContext(AppContext);

    const billingMeter = {
        meter: 80131,
        date: new Date("12/09/2022 12:00").valueOf() / 1000
    }

    const getMeter = async () => {
        //console.log(e.target.name, e.target.value);
        const apiData = await API.get('meterApi', '/meter', {
            queryStringParameters: {
                Limit: 1,
                ScanIndexForward: false
            }
        });
        console.log("apiData", apiData);

        return apiData;
    }

    const updateMeterCard = async () => {
        let meterCalc = {
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
            currentTotalCharges: 0,
        }
        console.log("getMeter");
        await getMeter()
            .then((meterData) => {
                meterCalc.meterDiff = meterData[0].meter - billingMeter.meter;
                meterCalc.epochDiff = meterData[0].date - billingMeter.date;
                meterCalc.hoursDiff = meterCalc.epochDiff / 3600;
                meterCalc.kwh = meterCalc.meterDiff / meterCalc.hoursDiff;
                meterCalc.kwd = meterCalc.kwh * 24;
                meterCalc.kwm = meterCalc.kwd * 30;
                meterCalc.kwy = meterCalc.kwd * 365;
                meterCalc.dist300kWhCharge = 300 * meterCalc.distOver300kWhRate;
                meterCalc.distOver300kWhCharge = (meterCalc.kwm - 300) * meterCalc.distOver300kWhRate;
                meterCalc.supplyCharge = meterCalc.kwm * meterCalc.rate;
                meterCalc.powerCostAdjustmentCharge = meterCalc.kwm * meterCalc.powerCostAdjustmentRate;
                meterCalc.subtotal = meterCalc.dist300kWhCharge + meterCalc.distOver300kWhCharge + meterCalc.supplyCharge + meterCalc.serviceCharge + meterCalc.powerCostAdjustmentCharge;
                meterCalc.taxCharge = meterCalc.subtotal * meterCalc.taxRate;
                meterCalc.currentTotalCharges = meterCalc.subtotal + meterCalc.taxCharge;

                console.log(meterCalc);

                document.getElementById("kwh").innerHTML = meterCalc.kwh.toLocaleString('en-US', { maximumFractionDigits: 2 }) + " kw/h";
                document.getElementById("kwd").innerHTML = meterCalc.kwd.toLocaleString('en-US', { maximumFractionDigits: 0 }) + " kw/day";
                document.getElementById("kwm").innerHTML = meterCalc.kwm.toLocaleString('en-US', { maximumFractionDigits: 0 }) + " kw/month";
                document.getElementById("kwy").innerHTML = meterCalc.kwy.toLocaleString('en-US', { maximumFractionDigits: 0 }) + " kw/year";
                document.getElementById("currentTotalCharges").innerHTML = meterCalc.currentTotalCharges.toLocaleString('en-US', { style: "currency", currency: "USD" });
                document.getElementById("meterValue").innerHTML = meterData[0].meter.toLocaleString() + " kw";
            }
            );
    }

    updateMeterCard();

    return (
        <Card style={{ width: '100%' }}>
            <Card.Header><strong>Electricity Meter</strong></Card.Header>
            <Card.Body>
                {/* 
                1. Get last billing meter reading and date
                2. Convert billing date to epoch
                3. Meter Differnce: Last dynamodb meter minus billing meter
                4. Epoch Difference: Last dynamodb date (epoch) minus billing epoch
                5. Hours Difference: Epoch difference is in seconds, divide by 3600 for hours
                6. kW/h: meter difference divided by hours difference
                7. Under 4 kw/h is good/green?
                 */}
                <h3 id="kwh">0 Kw/h</h3>
                <p id="kwd">0 Kw/day</p>
                <p id="kwm">0 Kw/month</p>
                <p id="kwy">0 Kw/year</p>
                <p id="currentTotalCharges">$0</p>
                <p>Current meter: <span id="meterValue">0</span></p>
                <small>Last meter reading was {billingMeter.meter.toLocaleString()} on {new Date(billingMeter.date * 1000).toLocaleDateString()}</small>
            </Card.Body>
        </Card>
    )
}

export default MeterCard