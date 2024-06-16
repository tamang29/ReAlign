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
import { getAllUsers } from "../../services/userService";


const Project = () =>{
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    //Loading animation
    const [loading, setLoading] = useState(true);
    //Create Project popup initial state show=false
    const [show, setShow] = useState(false);

    //search bar
    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();

    //Fetch project list from backend
    const fetchProjects = async() =>{
        try{
            const projectList = await getAllProjects();
            setProjects(projectList);


        }catch(error){
            console.error("Error fetching projects." +error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        const fetchUsers = async() =>{
            try{
                const userList = await getAllUsers();
                setUsers(userList);
                console.log(userList);

            }catch(error){
                console.error("Error fetching users." +error);
            }
        }
        fetchProjects();
        fetchUsers();
    },[])

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
    const handleFormClose = () => setShow(false);
    const handleFormShow = () => setShow(true);

    //update project upon successful creation in project popup form
    const updateProjects = () => {
        fetchProjects();
    };

    //description
    const showProjectDetail = (projectId) =>{
        console.log("description of:" +projectId);
        navigate(`/dashboard/${projectId}`)
    }


    return(
        <Container fluid>
            <BreadCrumbRow/>
            <Header title="Your Projects" />
            <ProjectPopupForm show={show} handleFormClose={handleFormClose} updateProjects={updateProjects} users={users}/>
            <SearchBar searchText={searchText} handleSearch={handleSearch} changeShow={handleFormShow}/>
            {loading ? (
                <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </div>
            ): (
            <ProjectList projects={projects} handleProjectClick={handleProjectClick} showProjectDetail={showProjectDetail}/>
            )}


        </Container>
    )
}

export default Project;