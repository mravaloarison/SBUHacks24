import { Alert } from 'react-bootstrap';
import { BsCheckCircleFill, BsExclamationCircleFill, BsFillXCircleFill } from 'react-icons/bs';

export const Feedback = ({ type, message}) => {
    let variant = "";
    let icon = "";

    if (type === "success") {
        variant = "success";
        icon = <BsCheckCircleFill />;
    }

    else if (type === "warning") {
        variant = "warning";
        icon = <BsExclamationCircleFill />;
    }

    else {
        variant = "danger";
        icon = <BsFillXCircleFill />;
    }

    return (
        <Alert variant={variant}>
            <span>{icon}</span>
            <span> {message}</span>
        </Alert>
    )
}