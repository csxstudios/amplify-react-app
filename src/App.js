import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form, Nav, NavItem, NavLink, Dropdown, Col, Row, Card } from 'react-bootstrap';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify, API } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

async function addMeter(formState) {
  const data = {
    body: {
      meter: Number(formState.meter),
      date: Date.now(),
      temp: Number(formState.farenheit),
      user: formState.user
    }
  }

  console.log(data);
  if (data.body.meter > 0) {
    const apiData = await API.post('meterApi', '/meter', data);
    console.log({ apiData });
  }
};

const formState = {
  meter: '',
  date: '',
  temp: 61,
  user: ''
};

const dateNowISO = (date) => {
  var nowEpoch = date;
  var nowISO = nowEpoch.toISOString();
  return nowISO;
}

const toEpochString = dateISOString => {
  var date = new Date(dateISOString);
  return date.valueOf();
}

const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes());
};

function updateFormState(key, value) {
  formState[key] = value;
}

function App({ signOut, user }) {
  console.log(user);
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
                <NavLink to='/' onClick={signOut}>Logout</NavLink>
                <Button type="button" className="btn btn-link" onClick={signOut}>Sign out</Button>
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
                      <Form.Control type="datetime-local" placeholder="Date Time" defaultValue={toISOStringWithTimezone(new Date())}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMeterTemp">
                      <Form.Label>Farenheit</Form.Label>
                      <Form.Control type="number" placeholder="Temp (F)" onChange={e => updateFormState('meter', e.target.value)} defaultValue="61"></Form.Control>
                    </Form.Group>
                  </Form>
                  <Button type="button" onClick={() => addMeter(formState)}>Add Meter Reading</Button>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>


            </Col>
            <Col sm={4}>sm=4</Col>
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
