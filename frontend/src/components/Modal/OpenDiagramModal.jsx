import { useEffect } from "react";
import { Modal,ListGroup } from "react-bootstrap"

const OpenDiagramModal = ({diagrams, closeOpenDiagramModal, openDiagram}) =>{
    return(
        <Modal show onHide={closeOpenDiagramModal}>
                <Modal.Header closeButton>
                <Modal.Title>Your recent diagrams</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <ListGroup>
                        {diagrams.length > 0 ? (
                                diagrams.map((diagram) => (
                                    <ListGroup.Item
                                        key={diagram._id}
                                        action
                                        onClick={() => openDiagram(diagram)}
                                    >
                                        {diagram.fileName}
                                        <br/>
                                        <small>Last updated at: {diagram.updatedAt}</small>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item>No diagrams found.</ListGroup.Item>
                        )}
                        </ListGroup>
                </Modal.Body>
            </Modal>
    )
}

export default OpenDiagramModal;