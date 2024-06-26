import { Button, Col, Container ,Form,Row, ListGroup, Toast,ToastContainer, Modal} from "react-bootstrap";
import Header from "../Dashboard/Header";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../../services/projectService";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllUsers } from "../../services/userService";



const ProjectDetail = () =>{
    const [project, setProject] = useState({
        _id: '',
        name: '',
        description: '',
        createdBy: '',
        status: '',
        deadline: '',
        priority: '',
        users: [],
        updatedAt: ''
    });
    //fieldset is disabled by default: User need to press edit button
    const [isDisabled, setIsDisabled] = useState(true);
    //save button is disabled until user edits any field
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const {projectId} = useParams();
    const [showDelete, setDeleteShow] = useState(false);

    //user id to delete
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    //selected user to invite

    const [dropdownVisible, setDropdownVisible] = useState(false);

    //user list
    const [userList, setUserList] = useState(null);

    // get project data with id
    useEffect(()=>{
        const fetchProjectById = async () =>{
            try{
            const projectData = await getProjectById(projectId);
            setProject(projectData)
            }catch(error){
                console.error("Error fetching project data." +error)
            }
        }
        const fetchUsers = async () =>{
            try{
                const userList = await getAllUsers();
                setUserList(userList);
            }catch(error){
                console.error("Error fetching users." +error);
            }
        }
        fetchProjectById();
        fetchUsers();
    },[projectId])


    const handleEditButton = () =>{
        setIsDisabled(false)
    }

    //if user changes input field value
    const handleProjectDetailChange = (e, userId) =>{
        const { name, value } = e.target;
        if(project[name] !== value){ //if value is changed by the user.
            setIsSaveDisabled(false);
            setProject({ ...project, [name]: value });
        }
        if(name === "role"){ //if the user changes role of team member.
            setProject(prevProject =>({
                ...prevProject,
                users: prevProject.users.map(u=>{
                    if(u.member._id === userId){
                       return {...u, [name]: value};
                    }
                    return u;
                })
            }))
        }
    }


    const saveChanges = async(project) =>{
        try{
        await updateProject(project);
        setIsDisabled(true);
        setShowToast(true);
        }catch(error){
            console.log(error);
        }
    }
    //delete form modal
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = (userId) => {
        setUserIdToDelete(userId)
        setDeleteShow(true);
    }

    const handleUserDelete = async () =>{
        if(userIdToDelete){
            console.log(userIdToDelete)

            const updatedProject = {
                ...project,
                users: project.users.filter(user => user.member._id !== userIdToDelete)
            }
            setProject(updatedProject)
            try{
                //console.log(project)
                setIsSaveDisabled(false);

            }catch(error){
                console.error("Error while deleting user."+error);
            }
            setDeleteShow(false);
        }
    }

    //When user wants to add new user
    const handleUserFocus = () => {
        if (project.users.length > 0) {
          setDropdownVisible(true);
        }
      };

    const handleUserBlur = () => {
    setDropdownVisible(false);
    };

    //add user
    const handleAddUser = (e, user) =>{
        e.preventDefault();
        console.log("add users")
        if (!project.users.some(u => u.member._id === user._id)) {
            setProject(prevProject => ({
                ...prevProject,
                users: [...prevProject.users, {member: user, role:''}]
            }))
            setDropdownVisible(false)
            console.log(project)
        }
    }


    return(
        <Container fluid>
            <BreadCrumbRow/>
            <Header title="Project Detail"/>
            <Form>
                    <Row className="m-3">
                        <Col md={8}>
                        <fieldset disabled={isDisabled}>
                            <Row>
                            <Col md={6}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={project.name}
                                        onChange={handleProjectDetailChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formStatus" className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                    as="select"
                                    name="status"
                                    value={project.status}
                                    onChange={handleProjectDetailChange}
                                    >
                                    <option>--select--</option>
                                    <option>Design</option>
                                    <option>Testing</option>
                                    <option>Deployed</option>
                                    <option>Done</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formPriority" className="mb-3">
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Control
                                    as="select"
                                    name="priority"
                                    value={project.priority}
                                    onChange={handleProjectDetailChange}
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
                                    value={project.description}
                                    onChange={handleProjectDetailChange}
                                    rows={5}
                                    cols={50}
                                />
                                </Form.Group>
                                <Form.Group controlId="formSaveChanges" className="mb-3">
                                    <Button variant="primary" size="sm" disabled={isSaveDisabled} onClick={()=>saveChanges(project)}>Save Changes</Button>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formId" className="mb-3">
                                    <Form.Label>Project Id</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="projectId"
                                        value={project._id}
                                        onChange={handleProjectDetailChange}
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDeadline" className="mb-3">
                                    <Form.Label>Deadline</Form.Label>
                                    <Form.Control
                                    type="date"
                                    name="deadline"
                                    onChange={handleProjectDetailChange}
                                    required
                                    />
                                    </Form.Group>


                                <Form.Group controlId="formMember">
                                     <Form.Label>Team Members </Form.Label>
                                     <Form.Control
                                        type="text"
                                        name="users"
                                        onFocus={handleUserFocus}
                                        onBlur={handleUserBlur}

                                    />


                                        {dropdownVisible && (
                                            <ListGroup
                                            style={{
                                                height: '10rem',
                                                overflowY: 'scroll'
                                            }}
                                            >
                                            {userList.map((user, index) => (
                                                <ListGroup.Item
                                                key={user._id}
                                                name="role"
                                                onMouseDown={(e) => e.preventDefault()} // Prevent blur on item click
                                                style={{ cursor: 'pointer', fontSize: 12}}
                                                onClick={(e)=>handleAddUser(e, user)}
                                                action
                                                >
                                                {user.email}

                                                </ListGroup.Item>
                                            ))}
                                            </ListGroup>
                                        )}
                                        <ListGroup
                                        style={{
                                            height: '10rem',
                                            overflowY: 'scroll'
                                        }}
                                        >
                                        {project.users && project.users.map((user) => (
                                            <ListGroup.Item key={user.member._id} className="d-flex justify-content-between align-items-center" style={{fontSize:12}}>
                                            {user.member.firstName}  {user.member.lastName}<br/>
                                            {user.member.email}

                                            <Form.Control
                                            as="select"
                                            onChange={(e)=>handleProjectDetailChange(e, user.member._id)}
                                            name="role"
                                            value={user.role}
                                            className="w-25"
                                            style={{fontSize:12}}
                                            >
                                            <option>--select--</option>
                                            <option>Owner</option>
                                            <option>Editor</option>
                                            <option>Reader</option>
                                            </Form.Control>

                                            <Button variant="danger" size="sm" onClick={() => handleDeleteShow(user.member._id)}><FontAwesomeIcon icon={faTrash} className="mx-2"/></Button>
                                            </ListGroup.Item>

                                        ))}
                                        </ListGroup>
                                </Form.Group>

                            </Col>
                            </Row>
                        </fieldset>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formCreatedBy" className="mb-3">
                                    <Form.Label>Created By:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="createdBy"
                                        value={project.createdBy}
                                        disabled
                                    />
                                    </Form.Group>
                                    <Form.Group controlId="formLastUpdated" className="mb-3">
                                    <Form.Label>Last Updated At:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastUpdated"
                                        value={project.updatedAt}
                                        disabled
                                    />
                                    </Form.Group>
                                </Col>
                                <Col xs="auto">
                                    <Button onClick={handleEditButton}>Edit</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
            </Form>
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
            <Toast show={showToast} onClose={() => setShowToast(false)}>
            <Toast.Header>
                <strong className="me-auto">Project</strong>
            </Toast.Header>
            <Toast.Body>Project updated successfully</Toast.Body>
            </Toast>
            </ToastContainer>
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
                You are about to <strong>remove</strong> user from this project.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleUserDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )

}

export default ProjectDetail;