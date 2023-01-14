import { React, useContext } from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { AppContext } from '../providers/AppProvider';

const MeterCard = () => {
    const appContext = useContext(AppContext);

    const getMeter = async (e) => {
        console.log(e.target.name, e.target.value);
        const apiData = await API.get('meterApi', '/meter', {
            queryStringParameters: {
                //order: 'byPrice'
                Limit: 1,
                ScanIndexForward: false
            }
        });
        console.log("apiData", apiData);

        document.getElementById("meterValue").value = JSON.stringify(apiData);
    }
    return (
        <Card style={{ width: '100%' }}>
            <Card.Header><strong>Electricity Meter</strong></Card.Header>
            <Card.Body>
                <p id="meterValue">0</p>
                <p>
                    <Button className="mb-3" type="button" variant="primary" onClick={getMeter}>Get Meter</Button>
                </p>
            </Card.Body>
        </Card>
    )
}

export default MeterCard