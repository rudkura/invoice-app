import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiDelete, apiGet } from "../utils/api";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import Country from "./Country";

const PersonDetail = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    const [person, setPerson] = useState({});

    useEffect(() => {
        apiGet("/api/persons/" +id).then((data) => {setPerson(data)}).catch((e) => {console.error(e);});
    }, [id]);

    const handleDelete = () => {
        apiDelete("/api/persons/" + id)
        .then(() => {navigate("/")})
        .catch((e) => {console.error(e);});
    }

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={9}>{person.name}</Col>
                                <Col sm={3}>
                                    <ButtonGroup>
                                        <Button variant="outline-dark" size="sm" as={Link} to={"/persons/edit/" + id}>Upravit</Button>
                                        <Button variant="outline-danger" size="sm" onClick={handleDelete}>Smazat</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Row>
                                    <Col>
                                        <p><span className="fw-bold">IČO:</span><br />{person.companyId}</p>
                                        <p><span className="fw-bold">Telefon:</span><br />{person.phone}</p>
                                        <p><span className="fw-bold">E-mail</span><br />{person.mail}</p>
                                        <p><span className="fw-bold">Adresa</span><br />{person.street},<br />{person.zip}, {person.city}<br />{person.country === Country.CZECHIA ? "Česká republika" : "Slovensko"}</p>
                                    </Col>
                                    <Col>
                                        <p><span className="fw-bold">DIČ:</span><br />{person.vatin}</p>
                                        <p><span className="fw-bold">IBAN:</span><br />{person.iban}</p>
                                        <p><span className="fw-bold">Číslo účtu:</span><br />{person.bankAccount}/{person.bankCode}</p>
                                        <p><span className="fw-bold">Poznámky:</span><br />{person.note}</p>
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PersonDetail;