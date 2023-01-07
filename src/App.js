import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, NavItem, NavLink, Dropdown, Col, Row, Card } from 'react-bootstrap';
import MeterForm from './components/MeterForm';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// import fetch from 'node-fetch';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

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

function setFormValues(date) {
  const dateNowISO = toISOStringWithTimezone(date);
  updateFormDate(dateNowISO);
  console.log(dateNowISO, formState);
}

function App({ signOut, user }) {
  setFormValues(new Date());
  Object.assign(formState, { user: user.username });
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
                  <MeterForm user={user.username} newDateISO='2023-01-07T08:40' temp={formState.temp} defaultState={formState} />
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
