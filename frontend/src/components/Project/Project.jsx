import {Container, Spinner} from "react-bootstrap";
import Header from "../Dashboard/Header";
import ProjectList from "./ProjectList";
import SearchBar from "../Dashboard/SearchBar";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { getAllProjects } from "../../services/projectService";
import { useNavigate } from 'react-router-dom';
import ProjectPopupForm from "./ProjectPopupForm";
import { getAllUsers } from "../../services/userService";
import {UserProvider} from "../../context/UserContext";

const Project = () =>{
    const user = useContext(UserProvider);
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]); //search bar filtered projects
    const [users, setUsers] = useState([]);
    //Loading animation
    const [loading, setLoading] = useState(true);
    //Create Project popup initial state show=false
    const [show, setShow] = useState(false);

    //search bar
    const [searchText, setSearchText] = useState('');

    //filter visible option
    const [filterVisible , setFilterVisible] = useState(false);

    const navigate = useNavigate();

    //Fetch project list from backend
    const fetchProjects = async() =>{
        console.log(user);
        try{
            const projectList = await getAllProjects();
            setProjects(projectList);
            setFilteredProjects(projectList); // Initialize filteredProjects
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

    //handle search bar text
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchText(searchValue);
        filterProjects(searchValue);
    };

    // Filter projects based on search text
    const filterProjects = (searchValue) => {
        const filtered = projects.filter(project =>
            project.name.toLowerCase().includes(searchValue)
        );
        setFilteredProjects(filtered);
    };
    //handle popup window to show or close
    const handleFormClose = () => setShow(false);
    const handleFormShow = () => setShow(true);

    //update project upon successful creation in project popup form
    const updateProjects = () => {
        fetchProjects();
    };

    // navigate to show project details
    const showProjectDetail = (projectId) =>{
        console.log("description of:" +projectId);
        navigate(`/dashboard/${projectId}`)
    }

    //toggle filterVisible when filter icon is pressed
    const handleFilterVisible = () => {
        if(!filterVisible){
        setFilterVisible(true);
        }else{
        setFilterVisible(false);
        }
    }

    return(
        <Container fluid>
            <BreadCrumbRow/>
            <Header title="Your Projects" />
            <ProjectPopupForm show={show} handleFormClose={handleFormClose} updateProjects={updateProjects} users={users}/>
            <SearchBar searchText={searchText} handleSearch={handleSearch} changeShow={handleFormShow} filterVisible={filterVisible} handleFilterVisible={handleFilterVisible}/>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    {filteredProjects.length > 0 ? (
                        <ProjectList projects={filteredProjects} handleProjectClick={handleProjectClick} showProjectDetail={showProjectDetail} />
                    ) : (
                        <div className="text-center">
                            <p>No projects found</p>
                        </div>
                    )}
                </>
            )}


        </Container>
    )
}

export default Project;