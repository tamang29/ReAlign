import { Badge, Col, Row, Table, Image, Dropdown } from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBell} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

const ProjectList = () =>{
    const navigate = useNavigate();
    const handleProjectClick = () =>{
      navigate('/dashboard/requirements')
    }
    return(
        <Row>
            <Col md={11}>
        <Table responsive="md" hover size="sm" className="project-table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Deadline</th>
            <th>Owner</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={handleProjectClick}>
            <td>1</td>
            <td><FontAwesomeIcon icon={faBell} className='mx-2' />Video Conferencing App</td>
            <td><Badge bg="white" className="text-black">Design</Badge></td>
            <td><Badge bg="danger" className="text-white">High</Badge></td>
            <td>01.06.2024</td>
            <td><Image src="holder.js/200x180" roundedCircle alt="owner"/></td>
            <td>
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    ...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Description</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Users</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Web App</td>
            <td><Badge bg="white" className="text-black">Design</Badge></td>
            <td><Badge bg="warning" className="text-white">Medium</Badge></td>
            <td>01.06.2024</td>
            <td><Image src="holder.js/200x180" roundedCircle alt="owner"/></td>
            <td>
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    ...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Description</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Users</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Ecommerce App</td>
            <td><Badge bg="white" className="text-black">Design</Badge></td>
            <td><Badge bg="white" className="text-black">Low</Badge></td>
            <td>01.06.2024</td>
            <td><Image src="holder.js/200x180" roundedCircle alt="owner"/></td>
            <td>
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    ...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Description</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Users</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </td>
          </tr>
        </tbody>
      </Table>
      </Col>
      </Row>
    )
}

export default ProjectList;