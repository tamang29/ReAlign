import { Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faHouse, faGear} from "@fortawesome/free-solid-svg-icons"

const SideBarItems = () =>{

    return(
        <Col className="sidebar-items">
            <Nav className="flex-column">
                <NavLink to="/dashboard" end><FontAwesomeIcon icon={faHouse} className="mx-2"/>Your Workspace</NavLink>
                <NavLink to="/dashboard/settings"><FontAwesomeIcon icon={faGear} className='mx-2' />Settings</NavLink>
            </Nav>
        </Col>
    )
}

export default SideBarItems;