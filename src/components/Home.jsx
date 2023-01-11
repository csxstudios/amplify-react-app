// import logo from '../logo.svg';
import '../App.css';
import { useContext } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { MeterForm } from './';
import { AppContext } from '../providers/AppProvider';

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

    const toISOStringWithTimezone = date => {
        const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes());
    }

    function updateFormDate(dateISOString) {
        var date = new Date(dateISOString);
        var thisDateEpoch = date.valueOf() / 1000;
        console.log("epoch", thisDateEpoch.toString().length, thisDateEpoch);
        var thisDateISO = dateISOString;
        var thisMonth = date.toLocaleString('default', { month: 'short' });
        var thisWeekday = date.toLocaleString('default', { weekday: 'short' });
        var thisYear = Number(date.toLocaleString('default', { year: 'numeric' }));

        console.log("change", dateISOString, formState);

        Object.assign(
            formState,
            {
                date: thisDateEpoch,
                dateISO: thisDateISO,
                month: thisMonth,
                weekday: thisWeekday,
                year: thisYear
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
                            <Card style={{ width: '100%' }}>
                                <Card.Header><strong>Track Energy Usage</strong></Card.Header>
                                <Card.Body>
                                    <MeterForm user={appContext.user.username} newDateISO='2023-01-07T08:40' temp={formState.temp} defaultState={formState} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <span></span>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Hello {appContext.user.username}</h1>
                <button type="button" onClick={appContext.signOut}>Sign out</button>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}

        </div>
    );
}

export default Home;
