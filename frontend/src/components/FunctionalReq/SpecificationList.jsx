import React from 'react';
import { Table, Form, Image, Button } from 'react-bootstrap';
import { FaTrash, FaThumbtack } from 'react-icons/fa';

const SpecificationList = ({
  documents,
  selectedDocuments,
  handleDocumentSelect,
  handleEdit,
  handlePinSelected,
  handleDeleteSelected,
  users
}) => {
  return (
    <Table responsive="md" hover size="sm" className="project-table">
      <thead>
        <tr>
          <th></th>
          <th>Draft Name</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>
            <FaThumbtack onClick={handlePinSelected} className="icon-button" />{' '}
            <FaTrash onClick={handleDeleteSelected} className="icon-button"/>
          </th>
          <th>Last Edited</th>
          <th>Owner</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* Map through documents to create table rows */}
        {documents.map(doc => (
          <tr key={doc._id}>
            <td>
              {/* Checkbox for selecting a document */}
              <Form.Check
                type="checkbox"
                checked={selectedDocuments.includes(doc._id)}
                onChange={() => handleDocumentSelect(doc._id)}
              />
            </td>
            <td>{doc.title}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{doc.pinned && <FaThumbtack className="icon-pinned" />}</td>
            <td>{new Date(doc.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
            <td>
              {/* Display owner's photo if available */}
              {users[doc.createdBy] ? (
                <Image
                  src={users[doc.createdBy].photo}
                  roundedCircle
                  alt="owner"
                  style={{ width: '35px', height: '35px' }}
                />
              ) : (
                ''
              )}
            </td>
            <td>
              {/* Button to trigger edit functionality */}
              <Button variant="outline-dark" className="edit-button" onClick={() => handleEdit(doc._id)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SpecificationList;
