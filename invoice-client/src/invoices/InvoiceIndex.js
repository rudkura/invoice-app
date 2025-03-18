import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Col, Row } from "react-bootstrap";
import InvoiceTable from "./InvoiceTable";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data))
            .catch((e) => {console.error(e);});
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <h1>Seznam faktur</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InvoiceTable items={invoices} />
                </Col>
            </Row>
        </>
    );
};

export default InvoiceIndex;