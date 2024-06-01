import { Container } from "react-bootstrap";
import Header from "../Dashboard/Header";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import NFRList from "./NFRList";
import UploadFile from "../Dashboard/UploadFile";

const NFR = () =>{
    return(
        <Container fluid>
        <BreadCrumbRow/>
        <Header title="NFR: Project's Name"/>
        <NFRList/>
        <hr/>
        <UploadFile/>
        </Container>
    )
}

export default NFR;
