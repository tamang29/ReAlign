import { InputGroup, Form, Row, Col, Button } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'


const SearchBar = ({handleAddProject, handleSearch, changeShow}) =>{


    return(
        <>
        <Row className="mb-5">
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
                    <Button variant="light" className="mx-3 rounded"><FontAwesomeIcon icon={faFilter} className="ms-1 me-2"/>Filter</Button>
                </InputGroup>

            </Col>
            <Col xs={6} align="right">
                <Button style={{backgroundColor: "rgb(62,30,65)"}} onClick={changeShow}>Add a Project</Button>
            </Col>
        </Row>
        </>
    )
}

export default SearchBar;