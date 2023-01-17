// import logo from '../logo.svg';
import '../App.css';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { MeterCreateForm, MeterCard } from './';

const Home = () => {
    return (
        <div className="App">
            <div className="bg-dark">
                <Container className="py-5">
                    <Row>
                        <Col md={4} className="mb-3">
                            <MeterCard />
                        </Col>
                        <Col md={4}>
                            <Card style={{ width: '100%' }}>
                                <Card.Header><strong>Track Energy Usage</strong></Card.Header>
                                <Card.Body>
                                    <MeterCreateForm />
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
