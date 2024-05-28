import { Col, Container, Row } from "react-bootstrap";
import Header from "../Dashboard/Header";
import ProjectList from "./ProjectList";
import SearchBar from "../Dashboard/SearchBar";


const Project = () =>{
    return(
        <Container>
            <Header title="Your Projects" />
            <SearchBar/>
            <ProjectList/>
        </Container>
    )
}

export default Project;