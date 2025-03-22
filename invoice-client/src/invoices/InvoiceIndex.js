import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Button, Col, Row } from "react-bootstrap";
import InvoiceTable from "./InvoiceTable";
import { Link } from "react-router-dom";
import { useMessage } from "../context/MessageContext";


const InvoiceIndex = ({viewSaved = false}) => {
    const [invoices, setInvoices] = useState([]);
    const { addMessage } = useMessage();

    const apiUrl = viewSaved ? "/api/invoices/saved" : "/api/invoices"

    useEffect(() => {
        apiGet(apiUrl).then((data) => setInvoices(data))
        .catch((e) => {
            console.error(e);
            addMessage(e.message, "netError")
        });
    }, [viewSaved]);

    return (
        <>
            <Row>
                <Col>
                    <h1>Seznam {viewSaved ? "uložených" : "vystavených"} faktur</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InvoiceTable items={invoices} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button variant="success" as={Link} to={"/invoices/create"}>Přidat</Button>
                </Col>
            </Row>
        </>
    );
};

export default InvoiceIndex;