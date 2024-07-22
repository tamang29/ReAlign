import React, { useState, useEffect } from 'react';
import { Button, Modal, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentEditor from './DocumentEditor';
import Header from '../Dashboard/Header';
import FileUpload from './FileUpload';
import html2pdf from 'html2pdf.js'; 

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'requirements', title: 'Requirements' },
  { id: 'design', title: 'Design' },
  { id: 'implementation', title: 'Implementation' },
  { id: 'testing', title: 'Testing' },
  { id: 'deployment', title: 'Deployment' },
  { id: 'maintenance', title: 'Maintenance' }
];

const projectId = '1';  // Hardcoded project ID

const Specification = () => {
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(sections[0].id); 
  const [content, setContent] = useState('');

  useEffect(() => {
  }, []);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSectionSelect = (sectionId) => {
    setSelectedSection(sectionId);
  };

  const handleSave = (newContent) => {
    setContent(newContent);
  };

  const handleExportAsPDF = () => {
    const contentElement = document.querySelector('.document-editor');
    if (!contentElement) {
      console.error('Editor content not found.');
      return;
    }

    // Create options for PDF export
    const opt = {
      margin: 1,
      filename: 'specification.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    // Exclude toolbar and other UI elements from PDF
    const editorContentClone = contentElement.cloneNode(true);
    const toolbar = editorContentClone.querySelector('.rdw-editor-toolbar');
    if (toolbar) {
      toolbar.remove();
    }

    // Perform PDF export
    html2pdf().set(opt).from(editorContentClone).save();
  };

  return (
    <Container>
      <Header title="Specification" />
      <div className="fr-button-container">
        <Button onClick={handleCreateClick} className="my-3">Create Specification</Button>
      </div>

      <Modal show={isModalOpen} onHide={handleCloseModal} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Specification Document Template</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Nav className="flex-column mr-4 sidebar">
            {sections.map(section => (
              <Nav.Link key={section.id} eventKey={section.id} onClick={() => handleSectionSelect(section.id)}>
                {section.title}
              </Nav.Link>
            ))}
          </Nav>
          <div className="editor-box">
            <DocumentEditor
              initialContent={content}
              onSave={handleSave}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleExportAsPDF}>Export as PDF</Button>
        </Modal.Footer>
      </Modal>

      <FileUpload files={files} setFiles={setFiles} projectId={projectId} />
      
    </Container>
  );
};

export default Specification;
