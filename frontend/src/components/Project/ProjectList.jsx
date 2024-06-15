import React from 'react';
import { Badge, Col, Row, Table, Image, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';


const ProjectList = ({projects, handleProjectClick}) => {

    return (
        <Row>
            <Col md={11} className='project-table-container'>
                <Table responsive="md" hover size="sm" className="project-table">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Deadline</th>
                            <th>Owner</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {projects.map((project, index) =>(
                         <tr style={{ cursor: 'pointer' }} key={project._id}>
                            <td>{index + 1}</td>
                            <td  onClick={() => handleProjectClick(project._id)}><FontAwesomeIcon icon={faBell} className='mx-2' />{project.name}</td>
                            <td><Badge bg="white" className="text-black">{project.status}</Badge></td>
                            <td>
                                {project.priority === "High" ? (
                                    <Badge bg="danger" className="text-white">{project.priority}</Badge>
                                ): project.priority === "Medium" ? (
                                    <Badge bg="warning" className="text-white">{project.priority}</Badge>
                                ): (
                                    <Badge bg="light" className="text-dark">{project.priority}</Badge>
                                )
                                }

                            </td>
                            <td>{project.deadline}</td>
                            <td><Image src="holder.js/200x180" roundedCircle alt="owner" /></td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        ...
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Description</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Users</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                       ))}

                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default ProjectList;
