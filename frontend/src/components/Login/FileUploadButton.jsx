import React from 'react';
import { Button } from 'react-bootstrap';

function FileUploadButton() {
  const handleFileSelect = (event) => {
    console.log(event.target.files);
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: 'none' }}
        id="file-upload"
        onChange={handleFileSelect}
      />
      <label htmlFor="file-upload">
        <Button as="span" variant="outline-dark" size='sm'>
          Upload
        </Button>
      </label>
    </div>
  );
}

export default FileUploadButton;
