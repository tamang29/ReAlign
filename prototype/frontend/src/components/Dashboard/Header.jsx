import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


const Header = (props) =>{
    const title = props.title;
    return(
        <Row>
            <Col className="pt-5 px-3 pb-3">
                <span style={{fontSize: 20, fontWeight: 'bold'}}>{title}</span>
            </Col>
            <hr/>
        </Row>
    )
}

export default Header;