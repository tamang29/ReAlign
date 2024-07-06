import React from 'react';
import { Badge, Col, Row, Table, Image, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';


const ProjectList = ({projects, handleProjectClick, showProjectDetail}) => {

    return (
        <Row className='mt-5'>
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
                        </tr>
                    </thead>
                    <tbody>
                       {projects.map((project, index) =>(
                         <tr style={{ cursor: 'pointer' }} key={project._id} onClick={() => handleProjectClick(project._id)}>
                            <td>{index + 1}</td>
                            <td ><FontAwesomeIcon icon={faBell} className='mx-2' />{project.name}</td>
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
                        </tr>
                       ))}

                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default ProjectList;
