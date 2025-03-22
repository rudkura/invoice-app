import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Status from "./Status";

const InvoiceTable = ({items}) => {
    const navigate = useNavigate();

    return (
        <div className="text-nowrap">
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Produkt</th>
                        <th>Dodavatel</th>
                        <th>Odběratel</th>
                        <th>Částka</th>
                        <th>Číslo faktury</th>
                        <th>Stav</th>
                    </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={item._id} onClick={() => navigate(`/invoices/show/${item._id}`)} style={{cursor: "pointer"}}>
                        <td>{index+1}</td>
                        <td>{item.product}</td>
                        <td>{item.seller?.name}</td>
                        <td>{item.buyer?.name}</td>
                        <td>{item.price} Kč</td>
                        <td>{item.invoiceNumber}</td>
                        <td>{item.status === Status.NEW ? "Nová" : "Vystavená"}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default InvoiceTable;