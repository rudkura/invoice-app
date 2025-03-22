import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiDelete, apiGet } from "../utils/api";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import Country from "./Country";
import InvoiceTable from "../invoices/InvoiceTable";
import { useMessage } from "../context/MessageContext";


const PersonDetail = () => {
    const navigate = useNavigate();
    const { addMessage } = useMessage();
    const {id} = useParams();

    const [person, setPerson] = useState({});
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        apiGet(`/api/persons/${id}`).then((data) => {
            setPerson(data);
            apiGet(`/api/invoices/${data._id}/sales`).then((salesData) => setSales(salesData));
            apiGet(`/api/invoices/${data._id}/purchases`).then((purchasesData) => setPurchases(purchasesData));
        }).catch((e) => {
            console.error(e);
            addMessage(e.message, "netError");
        });
    }, [id]);

    const handleDelete = () => {
        apiDelete("/api/persons/" + id)
        .then(() => {
            addMessage("Osoba smazána", "warning");
            navigate("/");
        })
        .catch((e) => {
            addMessage(e.message, "netError")
            console.error(e);
        });
    }

    const hasSales = sales.length !== 0;
    const hasPurchases = purchases.length !== 0;

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className="h2">
                            <Row>
                                <Col md={9}>{person.name}</Col>
                                <Col md={3}>
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
                                    <Col sm>
                                        <p><span className="fw-bold">IČO:</span><br />{person.companyId}</p>
                                        <p><span className="fw-bold">Telefon:</span><br />{person.phone}</p>
                                        <p><span className="fw-bold">E-mail</span><br />{person.mail}</p>
                                        <p><span className="fw-bold">Adresa</span><br />{person.street},<br />{person.zip}, {person.city}<br />{person.country === Country.CZECHIA ? "Česká republika" : "Slovensko"}</p>
                                    </Col>
                                    <Col sm>
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
            <Row className="text-center">
                <Col lg>
                    <h3>Prodeje</h3>
                    {hasSales ? (
                        <InvoiceTable items={sales} />
                    ) : (
                        <i>Žádné záznamy...</i>
                    )}
                </Col>
                <Col lg>
                    <h3>Nákupy</h3>
                    {hasPurchases ? (
                        <InvoiceTable items={purchases} />
                    ) : (
                        <i>Žádné záznamy...</i>
                    )}
                    
                </Col>
            </Row>
        </>
    );
};

export default PersonDetail;