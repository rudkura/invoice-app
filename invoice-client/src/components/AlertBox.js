import { Alert } from "react-bootstrap";
import { useMessage } from "../context/MessageContext";

const AlertBox = () => {
    const { messages } = useMessage();
    return (
        <div>
            {messages.map(({ id, message, type}) => (
                <Alert key={id} variant={type} >
                    {message}
                </Alert>
            ))}
        </div>
    ); 
};

export default AlertBox;