import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Col, Row } from "react-bootstrap";
import PersonTable from "./PersonTable";

const PersonIndex = () => {
    const [persons, setPersons] = useState([]);
    
    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data))
            .catch((e) => {console.error(e);});
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
        </>
    )
};

export default PersonIndex;