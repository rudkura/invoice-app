import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Country from "./Country";
import { apiGet, apiPost, apiPut } from "../utils/api";
import { Button, Col, Row } from "react-bootstrap";
import { InputField } from "../components/InputField";
import { InputCheck } from "../components/InputCheck";
import { useMessage } from "../context/MessageContext";

const PersonForm = () => {
    const navigate = useNavigate();
    const { addMessage } = useMessage();
    const {id} = useParams();

    const [person, setPerson] = useState({
        name: undefined,
        companyId: undefined,
        vatin: undefined,
        bankAccount: undefined,
        iban: undefined,
        phone: undefined,
        mail: undefined,
        street: undefined,
        zip: undefined,
        city: undefined,
        country: Country.CZECHIA,
        note: undefined
    });

    useEffect(() => {
        if (id) {
            apiGet("/api/persons/" + id)
            .then((data) => {setPerson(data)})
            .catch((e) => {
                console.error(e);
                addMessage(e.message, "netError");
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        (id ? apiPut("/api/persons/" + id , person) : apiPost("/api/persons", person))
            .then((data) => {
                addMessage(id ? "Osoba upravena" : "Osoba přidána");
                navigate("/persons/show/" + data._id);
            })
            .catch((e) => {
                console.error(e);
                addMessage(e.message, "netError")
            });
    };

    const handleChange = (e) => {
        if (e.target.value === "") {
            setPerson(prev => {
                return {...prev, [e.target.name]: undefined}
            });
        } else {
            setPerson(prev => {
                return {...prev, [e.target.name]: e.target.value}
            });
        }
    };

    return (
        <>
            <h1>{id ? "Upravit" : "Vytvořit novou"} osobu</h1>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col md>
                        {/* name */}
                        <InputField 
                            name = "name"
                            type = "text"
                            label = "Jméno"
                            prompt = "Jméno / název společnosti"
                            required = {true}
                            min = {3}
                            value = {person.name}
                            handleChange = {handleChange}
                        />
                        {/* phone */}
                        <InputField 
                            name = "phone"
                            type = "text"
                            label = "Telefon"
                            prompt = "+420 123 456 789"
                            required = {true}
                            min = {13}
                            value = {person.phone}
                            handleChange = {handleChange}
                        />
                        {/* mail */}
                        <InputField 
                            name = "mail"
                            type = "email"
                            label = "E-mail"
                            prompt = "email@spolecnost.cz"
                            required = {true}
                            min = {6}
                            value = {person.mail}
                            handleChange = {handleChange}
                        />
                        {/* street */}
                        <InputField 
                            name = "street"
                            type = "text"
                            label = "Ulice a č.p."
                            prompt = "Dlouhá 123/45"
                            required = {true}
                            min = {1}
                            value = {person.street}
                            handleChange = {handleChange}
                        />
                        {/* zip */}
                        <InputField 
                            name = "zip"
                            type = "text"
                            label = "PSČ"
                            prompt = "12345"
                            required = {true}
                            min = {5}
                            value = {person.zip}
                            handleChange = {handleChange}
                        />
                        {/* city */}
                        <InputField 
                            name = "city"
                            type = "text"
                            label = "Město"
                            prompt = "Aš"
                            required = {true}
                            min = {2}
                            value = {person.city}
                            handleChange = {handleChange}
                        />
                        {/* country */}
                        <InputCheck 
                            name = "country"
                            type = "radio"
                            label = "Česká republika"
                            value = {Country.CZECHIA}
                            checked = {person.country === Country.CZECHIA}
                            handleChange = {handleChange}
                        />
                        <InputCheck 
                            name = "country"
                            type = "radio"
                            label = "Slovenská republika"
                            value = {Country.SLOVAKIA}
                            checked = {person.country === Country.SLOVAKIA}
                            handleChange = {handleChange}
                        />
                    </Col>
                    <Col md>
                        {/* companyId */}
                        <InputField 
                            name = "companyId"
                            type = "text"
                            label = "IČO"
                            prompt = "12345678"
                            required = {true}
                            min = {8}
                            value = {person.companyId}
                            handleChange = {handleChange}
                        />
                        {/* vatin */}
                        <InputField 
                            name = "vatin"
                            type = "text"
                            label = "DIČ"
                            prompt = "CZ8234567p"
                            required = {true}
                            min = {8}
                            value = {person.vatin}
                            handleChange = {handleChange}
                        />
                        {/* bankAccount */}
                        <InputField 
                            name = "bankAccount"
                            type = "text"
                            label = "Číslo účtu"
                            prompt = "123456789"
                            required = {true}
                            min = {2}
                            value = {person.bankAccount}
                            handleChange = {handleChange}
                        />
                        {/* bankCode */}
                        <InputField 
                            name = "bankCode"
                            type = "text"
                            label = "Kód banky"
                            prompt = "1324"
                            required = {true}
                            min = {4}
                            value = {person.bankCode}
                            handleChange = {handleChange}
                        />
                        {/* iban */}
                        <InputField 
                            name = "iban"
                            type = "text"
                            label = "IBAN"
                            prompt = "CZ6508000000192000145399"
                            required = {true}
                            min = {2}
                            value = {person.iban}
                            handleChange = {handleChange}
                        />
                        {/* note */}
                        <InputField 
                            name = "note"
                            type = "textarea"
                            label = "Poznámky"
                            prompt = "Poznámky..."
                            rows = {3}
                            value = {person.note}
                            handleChange = {handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <Button variant="success" as="input" type="submit" value="Odeslat" />
                    </Col>
                </Row>
            </form>
        </>
    )
}

export default PersonForm;