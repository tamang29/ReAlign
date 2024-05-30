import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/Dashboard/SideBar";
import Project from "../components/Project/Project";
import Settings from "./Settings";
import '../styles/style.css';
import { Route, Routes } from "react-router-dom";


const Dashboard = () =>{
    return(

       <Container fluid className="dashboard-container p-0">
            <Row>
                <Col xs={2} className="p-0">
                    <SideBar/>
                </Col>
                <Col xs={10} className="p-0">
                    <Container className="mainview-container">
                    <Routes>
                        <Route path="/" element={<Project/>}/>
                        <Route path="/dashboard" element={<Project/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                    </Container>
                </Col>
            </Row>
       </Container>

    )
}

export default Dashboard;