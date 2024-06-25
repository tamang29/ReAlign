import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/Dashboard/SideBar";
import Project from "../components/Project/Project";
import Payment from "./Payment";
import Settings from "./Settings";
import '../styles/style.css';
import { Route, Routes, Navigate } from "react-router-dom";
import ProjectDetail from "../components/Project/ProjectDetail";
import Requirements from "./Requirements";
import NotFound from "../components/ErrorPages/NotFound";
import Elicitation from "../components/FunctionalReq/Elicitation";


const Dashboard = () =>{
    return(

       <Container fluid className="dashboard-container p-0">
            <Row>
                <Col xs={2} className="p-0">
                    <SideBar/>
                </Col>
                <Col xs={10} className="p-0">
                    <Container fluid className="mainview-container p-0">
                    <Routes>
                        <Route path="/" element={<Project/>}/>
                        <Route path="/:projectId" element={<ProjectDetail/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/settings/payment" element={<Payment/>}/>
                    </Routes>
                    </Container>
                </Col>
            </Row>
       </Container>

    )
}

export default Dashboard;