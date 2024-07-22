import { useContext, useEffect, useState } from "react";
import {Row, Col, Button, Form, Modal, Toast,ToastContainer,ListGroup} from 'react-bootstrap';
import { createProject } from "../../services/projectService";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToastMessage from "../Modal/ToastMessage";
import UserContext from "../../context/UserContext";
import '../../styles/Dashboard.css';


const ProjectPopupForm = ({show, handleFormClose, updateProjects, users, hasOrganization}) =>{

    const [user, organization, subscription, photo] = useContext(UserContext);
    //form data
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        createdBy: '',
        status: '',
        deadline: '',
        priority: '',
        users: []
      });

    //selected user list. When users are added while project is created.
    const [selectedUser, setSelectedUser] = useState([]);
    //toast state
     const [showToast, setShowToast] = useState(false);
     const [toastHeader, setToastHeader] = useState('');
     const [toastBody, setToastBody] = useState('');
    //validate the form data
    const [validationMessage, setValidationMessage] = useState('');

    // show selected users in a list
    const [dropdownVisible, setDropdownVisible] = useState(false);
    // search user text state
    const [searchUser, setSearchUser] = useState();
    //filtered users based on search input
    const [filteredUsers, setFilteredUsers] = useState(users);

    //notify changes to input field and update formData
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(()=>{
        if(user){
            setFormData(prevFormData => ({
                ...prevFormData,
                createdBy: user._id
            }));
        }
    },[user])
    // call create project service
    const handleFormSubmit = async(e) =>{
        e.preventDefault();
        if(!formData.name || !formData.createdBy || !formData.status || !formData.deadline || !formData.priority){
            setValidationMessage("Please complete all necessary fields.")
            return;
        }

        try{
            const project = await createProject(formData);
            handleFormClose();
            updateProjects(project);
            setShowToast(true);
            setSelectedUser([]);
            setFormData([]);
            //set Toast for successful creation of project
            setToastBody('Project created successfully!');
            setToastHeader('Success');
            setShowToast(true);
        }catch(error){
            setToastHeader('Error')
            setToastBody('Failed to create project. Please try again.');
            setShowToast(true);
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

    const handleCloseToast = () =>{
        setShowToast(false);
      }

    //filter the userslist based on input
    const handleFilterUsers = (searchValue) =>{
        let filtered = users.filter(user =>
            user.email.toLowerCase().includes(searchValue)
        );

        setFilteredUsers(filtered);
    }
    //handle search user
    const handleFilterSearchedUser = (event) =>{
        const searchValue = event.target.value.toLowerCase();
        setSearchUser(searchValue);
        handleFilterUsers(searchValue);
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

                {hasOrganization ? (
                    <Form.Group controlId="formUser" className="mb-3">
                        <Form.Label>Invite Team Members</Form.Label>
                        <Form.Control
                            type="text"
                            name="users"
                            onFocus={handleUserFocus}
                            onBlur={handleUserBlur}
                            onChange={handleFilterSearchedUser}
                        />
                        {dropdownVisible && (
                            <ListGroup
                                style={{
                                    height: '10rem',
                                    overflowY: 'scroll'
                                }}
                            >
                                {filteredUsers.map((user) => (
                                    <ListGroup.Item
                                        key={user._id}
                                        onMouseDown={(e) => e.preventDefault()} // Prevent blur on item click
                                        onClick={() => handleSelectedUser(user)}
                                        style={{ cursor: 'pointer', fontSize: 12 }}
                                        action
                                    >
                                        {user.email}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Form.Group>
                ) : null}




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
                                <Button variant="danger"  size="sm" onClick={() => handleRemoveUser(user._id)}><FontAwesomeIcon icon={faTrash} className="mx-2"/></Button>
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
      {showToast && <ToastMessage
                header={toastHeader}
                body={toastBody}
                handleCloseToast={handleCloseToast}
                style={{color: 'black'}}
         />}
    </>
    )
}

export default ProjectPopupForm;