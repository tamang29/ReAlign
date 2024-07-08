import { Modal } from "react-bootstrap";
import ApollonDiagram from "../FunctionalReq/ApollonDiagram";

const ApollonModal = ({onClose, selectedModal, diagram}) =>{
    return(
    <Modal show="true" fullscreen={true}  onHide={onClose} className="p-0">
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body style={{width: "100%"}} className="m-0">
            <ApollonDiagram selectedModal={selectedModal} diagram={diagram}/>
        </Modal.Body>
      </Modal>
    )
}

export default ApollonModal;