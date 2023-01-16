import { React, useContext, useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { AppContext } from '../providers/AppProvider';
import { getLastMeterValue, calculateMeterBill, prevMeterBill } from '../utils/meterData';
import { formatNumber, formatDecimal, formatCurrency, formatDate } from '../utils/format';
import { epochPlusDays } from '../utils/dateFunctions';

const MeterCard = () => {
    const appContext = useContext(AppContext);

    const [lastBill, setLastBill] = useState();
    const [prevMeterBillData, setPrevMeterBillData] = useState();
    const [currMeterBillData, setCurrMeterBillData] = useState();
    const [estMeterBillData, setEstMeterBillData] = useState();

    useEffect(() => {
        getLastMeterValue()
            .then(async (meterData) => {
                const lastBill = prevMeterBill[prevMeterBill.length - 1];
                setLastBill(prevMeterBill[prevMeterBill.length - 1]);
                console.log("lastBill", lastBill);
                setPrevMeterBillData(calculateMeterBill(lastBill.meterStart, lastBill.meterEnd, lastBill.dateStart, lastBill.dateEnd));
                setCurrMeterBillData(calculateMeterBill(lastBill.meterEnd, meterData[0].meter, lastBill.dateEnd, meterData[0].date));

                if (currMeterBillData) {
                    const estKwm = lastBill.meterEnd + currMeterBillData.kwm;
                    const nextBillDate = epochPlusDays(lastBill.dateEnd, 30);

                    setEstMeterBillData(calculateMeterBill(lastBill.meterEnd, estKwm, lastBill.dateEnd, nextBillDate));

                    console.log("prevMeterBillData", prevMeterBillData);
                    console.log("estMeterBillData", estMeterBillData);
                }
            })
    }, []);


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

                8. Show current charges and estimated new bill
                9. Day to day change (%change)
                10. Line chart of billable month to date
                11. Last month's bill/expected bill
                 */}

                <h3 className='small'>Est. Bill on {estMeterBillData && formatDate(estMeterBillData.dateEnd * 1000)}</h3>
                <p className='h3 mb-3' id="estTotalCharges">{estMeterBillData && formatCurrency(estMeterBillData.total)}</p>

                <ListGroup as="ul">
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div>
                            <div className="fw-bold">Current Charges</div>
                            <p className="small mb-0">{currMeterBillData && formatNumber(currMeterBillData.meterDiff) + " kw"}</p>
                            <p className="small mb-0">{currMeterBillData && formatNumber(currMeterBillData.epochDiff / 86400) + " days"}</p>
                            <p className="small mb-0">{currMeterBillData && formatDecimal(currMeterBillData.kwh, 2) + " kw/h"}</p>
                            <p className="small mb-0">{currMeterBillData && formatNumber(currMeterBillData.kwd) + " kw/day"}</p>
                            <p className="small mb-0">{currMeterBillData && formatNumber(currMeterBillData.kwm) + " kw/month"}</p>
                            <p className="small mb-0">{currMeterBillData && formatNumber(currMeterBillData.kwy) + " kw/year"}</p>
                            <small>Meter reading was {currMeterBillData && formatNumber(currMeterBillData.meterEnd)} on {currMeterBillData && formatDate(currMeterBillData.dateEnd * 1000)}</small>
                        </div>
                        <div id="currentTotalCharges">
                            {currMeterBillData && formatCurrency(currMeterBillData.total)}
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div>
                            <div className="fw-bold">Previous Charges</div>
                            <p className="small mb-0">{prevMeterBillData && formatNumber(prevMeterBillData.meterDiff) + " kw"}</p>
                            <p className="small mb-0">{prevMeterBillData && formatNumber(prevMeterBillData.epochDiff / 86400) + " days"}</p>
                            <p className="small mb-0">{prevMeterBillData && formatDecimal(prevMeterBillData.kwh, 2) + " kw/h"}</p>
                            <p className="small mb-0">{prevMeterBillData && formatNumber(prevMeterBillData.kwd) + " kw/day"}</p>
                            <p className="small mb-0">{prevMeterBillData && formatNumber(prevMeterBillData.kwm) + " kw/month"}</p>
                            <p className="small mb-0">{prevMeterBillData && formatNumber(prevMeterBillData.kwy) + " kw/year"}</p>
                            <small>Meter reading was {lastBill && formatNumber(lastBill.meterEnd)} on {lastBill && formatDate(lastBill.dateEnd * 1000)} for {appContext.user.username}</small>
                        </div>
                        <div id="prevTotalCharges">
                            {currMeterBillData && formatCurrency(prevMeterBillData.total)}
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default MeterCard