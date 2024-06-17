import { InputGroup, Form, Row, Col, Button } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

const SearchBar = () =>{

    const [searchText, setSearchText] = useState('');

    const handleProjectPress = () =>{
        console.log("Add a project press.")
    }

    const handleSearch = (event) =>{
        setSearchText(event.target.value)
        console.log(searchText)
    }

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
                <Button style={{backgroundColor: "rgb(62,30,65)"}} onClick={handleProjectPress}>Add a Project</Button>
            </Col>
        </Row>
        </>
    )
}

export default SearchBar;