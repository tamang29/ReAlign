import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FileUpload = ({ files, setFiles, projectId }) => {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const userId = 1;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', file.name);
            formData.append('userId', userId);
            formData.append('projectId', projectId);

            try {
                const response = await fetch('/api/file/upload', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    const result = await response.json();
                    setFiles([...files, { ...result.file, name: file.name }]);
                } else {
                    console.error('Failed to upload file');
                }
            } catch (error) {
                console.error('Server error:', error);
            }
        }
    };

    const handleDeleteFile = async (fileToDelete) => {
        try {
            const response = await fetch(`/api/file/delete/${fileToDelete._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
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

    return (
        <div>
            <div className="fr-button-container">
                <Button as="label" htmlFor="file-upload">Add File</Button>
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
            <div className="file-list">
                {files.map((file, index) => (
                    <div key={index} className="file-item">
                        <span>{file.name}</span>
                        <span>{new Date(file.date).toLocaleDateString()}</span> {/* Display file.date */}
                        <span>{file.user}</span> {/* Display file.user */}
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="delete-icon"
                            onClick={() => handleDeleteFile(file)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
