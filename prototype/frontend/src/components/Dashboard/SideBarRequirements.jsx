import { Col, Row, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom"

const SideBarRequirements = () =>{
    let navigate = useNavigate();

    return(
        <>
        <Col className="sidebar-items">
            <Row style={{padding: "0.3em 2.5em", fontWeight: 800}}>
                Functional
            </Row>
        <Nav defaultActiveKey={'/dashboard/requirements'} className="flex-column">
            <NavLink to="/dashboard/requirements/elicitation">Re Elicitation</NavLink>
            <NavLink to="/dashboard/requirements/specification">Re Specification</NavLink>
            <NavLink to="/dashboard/requirements/modeling">Re Modeling</NavLink>
        </Nav>
        <Row style={{padding: "0.8em 2.5em", fontWeight:800}} role='button' onClick={()=>navigate("/dashboard/requirements/nfr")}>
                Non Functional
        </Row>
    </Col>
    </>
    )
}

export default SideBarRequirements;