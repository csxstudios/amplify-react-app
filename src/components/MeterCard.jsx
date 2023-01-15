import { React, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { AppContext } from '../providers/AppProvider';
import { getLastMeterValue, calculateMeterBill, prevMeterBill } from '../utils/meterData';
import { formatNumber, formatDecimal, formatCurrency } from '../utils/format';
import { epochPlusDays } from '../utils/dateFunctions';

const MeterCard = () => {
    const appContext = useContext(AppContext);

    const nextBillDate = epochPlusDays(prevMeterBill.date, 30);
    const updateMeterCard = async () => {
        console.log("getMeter");
        await getLastMeterValue()
            .then((meterData) => {
                let meterBillData = calculateMeterBill(prevMeterBill.meter, meterData[0].meter, prevMeterBill.date, meterData[0].date);

                console.log(meterBillData);

                document.getElementById("kwh").innerHTML = formatDecimal(meterBillData.kwh, 2) + " kw/h";
                document.getElementById("kwd").innerHTML = formatNumber(meterBillData.kwd) + " kw/day";
                document.getElementById("kwm").innerHTML = formatNumber(meterBillData.kwm) + " kw/month";
                document.getElementById("kwy").innerHTML = formatNumber(meterBillData.kwy) + " kw/year";
                document.getElementById("currentTotalCharges").innerHTML = formatCurrency(meterBillData.currentTotalCharges);
                document.getElementById("meterValue").innerHTML = formatNumber(meterData[0].meter) + " kw";
            });
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
                <small>Last meter reading was {prevMeterBill.meter.toLocaleString()} on {new Date(prevMeterBill.date * 1000).toLocaleDateString()}</small>
            </Card.Body>
        </Card>
    )
}

export default MeterCard