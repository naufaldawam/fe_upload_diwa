import React, { useState } from "react";
import UploadFileService from "../services/UploadFileService";
import "bootstrap/dist/css/bootstrap.min.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const onUploadProgress = (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(progress);
      };

      try {
        await UploadFileService.upload(selectedFile, onUploadProgress);
        alert("Balance berhasil ditambahkan silahkan cek jurnal!");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setUploadProgress(0);
        setSelectedFile(null);
      }
    } else {
      alert("Please select a file before uploading.");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <label className="btn btn-default">
        <input type="file" onChange={handleFileChange} />
      </label>
      <button className="btn btn-success" onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && (
        <div>
          <p>Upload Progress: {uploadProgress}%</p>
          <progress value={uploadProgress} max="100" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
