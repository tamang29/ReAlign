import { useEffect } from "react";
import { Modal,ListGroup } from "react-bootstrap"
import { formatDate } from "../../services/dateConvertService";

const VersionModal = ({diagrams, closeOpenDiagramModal, openVersion}) =>{

    const sortedVersions = diagrams.versions.slice().sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    return(
        <Modal show onHide={closeOpenDiagramModal}>
                <Modal.Header closeButton>
                <Modal.Title>Your recent versions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <ListGroup>
                        {sortedVersions.length > 0 ? (
                                sortedVersions.map((diagram) => (
                                    <ListGroup.Item
                                        key={diagram._id}
                                        action
                                        onClick={() => openVersion(diagram)}
                                    >
                                        {diagrams.fileName}
                                        <br/>
                                        <small>Last updated at: { formatDate(diagram.updatedAt) }</small>
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

export default VersionModal;