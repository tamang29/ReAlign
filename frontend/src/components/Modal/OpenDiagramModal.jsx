import { useEffect } from "react";
import { Modal, Button,ListGroup } from "react-bootstrap"

const OpenDiagramModal = ({diagrams, closeOpenDiagramModal, viewDiagram}) =>{
    return(
        <Modal show onHide={closeOpenDiagramModal}>
                <Modal.Header closeButton>
                <Modal.Title>Your recent diagrams</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <ListGroup>
                        {diagrams.map((diagram) => (
                            <ListGroup.Item
                            key={diagram._id}
                            action
                            onClick={() => viewDiagram(diagram)}
                            >
                            {diagram.fileName}
                            <br/>
                            <small>Last updated at: {diagram.updatedAt}</small>
                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                </Modal.Body>
            </Modal>
    )
}

export default OpenDiagramModal;