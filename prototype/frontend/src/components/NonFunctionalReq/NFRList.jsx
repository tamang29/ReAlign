import { Badge, Col, Row, Table, Image,Button, Dropdown, ButtonGroup } from "react-bootstrap";


const NFRList = () =>{
    return(
        <>
        <Row className="justify-content-md-end my-3">
            <Col md={3}>
            <Dropdown as={ButtonGroup}>
                <Button>Add a requirement</Button>
                <Dropdown.Toggle split id="dropdown-split-basic" />

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </Col>
        </Row>
        <Row>
        <Col md={11}>
        <Table responsive="md" hover size="sm" className="project-table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Title</th>
            <th>Last Edited</th>
            <th>Re-Type</th>
            <th>Owner</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Access Control Matrix</td>
            <td>01.06.2024</td>
            <td><Badge bg="white" className="text-black">Security</Badge></td>
            <td><Image src="holder.js/200x180" roundedCircle alt="owner"/></td>
            <td><Button variant="outline-light" className="border-dark text-dark">Edit</Button></td>
          </tr>
        </tbody>
      </Table>
      </Col>
      </Row>
      </>
    )
}

export default NFRList;