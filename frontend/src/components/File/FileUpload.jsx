import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../styles/FileUpload.css';
import { fetchProfilePic, getUserById } from '../../services/userService';
import { ToastContainer, Toast } from 'react-bootstrap';

const FileUpload = ({ projectId, context }) => {
    // State variables for managing files, modal, and toast notifications
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [users, setUsers] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastHeader, setToastHeader] = useState('');
    const [toastBody, setToastBody] = useState('');

    const fetchUserAndPhoto = async (userId) => {
        try {
            const user = await getUserById(userId);
            let photo = null;
    
            if (user.photo) {
                photo = await fetchProfilePic(user.photo);
            }
    
            setUsers(prevUsers => ({ ...prevUsers, [userId]: { ...user, photo } }));
        } catch (error) {
            console.error('Error fetching user and photo:', error);
        }
    };
    
    
    // Fetch files for the given project and context
    const fetchFiles = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/file/${context}/${projectId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFiles(data || []);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [projectId, context]);

    useEffect(() => {
        files.forEach(file => {
            if (file.user) {
                fetchUserAndPhoto(file.user);
            }
        });
    }, [files]);
    
    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf') {
                setSelectedFile(file);
                setFilePreview(URL.createObjectURL(file));
                setModalTitle(file.name);
                setShowModal(true);
            } else {
                setToastBody('Only PDFs can be uploaded');
                setToastHeader('Error');
                setShowToast(true);
            }
        }
    };

    const handleUpload = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userId = userData._id;
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('name', selectedFile.name);
            formData.append('projectId', projectId);
            formData.append('context', context);
            formData.append('user', userId);
            try {
                const uploadResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/file/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (!uploadResponse.ok) {
                    console.error('Failed to upload file');
                    return;
                }

                const result = await uploadResponse.json();
                const uploadedFile = { ...result.file, name: selectedFile.name };

                setFiles([...files, uploadedFile]);
                setSelectedFile(null);
                setFilePreview(null);
                setShowModal(false);
            } catch (error) {
                console.error('Server error:', error);
            }
        }
    };

    const handleDeleteFile = async (fileToDelete) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/file/delete/${fileToDelete._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setFiles(files.filter(file => file._id !== fileToDelete._id));
            } else {
                console.error('Failed to delete file');
            }
        } catch (error) {
            console.error('Server error:', error);
        }
    };

    const handleShowFile = (file) => {
        setFilePreview(`data:application/pdf;base64,${file.data}`);
        setModalTitle(file.name);
        setShowModal(true);
    };

    return (
        <div className="file-upload">
            <div className="fr-button-container">
                <Button onClick={() => document.getElementById('file-upload').click()}>Add File</Button>
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
            <div className="file-upload-container">
                <Table className="file-upload-table">
                    <thead>
                        <tr>
                            <th>Uploaded Files:</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length === 0 ? (
                            <tr>
                                <td colSpan="3">No files uploaded yet.</td>
                            </tr>
                        ) : (
                            files.map(file => (
                                <tr key={file._id}>
                                    <td onClick={() => handleShowFile(file)}>{file.name}</td>
                                    <td>{formatDate(file.date)}</td>
                                    <td>
                                        {users[file.user] ? (
                                            <Image
                                                src={users[file.user].photo}
                                                roundedCircle
                                                alt="owner"
                                                style={{ width: '35px', height: '35px' }}
                                            />
                                        ) : (
                                            'Loading...'
                                        )}
                                    </td>
                                    <td>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => handleDeleteFile(file)}
                                            className="delete-icon"
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} size='lg' dialogClassName="file-upload-modal">
                <Modal.Header>
                    <Modal.Title className="modal-title">{modalTitle}</Modal.Title>
                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                        &times; {/* Close icon */}
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {filePreview && (
                        <iframe src={filePreview} title="File preview" style={{ width: '1420px', height: '700px' }} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {selectedFile && <Button variant="primary" onClick={handleUpload}>Upload</Button>}
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-end">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
                    <Toast.Header style={{ color: 'red' }}>
                        <strong className="me-auto">{toastHeader}</strong>
                    </Toast.Header>
                    <Toast.Body>{toastBody}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default FileUpload;
