// import logo from '../logo.svg';
import '../App.css';
import { useContext } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { MeterForm, MeterCard } from './';
import { AppContext } from '../providers/AppProvider';
import { toISOStringWithTimezone, parseDateISOString } from '../utils/dateFunctions';

const Home = () => {
    const appContext = useContext(AppContext);
    const formState = {
        meter: 0,
        date: Date.now(),
        dateISO: '',
        month: '',
        weekday: '',
        year: 2023,
        user: '',
        label: 'home',
        temp: 0
    };

    function updateFormDate(dateISOString) {
        let newDateObj = parseDateISOString(dateISOString);

        console.log("change", dateISOString, formState);

        Object.assign(
            formState,
            {
                date: newDateObj.dateEpoch,
                dateISO: newDateObj.dateISO,
                month: newDateObj.month,
                weekday: newDateObj.weekday,
                year: newDateObj.year
            }
        );
    }

    function setFormValues(date) {
        const dateNowISO = toISOStringWithTimezone(date);
        updateFormDate(dateNowISO);
        console.log(dateNowISO, formState);
    }

    setFormValues(new Date());

    return (
        <div className="App">
            <div className="bg-dark">
                <Container className="py-5">
                    <Row>
                        <Col md={4}>
                            <MeterCard />
                        </Col>
                        <Col md={4}>
                            <Card style={{ width: '100%' }}>
                                <Card.Header><strong>Track Energy Usage</strong></Card.Header>
                                <Card.Body>
                                    <MeterForm user={appContext.user.username} defaultState={formState} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;
