import { ToastContainer, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ToastMessage = ({header, body, handleCloseToast}) =>{
    return(
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
                <Toast onClose={handleCloseToast}>
                <Toast.Header>
                   <FontAwesomeIcon icon={faCheckCircle} className="me-4 text-success"/>
                    <strong className="me-auto text-success">{header}</strong>
                </Toast.Header>
                <Toast.Body>{body}</Toast.Body>
                </Toast>
        </ToastContainer>
    )
}

export default ToastMessage;