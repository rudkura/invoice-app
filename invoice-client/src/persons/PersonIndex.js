import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Button, Col, Row } from "react-bootstrap";
import PersonTable from "./PersonTable";
import { Link } from "react-router-dom";
import { useMessage } from "../context/MessageContext";


const PersonIndex = () => {
    const [persons, setPersons] = useState([]);

    const { addMessage } = useMessage();
    
    useEffect(() => {
        apiGet("/api/persons")
        .then((data) => setPersons(data))
        .catch((e) => {
            console.error(e);
            addMessage(e.message, "netError")
        });
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <h1>Seznam osob</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PersonTable items={persons} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button variant="success" as={Link} to="/persons/create">Přidat</Button>
                </Col>
            </Row>
        </>
    );
};

export default PersonIndex;