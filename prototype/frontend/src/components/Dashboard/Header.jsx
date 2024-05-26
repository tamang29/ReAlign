import { useState } from "react";
import { Container, Row } from "react-bootstrap";


const Header = (props) =>{
    const title = props.title;
    return(
        <div>
            <Row className="pt-5 px-3">
                <span style={{fontSize: 20, fontWeight: 'bold'}}>{title}</span>
            </Row>
            <hr/>
        </div>
    )
}

export default Header;