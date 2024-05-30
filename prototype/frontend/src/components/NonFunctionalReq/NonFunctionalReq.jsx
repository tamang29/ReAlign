import { Container } from "react-bootstrap";
import Header from "../Dashboard/Header";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";

const NonFunctionalReq= () =>{
    return(
        <Container>
        <BreadCrumbRow/>
        <Header title="NFR: Project's Name"/>
        </Container>
    )
}

export default NonFunctionalReq;
