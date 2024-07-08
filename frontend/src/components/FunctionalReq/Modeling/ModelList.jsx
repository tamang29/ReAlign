import React from 'react';
import { Badge, Col, Row, Table, Image, Dropdown,Button} from 'react-bootstrap';


const ModelList = ({diagrams, openDiagram}) =>{
    return(
            <Col md={11} className='model-table-container'>
                <Table responsive="md" hover size="sm" className="model-table">
                    <thead className="sticky-header">
                        <tr>
                            <th>Model Name</th>
                            <th>Type</th>
                            <th>Last Edited</th>
                            <th>Owner</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diagrams.map((diagram) =>(
                            <tr key={diagram._id} onClick={()=>openDiagram(diagram)}>
                            <td style={{width:"25rem"}}>{diagram.fileName}</td>
                            <td>{diagram.type}</td>
                            <td>{diagram.updatedAt}</td>
                            <td>{diagram.createdBy}</td>
                            <td><Button variant='outline-dark' key={diagram._id}>Edit</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
    )
}

export default ModelList;