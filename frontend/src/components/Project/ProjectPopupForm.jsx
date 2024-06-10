import { useState } from "react";
import {Row, Col, Button, Form, Modal, Toast,ToastContainer} from 'react-bootstrap';
import { createProject } from "../../services/projectService";


const ProjectPopupForm = ({show, handleClose, updateProjects}) =>{
    //form data
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        createdBy: '664cf4de7e3db63be5771215',
        status: '',
        deadline: '',
        priority: '',
        users: []
      });
    const [showToast, setShowToast] = useState(false);

    //notify changes to input field and update formData
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // call create project service
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
        const project = await createProject(formData);
        handleClose();
        updateProjects(project);
        setShowToast(true);
        }catch(error){
            console.error("Error creating project." +error);
        }
    }

    return(
        <>
        <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title >Add a Project</Modal.Title>
        </Modal.Header>
        <Form.Text className="mx-3">
            Fields marked with * are mandatory.
        </Form.Text>
        <Form onSubmit={handleSubmit} className="m-4">
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>*Project Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>

                    <Form.Group controlId="formStatus" className="mb-3">
                        <Form.Label>*Status</Form.Label>
                        <Form.Control
                        as="select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        >
                        <option>Design</option>
                        <option>Testing</option>
                        <option>Deployed</option>
                        <option>Done</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPriority">
                        <Form.Label>*Priority</Form.Label>
                        <Form.Control
                        as="select"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        required
                        >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        </Form.Control>
                    </Form.Group>


                </Col>
                <Col md={6}>
                <Form.Group controlId="formDeadline" className="mb-3">
                <Form.Label>*Deadline</Form.Label>
                <Form.Control
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formUser" className="mb-3">
                        <Form.Label>Invite Team Members</Form.Label>
                        <Form.Control
                        type="text"
                        name="users"
                        value={formData.users}
                        onChange={handleChange}
                        required
                        />
                </Form.Group>
                </Col>
            </Row>
            <Modal.Footer className="mt-3">
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Project</strong>
          </Toast.Header>
          <Toast.Body>Project created successfully</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
    )
}

export default ProjectPopupForm;