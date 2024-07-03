import { InputGroup, Form, Row, Col, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'


const SearchBar = ({handleAddProject, handleSearch, changeShow, filterVisible, handleFilterVisible}) =>{


    return(
        <>
        <Row>
            <Col xs={5}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm"><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
                    <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Search Projects..."
                    className="rounded-end"
                    onChange={handleSearch}
                    />
                    <Button onClick={handleFilterVisible} variant="light" className="mx-3 rounded"><FontAwesomeIcon icon={faFilter} className="ms-1 me-2"/>Filter</Button>
                </InputGroup>
            </Col>
            <Col xs={6} align="right">
                <Button style={{backgroundColor: "rgb(62,30,65)"}} onClick={changeShow}>Add a Project</Button>
            </Col>
        </Row>
        <Row className="align-items-center">
            {filterVisible && (
                <>
               <Col md={2}>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select size="sm" id="status" name="status">
                        <option>--choose--</option>
                        <option>Design</option>
                        <option>Testing</option>
                        <option>Deployed</option>
                        <option>Done</option>
                    </Form.Select>
               </Col>
               <Col md={2}>
                    <Form.Label>Priority:</Form.Label>
                    <Form.Select size="sm" id="priority" name="priority">
                        <option>--choose--</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>

                    </Form.Select>
                </Col>
               <Col md={4}>
                    <Row>
                        <Col>
                        From:<Form.Control type="date" />
                        </Col>
                        <Col>
                        To:<Form.Control type="date" />
                        </Col>
                    </Row>
               </Col>
               </>
            )}
        </Row>
        </>
    )
}

export default SearchBar;