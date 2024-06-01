import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/Dashboard/SideBar";
import Project from "../components/Project/Project";
import Settings from "./Settings";
import '../style/style.css';
import { Route, Routes } from "react-router-dom";
import NFR from "../components/NFR/NFR";

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
                        <Route path="/dashboard" element={<Project/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/requirements/elicitation" element={<Settings/>}/>
                        <Route path="/requirements/specification" element={<Settings/>}/>
                        <Route path="/requirements/modeling" element={<Settings/>}/>
                        <Route path="/requirements/nfr" element={<NFR/>}/>

                    </Routes>
                    </Container>
                </Col>
            </Row>
       </Container>

    )
}

export default Dashboard;