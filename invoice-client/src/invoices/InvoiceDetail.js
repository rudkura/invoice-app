import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiDelete, apiGet, apiPut } from "../utils/api";
import { ButtonGroup, Button, Card, Col, Row } from "react-bootstrap";
import dateFormat from "../utils/dateFormat";
import Country from "../persons/Country";
import Status from "./Status";
import { useMessage } from "../context/MessageContext";

const InvoiceDetail = () => {
    const navigate = useNavigate();
    const { addMessage } = useMessage();

    const {id} = useParams();
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => {setInvoice(data)})
        .catch((e) => {
            console.error(e);
            addMessage(e.message, "netError");
        });
    }, [id]);

    const handleIssue = () => {
        apiPut(`/api/invoices/${id}/issue`).then((data) => {
            addMessage("Faktura vystavena");
            setInvoice(data);
        })
        .catch((e) => {
            console.error(e);
            addMessage(e.message, "netError");
        });
    }
    const handleDelete = () => {
        apiDelete(`/api/invoices/${id}`).then(() => {
            addMessage("Faktura smazána", "warning")
            navigate("/");
        })
        .catch((e) => {
            console.error(e);
            addMessage(e.message, "netError");
        });
    }

    const isIssued = invoice.status === Status.ISSUED;
    const isMissingParty = !invoice?.buyer || !invoice?.seller;

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col lg={9}>Faktura č. {invoice.invoiceNumber}</Col>
                                <Col lg={3}  className="text-center">
                                    {isIssued ? (
                                        <i>Vystaveno</i>
                                    ) : (
                                        <ButtonGroup size="sm">
                                            <Button disabled={isMissingParty} variant="outline-success" onClick={handleIssue}>Vystavit</Button>
                                            <Button variant="outline-dark" as={Link} to={`/invoices/edit/${id}`}>Upravit</Button>
                                            <Button variant="outline-danger" onClick={handleDelete}>Smazat</Button>
                                        </ButtonGroup>
                                    )}
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Row>
                                    <Col lg={4}>
                                        <DetailsRow label="Číslo faktury" value={invoice.invoiceNumber} />
                                        <DetailsRow label="Produkt" value={invoice.product} />
                                        <DetailsRow label="Cena" value={invoice.price + " Kč"} />
                                        <DetailsRow label="DPH" value={invoice.vat + "%"} />
                                        <DetailsRow label="Vystaveno" value={dateFormat(invoice.issued, true)} />
                                        <DetailsRow label="Splatnost" value={dateFormat(invoice.dueDate, true)} />
                                        <DetailsRow label="Poznámka" value={invoice.note} />
                                    </Col>
                                    <Col lg={4}>
                                        <ItemDetails title="Dodavatel" item={invoice.seller} />
                                    </Col>
                                    <Col lg={4}>
                                        <ItemDetails title="Odběratel" item={invoice.buyer} />
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

const DetailsRow = ({ label, value, isPerson}) => {
    return isPerson ? (
        <p className="d-flex justify-content-between">
            <span className="fw-bold">{label}</span>
            <span className="text-end">{value}</span>
        </p>
    ) : (
        <p>
            <span className="fw-bold">{label}</span><br/>
            {value}
        </p>
    );
}

const ItemDetails = ({ title, item}) => {
    return (
        <Card>
            <Card.Header>{title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <DetailsRow label="Jméno:" value={item?.name} isPerson />
                    <DetailsRow label="IČO:" value={item?.companyId} isPerson />
                    <DetailsRow label="DIČ:" value={item?.vatin} isPerson />
                    <DetailsRow label="Telefon:" value={item?.phone} isPerson />
                    <DetailsRow label="E-mail:" value={item?.mail} isPerson />
                    <DetailsRow label="Adresa:" value={item ? (
                        <>
                            {item.street}<br />
                            {item.zip}, {item.city}<br />
                            {item.country === Country.CZECHIA ? "Česká republika" : "Slovensko"}
                        </>
                    ) : null} isPerson />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default InvoiceDetail;