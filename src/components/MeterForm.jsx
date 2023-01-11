
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { API } from 'aws-amplify';

class MeterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meter: 0,
            date: props.defaultState.date,
            dateISO: props.defaultState.dateISO,
            month: props.defaultState.month,
            weekday: props.defaultState.weekday,
            year: 2023,
            user: props.user,
            label: 'home',
            temp: props.defaultState.temp
        };
    }

    onChange = (e) => {
        console.log(e.target.name);
        const state = this.state;
        state[e.target.name] = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        this.setState(state);
    }

    onChangeDate = (e) => {
        console.log(e.target.name, e.target.value);
        this.updateFormDate(e.target.value);
    }

    onSubmit = (e) => {
        e.preventDefault();
        //do something
    }

    getCurrentWeather = async (e) => {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=38.84&longitude=-77.43&current_weather=true&temperature_unit=fahrenheit');
        const data = await response.json();
        const currentTemp = data.current_weather.temperature;

        this.setState({
            temp: currentTemp
        });

        document.getElementById("formMeterTemp").value = currentTemp;

        console.log("new temp", currentTemp);

        return currentTemp;
    };

    addMeter = async () => {
        console.log('click')
        const data = {
            body: this.state
        }

        if (data.body.meter > 0) {
            const apiData = await API.post('meterApi', '/meter', data);
            console.log({ apiData });
            window.location.reload(false);
        }
    }

    //'2023-01-07T08:40'
    toISOStringWithTimezone = date => {
        const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
        let thisDateISO = date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes());

        this.updateFormDate(thisDateISO);

        return thisDateISO
    }

    updateFormDate = (dateISOString) => {
        var date = new Date(dateISOString);
        var thisDateEpoch = date.valueOf() / 1000;
        var thisDateISO = dateISOString;
        var thisMonth = date.toLocaleString('default', { month: 'short' });
        var thisWeekday = date.toLocaleString('default', { weekday: 'short' });
        var thisYear = Number(date.toLocaleString('default', { year: 'numeric' }));

        console.log("change", dateISOString, this.state);

        this.setState({
            date: thisDateEpoch,
            dateISO: thisDateISO,
            month: thisMonth,
            weekday: thisWeekday,
            year: thisYear
        });
    }

    render() {
        //const currentWeather = this.getCurrentWeather();
        const { dateISO, temp } = this.state;
        temp === 0 && (this.getCurrentWeather())
        console.log(this.state);
        return (
            <div>
                <h5>It's currently {dateISO} and {temp} F.</h5>
                <Form>
                    <Form.Control type="hidden" onChange={this.onChange}></Form.Control>
                    <Form.Group className="mb-3" controlId="formMeterReading">
                        <Form.Label>Meter</Form.Label>
                        <Form.Control type="number" name="meter" placeholder="Meter reading" onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMeterDate">
                        <Form.Label>Date &amp; Time</Form.Label>
                        <Form.Control type="datetime-local" name="dateISO" placeholder="Date Time" onChange={this.onChangeDate} defaultValue={dateISO}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMeterTemp">
                        <Form.Label>Farenheit</Form.Label>
                        <Form.Control type="number" name="temp" placeholder="Temp (F)" onChange={this.onChange} defaultValue={temp}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMeterLabel">
                        <Form.Label>Location</Form.Label>
                        <Form.Select onChange={this.onChange} name="label" defaultValue="home">
                            <option>Select a location</option>
                            <option>home</option>
                            <option>rental property</option>
                            <option>vacation home</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
                <Button className="d-block mb-3" type="button" variant="primary" onClick={this.addMeter}>Add Meter Reading</Button>
                <Button className="d-none mb-3" type="button" variant="primary" onClick={this.getCurrentWeather}>Get Current Temp</Button>
            </div>
        )
    }
}

export default MeterForm;