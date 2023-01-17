import { React, useContext, useState, useEffect } from 'react';
import { AppContext } from '../providers/AppProvider';
import { Button, Form } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { formatTime } from '../utils/format';
import { parseDateISOString } from '../utils/dateFunctions';
import { getCurrentWeather } from '../utils/meterData';

const MeterCreateForm = () => {
    const appContext = useContext(AppContext);

    const defaultState = {
        meter: 0,
        date: appContext.session.dateEpoch,
        dateISO: appContext.session.dateISO,
        month: appContext.session.month,
        weekday: appContext.session.weekday,
        year: appContext.session.year,
        user: appContext.user.username,
        label: 'home',
        temp: 0
    };

    const [formState, setFormState] = useState(defaultState);
    const [currTemp, setCurrTemp] = useState();

    useEffect(() => {
        getCurrentWeather()
            .then((data) => {
                const temperature = data.current_weather.temperature;
                setCurrTemp(temperature);
                formState.temp = temperature;
            })
    }, [formState]);

    const onSubmit = async (e) => {
        e.preventDefault();
        //do something
        const data = {
            body: formState
        }
        console.log("submit", formState);

        if (data.body.meter > 0) {
            const apiData = await API.post('meterApi', '/meter', data);
            console.log({ apiData });
        }
    }

    const onChange = (e) => {
        console.log(e.target.name);
        const newState = formState;
        newState[e.target.name] = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        setFormState(newState);
        console.log("onChange", formState);
    }

    const onChangeDate = (e) => {
        console.log(e.target.name, e.target.value);

        const newState = formState;
        const parseDate = parseDateISOString(e.target.value);
        newState["date"] = parseDate.dateEpoch;
        newState["dateISO"] = parseDate.dateISO;
        newState["month"] = parseDate.month;
        newState["weekday"] = parseDate.weekday;
        newState["year"] = parseDate.year;

        setFormState(newState);

        console.log("onChangeDate", formState);
        window.location.reload(false);
    }

    return (
        <>
            <h5>It's currently {formatTime(Date.now())} and {currTemp} °F.</h5>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formMeterReading">
                    <Form.Label>Meter</Form.Label>
                    <Form.Control type="number" name="meter" placeholder="Meter reading" onChange={onChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMeterDate">
                    <Form.Label>Date &amp; Time</Form.Label>
                    <Form.Control type="datetime-local" name="dateISO" placeholder="Date Time" onChange={onChangeDate} defaultValue={formState.dateISO}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMeterTemp">
                    <Form.Label>Farenheit</Form.Label>
                    <Form.Control type="number" name="temp" placeholder="Temp (F)" onChange={onChange} defaultValue={currTemp && currTemp}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMeterLabel">
                    <Form.Label>Location</Form.Label>
                    <Form.Select onChange={onChange} name="label" defaultValue="home">
                        <option>Select a location</option>
                        <option>home</option>
                        <option>rental property</option>
                        <option>vacation home</option>
                    </Form.Select>
                </Form.Group>
                <Button className="d-block mb-3" type="submit" variant="primary" onClick={onSubmit}>Add Meter Reading</Button>
            </Form>
        </>
    )
}

export default MeterCreateForm