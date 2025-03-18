import { Table } from "react-bootstrap";

const InvoiceTable = ({items}) => {

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
                    </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index+1} style={{cursor: "pointer"}}>
                        <td>{index+1}</td>
                        <td>{item.product}</td>
                        <td>{item.seller.name}</td>
                        <td>{item.buyer.name}</td>
                        <td>{item.price}</td>
                        <td>{item.invoiceNumber}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default InvoiceTable;