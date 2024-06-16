import { Col, Row } from "react-bootstrap";


const Header = (props) =>{
    const title = props.title;
    return(
        <Row style={{backgroundColor: 'rgb(219, 231, 234)'}}>
            <Col className="p-3">
                <span style={{fontSize: 20, fontWeight: 'bold'}}>{title}</span>
            </Col>
            <hr/>
        </Row>
    )
}

export default Header;