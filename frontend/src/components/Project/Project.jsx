import {Container} from "react-bootstrap";
import Header from "../Dashboard/Header";
import ProjectList from "./ProjectList";
import SearchBar from "../Dashboard/SearchBar";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";


const Project = () =>{
    return(
        <Container fluid>
            <BreadCrumbRow/>
            <Header title="Your Projects" />
            <SearchBar/>
            <ProjectList/>
        </Container>
    )
}

export default Project;