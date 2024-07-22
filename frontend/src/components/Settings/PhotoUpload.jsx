import React, { useState, useContext } from 'react';
import { Button, Modal, Image } from 'react-bootstrap';
import UserContext from '../../context/UserContext';

// PhotoUpload component allows users to upload and crop a profile picture
const PhotoUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
    const [filePreview, setFilePreview] = useState(null);   // State for file preview URL
    const [showModal, setShowModal] = useState(false);      // State for controlling the modal visibility
    const [modalTitle, setModalTitle] = useState('');       // State for modal title
    const [croppedImage, setCroppedImage] = useState(null); // State for the cropped image file
    const [ user ] = useContext(UserContext);               // Get user data from UserContext

    // Handle file input change and display the selected image in a modal for cropping
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(file);
                cropImage(reader.result, file.name);
                setModalTitle(file.name);
                setShowModal(true);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a JPEG or PNG image.');
        }
    };

    // Crop the selected image to a square aspect ratio
    const cropImage = (imageSrc, fileName) => {
        const image = new window.Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const size = Math.min(image.width, image.height); // Get the size for the square crop
            const offsetX = (image.width - size) / 2;
            const offsetY = (image.height - size) / 2;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Draw the image on the canvas to crop it
            ctx.drawImage(image, offsetX, offsetY, size, size, 0, 0, size, size);

            // Convert the canvas content to a blob and create a new file
            canvas.toBlob((blob) => {
                const croppedFile = new File([blob], fileName, { type: 'image/jpeg' });
                setCroppedImage(croppedFile);
                const croppedImageUrl = URL.createObjectURL(croppedFile);
                setFilePreview(croppedImageUrl);
            }, 'image/jpeg');
        };
    };

    // Handle the upload of the cropped image to the server
    const handleUpload = async () => {
        if (croppedImage) {
            const formData = new FormData();
            formData.append('file', croppedImage);
            formData.append('name', croppedImage.name);
            formData.append('user', user._id);

            try {
                // Upload the cropped image to the server
                const uploadResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/file/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    console.error('Failed to upload file:', errorText);
                    alert(`Failed to upload file: ${errorText}`);
                    return;
                }

                const result = await uploadResponse.json();
                console.log('Uploaded file ID:', result.file._id);

                // Update the user profile with the new profile picture
                const updateUserResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${user._id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ photo: result.file._id }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    }
                });

                if (!updateUserResponse.ok) {
                    const errorText = await updateUserResponse.text();
                    console.error('Failed to update user:', errorText);
                    alert(`Failed to update user: ${errorText}`);
                    return;
                }

                // Reload the page to reflect the updated profile picture
                window.location.reload();

            } catch (error) {
                console.error('Server error:', error);
                alert(`Server error: ${error.message}`);
            }
        }
    };

    return (
        <div className="document-editor">
            <div className="fr-button-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* Button to trigger file input for changing profile picture */}
                <Button onClick={() => document.getElementById('file-upload').click()}>
                Change Profile Picture</Button>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
            {/* Modal to display and confirm the cropped image */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {filePreview && <Image src={filePreview} alt="File preview" fluid />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    {croppedImage && (
                        <Button variant="primary" onClick={() => { handleUpload(); setShowModal(false); }}
                        >Upload</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PhotoUpload;
