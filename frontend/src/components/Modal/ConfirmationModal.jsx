import { Modal ,Button} from "react-bootstrap"

const ConfirmationModal = ({showDelete,handleDeleteClose, handleItemDelete,msg}) =>{
    return(
        <Modal
                show={showDelete}
                onHide={handleDeleteClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {msg}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleItemDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
    )
}

export default ConfirmationModal;