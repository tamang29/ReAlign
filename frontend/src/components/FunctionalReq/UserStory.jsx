import { Container, Button, Row,Col, Badge, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserStoryModal from "../Modal/UserStoryModal";
import { useEffect, useState } from "react";
import ToastMessage from "../Modal/ToastMessage";
import { getAllUserStory } from "../../services/userStoryService";

const UserStory = ({projectId}) =>{
    //user stories
    const [userStories, setUserStories] = useState([]);
    const [showModal, setShowModal] = useState(false);
     //toast state
     const [showToast, setShowToast] = useState(false);

    //fetch user stories
    useEffect(()=>{
        const getUserStory = async() =>{
            const userStories = await getAllUserStory(projectId);
            setUserStories(userStories)
        }
        getUserStory();

    },[])

    const showUserStoryModal = () =>{
        setShowModal(true);
    }
    const closeUserStoryModal = () =>{
        setShowModal(false);
    }
    const handleCloseToast = () =>{
        setShowToast(false);
    }
    const handleShowToast = () =>{
        setShowToast(true)
    }

    return(
            <>
            {showModal && <UserStoryModal show={showModal} closeUserStoryModal={closeUserStoryModal} projectId={projectId} handleShowToast={handleShowToast}/>}
            <Row>
                <Col>
                <span style={{fontSize: 20, fontWeight: 'bold'}}>User stories <Badge bg="secondary">{userStories.length}</Badge></span>
                </Col>
            </Row>
            <Row className="my-5">
            <Card style={{ width: '10rem' }} onClick={showUserStoryModal}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title>Create New</Card.Title>
                    <FontAwesomeIcon icon={faPlus} style={{fontSize:60}}/>
                </Card.Body>
            </Card>
            {userStories.map(userStory => (
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{userStory.title}</Card.Title>
                    <Card.Text>
                    {userStory.assignedTo}
                    </Card.Text>
                    <Card.Text>
                    <Badge bg="light" text="dark">
                    {userStory.priority}
                    </Badge>
                    </Card.Text>
                </Card.Body>
            </Card>
            ))}
            {showToast && <ToastMessage
                header="Success"
                body="User story created successfully"
                handleCloseToast={handleCloseToast}
         />}
            </Row>
            </>
    )
}

export default UserStory;