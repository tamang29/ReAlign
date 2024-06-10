import { Button, Col, Row ,Table, Image} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const UploadFile = () =>{
    return(
        <>
        <Row className="justify-content-md-end">
            <Col md={3} className=""><Button>Add a File</Button></Col>
        </Row>
        <Row>
            <span>Uploaded File:</span>
        </Row>
        <Row>
            <Col>
            <Table responsive="md" size="sm" className="file-table my-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Uploaded At</th>
                        <th>Owner</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>File name</td>
                        <td>01.06.2024</td>
                        <td><Image src="" roundedCircle alt="owner"/></td>
                        <td><FontAwesomeIcon icon={faTrash} className="mx-2" role="button"/></td>
                    </tr>
                </tbody>
                </Table>
            </Col>
        </Row>
        </>

    )
}

export default UploadFile;