import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Row, Col, Table } from "react-bootstrap";
import { useMessage } from "../context/MessageContext";

const StatsIndex = () => {
    const [invoiceStats, setInvoiceStats] = useState({});
    const [personStats, setPersonStats] = useState([]);

    const { addMessage } = useMessage();

    useEffect(() => {
        apiGet("/api/persons/stats")
        .then((perData) => setPersonStats(perData
            .filter(item => item.revenue > 0)
            .sort((a, b) => b.revenue - a.revenue)))
        .catch((e) => {
            console.error(e);
            addMessage(e.message, "netError");
        });
        apiGet("/api/invoices/stats")
        .then((invData) => setInvoiceStats(invData))
        .catch((e) => {
            console.error(e);
            addMessage(e.message, "netError")
        });
    }, []);

    return (
        <>
            <Row className="text-center">
                <Col>
                    <h2>Celkové statistiky</h2>
                    
                </Col>
                <Col>
                    <h2>Statistiky osob</h2>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center align-items-start">
                    <Table>
                        <tbody>
                            <tr>
                                <td>Celkem tento rok</td>
                                <td>{invoiceStats.currentYearSum} Kč</td>
                            </tr>
                            <tr>
                                <td>Celkem</td>
                                <td>{invoiceStats.allTimeSum} Kč</td>
                            </tr>
                            <tr>
                                <td>Počet faktur</td>
                                <td>{invoiceStats.invoiceCount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>IČO</th>
                                <th>Název</th>
                                <th>Příjem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personStats.map((item, index) => (
                                <tr key={index+1}>
                                    <td>{index+1}</td>
                                    <td>{item.companyId}</td>
                                    <td>{item.personName}</td>
                                    <td>{item.revenue}Kč</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
};

export default StatsIndex;