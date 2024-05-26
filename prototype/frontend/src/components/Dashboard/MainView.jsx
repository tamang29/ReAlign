import { Container, Row } from "react-bootstrap";

const MainView = () =>{
    return(
        <Container className="mainview-container bg-primary ">
            <Row className="p-5">
                <span style={{fontSize: 20}}>Project Name</span>
            </Row>
        </Container>
    )
}

export default MainView;