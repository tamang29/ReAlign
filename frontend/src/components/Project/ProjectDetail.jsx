import { Button, Col, Container ,Form,Row, ListGroup, Card} from "react-bootstrap";
import Header from "../Dashboard/Header";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../services/projectService";
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
        users: []
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const {projectId} = useParams();

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

    //if user change input field value
    const handleProjectDetailChange = () =>{

    }

    const handleRemoveUser = (id) =>{

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
                                    <Form.Label>*Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={project.name}
                                        onChange={handleProjectDetailChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formStatus" className="mb-3">
                                    <Form.Label>*Status</Form.Label>
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
                                    <Form.Label>*Priority</Form.Label>
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
                                />
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
                                    <Form.Label>*Deadline</Form.Label>
                                    <Form.Control
                                    type="date"
                                    name="deadline"
                                    onChange={handleProjectDetailChange}
                                    required
                                    />
                                    </Form.Group>

                                <Form.Group controlId="formUser">
                                     <Form.Label>Team Members</Form.Label>
                                <ListGroup
                                style={{
                                    height: '10rem',
                                    overflowY: 'scroll'
                                }}
                                >
                                {project.users.map((user, index) => (
                                    <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center" style={{fontSize:12}}>
                                     {user.firstName}  {user.lastName}<br/>
                                    {user.email}
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveUser(user._id)}><FontAwesomeIcon icon={faTrash} className="mx-2" key={user._id}/></Button>
                                    </ListGroup.Item>
                                ))}
                                </ListGroup>
                                </Form.Group>
                            </Col>
                            </Row>
                        </fieldset>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Row>
                                <Col xs="auto">
                                    <Button onClick={handleEditButton}>Edit</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
            </Form>
        </Container>
    )

}

export default ProjectDetail;