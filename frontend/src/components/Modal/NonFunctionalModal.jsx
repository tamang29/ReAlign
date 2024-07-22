import { Modal,Button } from "react-bootstrap"
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import React, { useContext, useEffect, useState} from 'react';
import UserContext from "../../context/UserContext";
import ToastMessage from "../Modal/ToastMessage";
import { createNFR, updateNFR } from "../../services/nfrService";
import { useParams } from "react-router-dom";

const NonFunctionalModal = ({show,openedNFR,handleCellValueUpdate, handleCloseModal,handleChangeOpenedNfr}) =>{

    const user = useContext(UserContext);
    const {projectId} = useParams()
     //Toast state
     const [showToast, setShowToast] = useState(false);
     const [toastHeader, setToastHeader] = useState('');
     const [toastBody, setToastBody] = useState('');


     const handleCloseToast = () =>{
        setShowToast(false);
      }

    const handleSaveButton = async()=>{
        const nfr = {
         projectId: projectId,
         type: openedNFR.type,
         row: openedNFR.row,
         col: openedNFR.col,
         createdBy: user[0]._id,
        }
        try{
        const response = await createNFR(nfr)
            setToastBody('Save successful!');
            setToastHeader('Success');
            setShowToast(true);
            handleChangeOpenedNfr(response);
        }catch(error){
         setToastHeader('Error')
         setToastBody('Failed to save. Please try again.');
         setShowToast(true);
        }
     }

     const handleUpdateButton = async() =>{
        const nfr = {
            projectId: projectId,
            type: openedNFR.type,
            row: openedNFR.row,
            col: openedNFR.col,
            createdBy: user[0]._id,
           }
           try{
        const updatedNfr = await updateNFR(openedNFR._id, nfr);
        setToastBody('Update successful!');
            setToastHeader('Success');
            setShowToast(true);
           }catch(error){
            setToastHeader('Error')
            setToastBody('Failed to update. Please try again.');
            setShowToast(true);
           }

     }
    return(
    <Modal show={show} fullscreen={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{openedNFR.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div
          className="ag-theme-quartz"
          style={{ height: "70vh", width: "100%" }}
        >
          <AgGridReact
            rowData={openedNFR.row}
            columnDefs={openedNFR.col}
            defaultColDef={{
              editable: true,
              resizable: true,
              sortable: false,
            }}
            onCellValueChanged={handleCellValueUpdate}
            domLayout="autoHeight"
          />
        </div>
        </Modal.Body>
        <Modal.Footer>
            {!openedNFR._id ? (
                <Button className="realign-button" onClick={handleSaveButton}>save</Button>
            ): <Button className="realign-button" onClick={handleUpdateButton}>update</Button>}
        </Modal.Footer>
        {showToast && <ToastMessage
                header={toastHeader}
                body={toastBody}
                handleCloseToast= {handleCloseToast}
            /> }
      </Modal>
    )
}
export default NonFunctionalModal;