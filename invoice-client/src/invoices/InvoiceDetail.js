import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import { Card, Col, Row } from "react-bootstrap";
import dateFormat from "../utils/dateFormat";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => {setInvoice(data)}).catch((e) => {console.error(e);});
    }, [id]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={9}>Faktura č. {invoice.invoiceNumber}</Col>
                                <Col sm={3}></Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Row>
                                    <Col>
                                        <p><span className="fw-bold"></span>Číslo faktury:<br />{invoice.invoiceNumber}</p>
                                        <p><span className="fw-bold"></span>Produkt:<br />{invoice.product}</p>
                                        <p><span className="fw-bold"></span>Cena:<br />{invoice.price}</p>
                                        <p><span className="fw-bold"></span>DPH:<br />{invoice.vat}%</p>
                                        <p><span className="fw-bold"></span>Vystaveno:<br />{dateFormat(invoice.issued)}</p>
                                        <p><span className="fw-bold"></span>Splatnost:<br />{dateFormat(invoice.dueDate)}</p>
                                        <p><span className="fw-bold"></span>Poznámka:<br />{invoice.note}</p>
                                    </Col>
                                </Row>
                                <Row></Row>
                                <Row></Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default InvoiceDetail;