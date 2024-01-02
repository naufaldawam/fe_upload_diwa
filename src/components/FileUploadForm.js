import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Spinner, ProgressBar, Button } from 'react-bootstrap';

const FileUploadForm = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('http://10.32.4.109/customers/upload', {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });
      console.log("response = ", response);
      

      if (response.ok) {
        console.log('File uploaded successfully');
        setUploadSuccess(true);
      } else {
        console.error('Error uploading file:', response.statusText);
        setUploadError('Failed to upload file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Failed to upload file. Please try again.');
    } finally {
      setUploadProgress(0);
      setSelectedFile(null);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadSuccess(false); 
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setUploadSuccess(false); 
  };

  return (
    <div>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <h2>File Upload</h2>
        <label className="btn btn-default">
          <input type="file" name="file" id="fileInput" onChange={handleFileChange} />
        </label>
        {selectedFile && (
          <Button variant="danger" onClick={handleClearFile}>
            Clear
          </Button>
        )}
        <button className="btn btn-success" type="submit">
          Upload
        </button>
      </form>
      {uploadSuccess && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>File uploaded successfully!</p>
        </Alert>
      )}
      {uploadProgress > 0 && (
        <div>
          <p>Upload Progress: {uploadProgress}%</p>
          <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
          <Spinner animation="border" variant="info" role="status">
            <span className="sr-only">Uploading...</span>
          </Spinner>
        </div>
      )}
      {uploadError && (
        <Alert variant="danger">
          <Alert.Heading>Error!</Alert.Heading>
          <p>{uploadError}</p>
        </Alert>
      )}
    </div>
  );
};

export default FileUploadForm;
