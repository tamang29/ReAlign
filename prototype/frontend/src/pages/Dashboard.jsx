import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/Dashboard/SideBar";
import MainView from "../components/Dashboard/MainView";
import '../style/style.css';

const Dashboard = () =>{
    return(
       <Container fluid className="dashboard-container p-0">
            <Row>
                <Col xs={3}><SideBar/></Col>
                <Col xs={9}><MainView/></Col>
            </Row>
       </Container>
    )
}

export default Dashboard;