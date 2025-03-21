import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { InputField } from "../components/InputField";
import { InputSelect } from "../components/InputSelect";

const InvoiceForm = () => {
    const navigate = useNavigate();

    const {id} = useParams();

    const [invoice, setInvoice] = useState({
        invoiceNumber: undefined,
        issued: undefined,
        product: undefined,
        price: undefined,
        vat: undefined,
        note: undefined,
        seller: {_id: undefined},
        buyer: {_id: undefined}
    });
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id)
            .then((data) => {
                data.buyer = {_id: data.buyer?._id}
                data.seller = {_id: data.seller?._id}
                setInvoice(data);
            })
            .catch((e) => {console.error(e);});
        }
        apiGet("/api/persons")
        .then((data) => {setPersons(data);})
        .catch((e) => {console.error(e);});
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isIssue = e.nativeEvent.submitter.name === "issue";

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => 
                (isIssue ? apiPut(`/api/invoices/${data._id}/issue`).then(() => data) : data)
            )
            .then((data) => navigate("/invoices/show/" + data._id))
            .catch((e) => {console.error(e);});
    }

    const handleChange = (e) => {
        if (e.target.value === "") {
            setInvoice(prev => {
                return {...prev, [e.target.name]: undefined}
            });
        } else if (["buyer", "seller"].includes(e.target.name)) {
            setInvoice(prev => {
                return {...prev, [e.target.name]: {_id: e.target.value}}
            });
        } else {
            setInvoice(prev => {
                return {...prev, [e.target.name]: e.target.value}
            });
        }
    }

    return (
        <>
            <h1>{id ? "Upravit" : "Vytvořit novou"} fakturu</h1>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col md>
                        {/* invoiceNumber */}
                        <InputField 
                            name="invoiceNumber"
                            type="text"
                            label="Číslo faktury"
                            prompt="123456789"
                            required={true}
                            min={3}
                            value={invoice.invoiceNumber}
                            handleChange={handleChange}
                        />
                        {/* product */}
                        <InputField 
                            name="product"
                            type="text"
                            label="Název produktu"
                            prompt="název"
                            required={true}
                            min={3}
                            value={invoice.product}
                            handleChange={handleChange}
                        />
                        {/* seller */}
                        <InputSelect
                            name="seller"
                            label="Dodavatel"
                            prompt="- vyberte dodavatele -"
                            required={true}
                            value={invoice.seller?._id || ""}
                            items={persons}
                            handleChange={handleChange}
                        />
                        {/* buyer */}
                        <InputSelect
                            name="buyer"
                            label="Odběratel"
                            prompt="- vyberte odběratele -"
                            required={true}
                            value={invoice.buyer?._id || ""}
                            items={persons}
                            handleChange={handleChange}
                        />
                    </Col>
                    <Col md>
                        {/* issued */}
                        <InputField 
                            name="issued"
                            type="date"
                            label="Datum vystavení"
                            required={true}
                            value={invoice.issued}
                            handleChange={handleChange}
                        />
                        {/* dueDate */}
                        <InputField 
                            name="dueDate"
                            type="date"
                            label="Datum splatnosti"
                            required={true}
                            value={invoice.dueDate}
                            handleChange={handleChange}
                        />
                        {/* price */}
                        <InputField 
                            name="price"
                            type="number"
                            label="Částka"
                            prompt="Kč"
                            required={true}
                            min={1}
                            value={invoice.price}
                            handleChange={handleChange}
                        />
                        {/* vat */}
                        <InputField 
                            name="vat"
                            type="number"
                            label="DPH"
                            prompt="%"
                            required={true}
                            min={0}
                            value={invoice.vat}
                            handleChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* note */}
                        <InputField 
                            name="note"
                            type="textarea"
                            label="Poznámky"
                            prompt="Poznámky..."
                            rows={3}
                            value={invoice.note}
                            handleChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <ButtonGroup>
                            <Button name="save" variant="secondary" as="input" type="submit" value="Uložit" />
                            <Button name="issue" variant="success" as="input" type="submit" value="Vystavit" />
                        </ButtonGroup>
                    </Col>
                </Row>
            </form>
        </>
    );
}

export default InvoiceForm;