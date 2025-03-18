import { Table } from "react-bootstrap";
import Country from "./Country";
import { useNavigate } from "react-router-dom";

const PersonTable = ({items}) => {
    const navigate = useNavigate();

    return (
        <div className="text-nowrap">
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jméno</th>
                        <th>IČO</th>
                        <th>Adresa</th>
                    </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={item._id} onClick={() => navigate(`/persons/show/${item._id}`)} style={{cursor: "pointer"}}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.companyId}</td>
                        <td>{item.street}, {item.zip} {item.city}, {item.country === Country.CZECHIA ? "Česká republika" : "Slovensko"}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PersonTable