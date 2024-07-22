import { Modal ,Button, Form, Col, Row, ListGroup} from "react-bootstrap";
import { useEffect ,useState, useRef} from "react";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { getAllUsers } from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { createUserStory } from "../../services/userStoryService";
import ToastMessage from "../Modal/ToastMessage";

const UserStoryModal = ({show, closeUserStoryModal,projectId, handleShowToast}) =>{
    const editorRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [content, setContent] = useState('');
    //user state
    const [users, setUsers] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [assignee, setAssignee] = useState('');

   


    useEffect(() => {

        const getUsers = async() =>{
            const user = await getAllUsers();
            setUsers(user);
        }
        getUsers();
        if (editorRef.current) {
        const quill = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block']
            ]
            }
        });
        setEditor(quill);
        setContent('As a [role], I want [capability], so that [reason].')
        // Handle text change event
        quill.on('text-change', () => {
            setContent(quill.root.innerHTML);
        });
        }
    }, []);

    const handleUserFocus = () => {
        if (users.length > 0) {
        setDropdownVisible(true);
        }
    };

    const handleUserBlur = () => {
    setDropdownVisible(false);
    };

    const assignUser = (user) =>{
        setAssignee(user);
        setDropdownVisible(false);
    }

    //on form submit
    const createNewUserStory = async(event) =>{
        event.preventDefault();
        const title = event.target.formUserStoryTitle.value;
        const priority = event.target.formUserStoryPriority.value;
       const userStory = {
            title: title,
            content: content,
            projectId: projectId,
            createdBy: '664cf4de7e3db63be5771215',
            priority: priority,
            assignee: assignee._id
       }
       await createUserStory(userStory);
       handleShowToast();
       closeUserStoryModal();
    }



    return(
        <Modal
        size="lg"
        show={show}
        aria-labelledby="example-modal-sizes-title-lg"
        onHide={closeUserStoryModal}
        >
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">
            New User Story
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={createNewUserStory} >
          <Form.Group className="mb-3" controlId="formUserStoryTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserStoryDescription">
            <Form.Label>Description</Form.Label>
            <div ref={editorRef} style={{ height: '150px', marginBottom: '20px' }}>
                As a [role], I want [capability], so that [reason].
            </div>
          </Form.Group>

        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formUserStoryPriority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select" required>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formUserStoryAssignee">
                    <Form.Label>Assignee</Form.Label>
                    <Form.Control type="text" placeholder="Enter assignee"
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
                    {users.map((user) => (
                        <ListGroup.Item
                        key={user._id}
                        onMouseDown={(e) => e.preventDefault()} // Prevent blur on item click
                        onClick={() => assignUser(user)}
                        style={{ cursor: 'pointer', fontSize: 12}}
                        action
                        >
                        {user.email}

                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                )}
                {assignee && (
                   <ListGroup>
                   <ListGroup.Item key={assignee._id} className="d-flex justify-content-between align-items-center" style={{fontSize:12}}>
                       {assignee.email}
                       <Button variant="danger" size="sm" onClick={() => setAssignee(null)}><FontAwesomeIcon icon={faTrash} className="mx-2"/></Button>
                   </ListGroup.Item>
               </ListGroup>
                )}
            </Col>
        </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    )
}

export default UserStoryModal;