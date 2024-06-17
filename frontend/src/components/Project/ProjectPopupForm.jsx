import { useState } from "react";
import {Row, Col, Button, Form, Modal, Toast,ToastContainer,ListGroup} from 'react-bootstrap';
import { createProject } from "../../services/projectService";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ProjectPopupForm = ({show, handleFormClose, updateProjects, users}) =>{

    const [selectedUser, setSelectedUser] = useState([]);
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
    const [validationMessage, setValidationMessage] = useState('');

    //selected user to invite

    const [dropdownVisible, setDropdownVisible] = useState(false);

    //notify changes to input field and update formData
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // call create project service
    const handleFormSubmit = async(e) =>{
        e.preventDefault();
        if(!formData.name || !formData.createdBy || !formData.status || !formData.deadline || !formData.priority){
            setValidationMessage("Please complete all necessary fields.")
            return;
        }

        try{
            console.log(formData)
            console.log(selectedUser)
            const project = await createProject(formData);
            handleFormClose();
            updateProjects(project);
            setShowToast(true);
            setSelectedUser([]);
            setFormData([]);
        }catch(error){
            console.error("Error creating project." +error);
        }
    }

    //handle user invite field focus
    const handleUserFocus = () => {
        if (users.length > 0) {
          setDropdownVisible(true);
        }
      };

    const handleUserBlur = () => {
    setDropdownVisible(false);
    };

    const handleSelectedUser = (user) =>{
            if(selectedUser.some(item => item._id === user._id)){
            setDropdownVisible(false);
            }else{
            setSelectedUser([...selectedUser, {...user, role: ''}]);
            setFormData(prevFormData => ({
                ...prevFormData,
                users: [...prevFormData.users, {member: user._id, role: ''}]
            }));
            setDropdownVisible(false);

            }
    }

    //on remove button click remove user from selected user list and form data
    const handleRemoveUser = (id)=>{
        setSelectedUser(selectedUser.filter(user => user._id !== id));
        setFormData(prevFormData => ({
            ...prevFormData,
            users: prevFormData.users.filter(user => user.member !== id)
        }));
    }

    const handleRoleChange = (user, role) =>{
        setSelectedUser(prevSelectedUser => {
            const updatedUser = prevSelectedUser.map(u=>{
                if(u._id === user._id ){
                    return{ ...u, role}
                }
                return u;
            });
            return updatedUser;
        })

        setFormData(prevFormData => ({
            ...prevFormData,
            users: prevFormData.users.map(u =>{
                if(u.member === user._id){
                    return{ ...u, role}
                }
                return u;
            })
        }))
    }

    return(
        <>
        <Modal show={show} onHide={handleFormClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title >Add a Project</Modal.Title>
        </Modal.Header>
        <Form.Text className="mx-3">
            Fields marked with * are mandatory.
        </Form.Text>
        <Form onSubmit={handleFormSubmit} className="m-4">
            <Row>
                <Col md={6}>
                    {validationMessage && <span className="text-danger fs-6">{validationMessage}</span>}
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>*Project Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        />
                    </Form.Group>

                    <Form.Group controlId="formStatus" className="mb-3">
                        <Form.Label>*Status</Form.Label>
                        <Form.Control
                        as="select"
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        required
                        >
                        <option>--select--</option>
                        <option>Design</option>
                        <option>Testing</option>
                        <option>Deployed</option>
                        <option>Done</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPriority" className="mb-3">
                        <Form.Label>*Priority</Form.Label>
                        <Form.Control
                        as="select"
                        name="priority"
                        value={formData.priority}
                        onChange={handleFormChange}
                        required
                        >
                        <option>--select--</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    />
                </Form.Group>


                </Col>
                <Col md={6}>
                <Form.Group controlId="formDeadline" className="mb-3">
                <Form.Label>*Deadline</Form.Label>
                <Form.Control
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleFormChange}
                required
                />
                </Form.Group>

                <Form.Group controlId="formUser" className="mb-3">
                        <Form.Label>Invite Team Members</Form.Label>
                        <Form.Control
                        type="text"
                        name="users"
                        onFocus={handleUserFocus}
                        onBlur={handleUserBlur}

                        />
                </Form.Group>

                {dropdownVisible && (
                    <ListGroup
                    style={{
                        height: '10rem',
                        overflowY: 'scroll'
                    }}
                    >
                    {users.map((user, index) => (
                        <ListGroup.Item
                        key={user._id}
                        onMouseDown={(e) => e.preventDefault()} // Prevent blur on item click
                        onClick={() => handleSelectedUser(user)}
                        style={{ cursor: 'pointer', fontSize: 12}}
                        action
                        >
                        {user.email}

                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                )}

                {selectedUser.length > 0 && (
                        <div className="mt-3">
                        <h6>Selected Team Members:</h6>
                        <ListGroup>
                            {selectedUser.map(user => (
                            <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center" style={{fontSize:12}}>
                                {user.email}
                                <Form.Control
                                as="select"
                                name="role"
                                onChange={(e) => handleRoleChange(user, e.target.value)}
                                required
                                className="w-25"
                                >
                                <option>-select-</option>
                                <option>Owner</option>
                                <option>Editor</option>
                                <option>Reader</option>
                                </Form.Control>
                                <Button variant="danger" size="sm" onClick={() => handleRemoveUser(user._id)}><FontAwesomeIcon icon={faTrash} className="mx-2"/></Button>
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                        </div>
                    )}

                </Col>
            </Row>
            <Modal.Footer className="mt-3">
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
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