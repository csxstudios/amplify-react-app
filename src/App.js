import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form, Nav, NavItem, NavLink, Dropdown, Col, Row, Card } from 'react-bootstrap';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// import fetch from 'node-fetch';
import { Amplify, API } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

async function getCurrentWeather() {
  const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=38.84&longitude=-77.43&current_weather=true&temperature_unit=fahrenheit');
  const data = await response.json();
  console.log(data.current_weather.temperature);
  return data.current_weather.temperature;
};

async function addMeter(formState) {
  const data = {
    body: formState
  }

  if (data.body.meter > 0) {
    const apiData = await API.post('meterApi', '/meter', data);
    console.log({ apiData });
  }
}

const formState = {
  meter: 0,
  date: Date.now(),
  dateISO: '',
  month: '',
  weekday: '',
  year: 2023,
  user: '',
  label: 'home',
  temp: 61
};

const toISOStringWithTimezone = date => {
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes());
}

function updateFormState(key, value) {
  formState[key] = value;
}

function updateFormDate(dateISOString) {
  var date = new Date(dateISOString);
  var thisDateEpoch = date.valueOf();
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

function App({ signOut, user }) {
  const dateNowISO = toISOStringWithTimezone(new Date());
  const currentTemp = getCurrentWeather();
  updateFormDate(dateNowISO);
  Object.assign(formState, { user: user.username, temp: currentTemp });
  console.log(dateNowISO, formState);
  return (
    <div className="App">
      <Nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
        <Nav.Item>
          <span className="text-white">Amplify React Demo</span>
        </Nav.Item>
        <Nav className="navbar-nav ms-md-auto text-white" as="ul">
          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>Hello {user.username}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <button className="btn btn-link" onClick={signOut}>Sign out</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Nav>

      <div className="bg-dark">
        <Container className="py-5">
          <Row>
            <Col md={4}>
              <Card style={{ width: '100%' }}>
                <Card.Header><strong>Track Energy Usage</strong></Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Control type="hidden" onChange={e => updateFormState('meter', e.target.value)}></Form.Control>
                    <Form.Group className="mb-3" controlId="formMeterReading">
                      <Form.Label>Meter</Form.Label>
                      <Form.Control type="number" placeholder="Meter reading" onChange={e => updateFormState('meter', e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMeterDate">
                      <Form.Label>Date &amp; Time</Form.Label>
                      <Form.Control type="datetime-local" placeholder="Date Time" onChange={e => updateFormDate(e.target.value)} defaultValue={dateNowISO}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMeterTemp">
                      <Form.Label>Farenheit</Form.Label>
                      <Form.Control type="number" placeholder="Temp (F)" onChange={e => updateFormState('temp', e.target.value)} defaultValue={currentTemp}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMeterLabel">
                      <Form.Label>Location</Form.Label>
                      <Form.Select onChange={e => updateFormState('label', e.target.value)} defaultValue="home">
                        <option>Select a location</option>
                        <option>home</option>
                        <option>rental property</option>
                        <option>vacation home</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                  <Button type="button" variant="primary" onClick={() => addMeter(formState)}>Add Meter Reading</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <span></span>
            </Col>
          </Row>
        </Container>
      </div>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <h1>Hello {user.username}</h1>
        <button type="button" onClick={signOut}>Sign out</button> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default withAuthenticator(App);
