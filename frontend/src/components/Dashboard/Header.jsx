import { Col, Row } from "react-bootstrap";


const Header = (props) =>{
    const title = props.title;
    return(
        <Row>
            <Col className="p-3">
                <span style={{fontSize: 20, fontWeight: 'bold'}}>{title}</span>
            </Col>
            <hr/>
        </Row>
    )
}

export default Header;