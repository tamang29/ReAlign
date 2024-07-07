import { InputGroup, Form, Row, Col, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'


const SearchBar = ({handleSearch, changeShow, filterVisible,
    handleFilterVisible, handleStatusChange, handlePriorityChange,
    handleFromDateChange, handleToDateChange ,handleClearFilter, status,
priority, from ,to}) =>{

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
                <Button className="realign-button" onClick={changeShow}>Add a Project</Button>
            </Col>
        </Row>
        <Row className="align-items-center">
            {filterVisible && (
                <>
               <Col md={2}>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select size="sm" id="status" name="status" value={status} onChange={handleStatusChange}>
                        <option value="" disabled >--choose--</option>
                        <option value="Design">Design</option>
                        <option value="Testing">Testing</option>
                        <option value="Deployed">Deployed</option>
                        <option value="Done">Done</option>
                    </Form.Select>
               </Col>
               <Col md={2}>
                    <Form.Label>Priority:</Form.Label>
                    <Form.Select size="sm" id="priority" name="priority" value={priority} onChange={handlePriorityChange}>
                        <option value="" disabled >--choose--</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>

                    </Form.Select>
                </Col>
               <Col md={4}>
                    <Row>
                        <Col>
                        From:<Form.Control type="date" value={from} onChange={handleFromDateChange}/>
                        </Col>
                        <Col>
                        To:<Form.Control type="date" value={to} onChange={handleToDateChange}/>
                        </Col>
                    </Row>
               </Col>
               <Col md={2}>
                <Button className="mt-3 realign-button" onClick={handleClearFilter}>Clear</Button>
                </Col>
               </>
            )}
        </Row>
        </>
    )
}

export default SearchBar;