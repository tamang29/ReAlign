import { Container } from "react-bootstrap";
import Header from "../Dashboard/Header";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";

const NFR = () =>{
    return(
        <Container>
        <BreadCrumbRow/>
        <Header title="NFR: Project's Name"/>
        </Container>
    )
}

export default NFR;
