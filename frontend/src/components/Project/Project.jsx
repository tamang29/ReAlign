import {Container, Spinner} from "react-bootstrap";
import Header from "../Dashboard/Header";
import ProjectList from "./ProjectList";
import SearchBar from "../Dashboard/SearchBar";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import { useState } from "react";
import { useEffect } from "react";
import { getAllProjects } from "../../services/projectService";
import { useNavigate } from 'react-router-dom';
import ProjectPopupForm from "./ProjectPopupForm";


const Project = () =>{
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    //Project popup initial state show=false
    const [show, setShow] = useState(false);

    //search bar
    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();

    //navigate to elicitation
    const handleProjectClick = (projectId) => {
        navigate(`/dashboard/requirements/${projectId}/elicitation`);
    };

    //handle search filter
    const handleSearch = (event) =>{
        setSearchText(event.target.value)
        console.log(searchText)
    }
    //handle popup window to show or close
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //update project upon successful creation in project popup form
    const updateProjects = (newProject) => {
        setProjects([...projects, newProject]);
    };

    useEffect(()=>{
        const fetchProjects = async() =>{
            try{
                const projectList = await getAllProjects();
                setProjects(projectList);

            }catch(error){
                console.error("Error fetching users." +error);
            }finally{
                setLoading(false);
            }
        }
        fetchProjects();
    },[])
    return(
        <Container fluid>
            <BreadCrumbRow/>
            <Header title="Your Projects" />
            <ProjectPopupForm show={show} handleClose={handleClose} updateProjects={updateProjects}/>
            <SearchBar searchText={searchText} handleSearch={handleSearch} changeShow={handleShow}/>
            {loading ? (
                <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </div>
            ): (
            <ProjectList projects={projects} handleProjectClick={handleProjectClick}/>
            )}


        </Container>
    )
}

export default Project;