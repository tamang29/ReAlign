import { Button, Col, Container ,Form,Row, ListGroup, Toast,ToastContainer, Modal} from "react-bootstrap";
import Header from "../Dashboard/Header";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../../services/projectService";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



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
        fetchProjectById();
    },[projectId])

    const handleEditButton = () =>{
        setIsDisabled(false)
    }

    //if user changes input field value
    const handleProjectDetailChange = (e, userId) =>{
        const { name, value } = e.target;
        if(project[name] !== value){
            setIsSaveDisabled(false);
            setProject({ ...project, [name]: value });
        }
        if(name === "role"){
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


    const saveChanges = async() =>{
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
    const handleDeleteShow = () => setDeleteShow(true);

    const handleUserDelete = () =>{

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
                                    <Button variant="primary" size="sm" disabled={isSaveDisabled} onClick={saveChanges}>Save Changes</Button>
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
                                     <Form.Label>Team Members</Form.Label>
                                        <ListGroup
                                        style={{
                                            height: '10rem',
                                            overflowY: 'scroll'
                                        }}
                                        >
                                        {project.users.map((user) => (
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

                                            <option>Owner</option>
                                            <option>Editor</option>
                                            <option>Reader</option>
                                            </Form.Control>

                                            <Button variant="danger" size="sm" onClick={() => handleDeleteShow()}><FontAwesomeIcon icon={faTrash} className="mx-2"/></Button>
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