// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Alert, ProgressBar, Button } from 'react-bootstrap';

// const FileUploadForm = () => {
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [uploadError, setUploadError] = useState(null);
//     const [uploadSuccess, setUploadSuccess] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploading, setUploading] = useState(false);

//     const handleUpload = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         try {
//             setUploading(true);

//             const response = await fetch('10.32.4.109:8080/customers/files/upload', {
//                 // const response = await fetch('http://10.32.4.109/customers/upload', {
//                 method: 'POST',
//                 mode: 'cors',
//                 body: formData,
//             });

//             if (response.ok) {
//                 console.log('File uploaded successfully');
//                 setUploadSuccess(true);
//             } else {
//                 console.error('Error uploading file:', response.statusText);
//                 setUploadError('Failed to upload file. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setUploadError('Failed to upload file. Please try again.');
//         } finally {
//             setUploadProgress(0);
//             setSelectedFile(null);
//             setUploading(false);
//         }
//     };

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//         setUploadSuccess(false);
//     };

//     const handleClearFile = () => {
//         setSelectedFile(null);
//         setUploadSuccess(false);
//         document.getElementById('fileInput').value = '';
//     };

//     console.log("clear file: ", handleClearFile);

//     const handleRefreshPage = (e) => {
//         window.location.reload(e);
//     };
//     const isUploadButtonDisabled = !selectedFile || uploading;

//     return (
//         <div>
//             <form onSubmit={handleUpload} encType="multipart/form-data">
//                 <h2>Proses Make Upload File</h2>
//                 <h2>File Upload</h2>
//                 <div className="mb-3 col col-6">
//                     <label for="formFile" className="form-label">Default file input example</label>
//                     <input className="form-control" type="file" name="file" id="fileInput" onChange={handleFileChange} />
//                     {selectedFile && (
//                         <Button className=" mt-2" variant="danger" onClick={handleClearFile}>
//                             Clear
//                         </Button>
//                     )}
//                     <Button className="btn btn-success mt-2" type="submit" disabled={isUploadButtonDisabled}>
//                         {uploading ? 'Uploading...' : 'Upload'}
//                     </Button>
//                 </div>

//             </form>
//             {uploading && (
//                 <div>
//                     <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
//                     <p>Upload Progress: {uploadProgress}%</p>
//                 </div>
//             )}
//             {uploadSuccess && (
//                 <Alert variant="success">
//                     <Alert.Heading>Success!</Alert.Heading>
//                     <p>File berhasil diupload, silahkan cek jurnal untuk lebih memastikan</p>
//                     <button className='btn btn-success' onClick={handleRefreshPage}>Konfirm</button>
//                 </Alert>
//             )}
//             {uploadError && (
//                 <Alert variant="danger">
//                     <Alert.Heading>Error!</Alert.Heading>
//                     <p>{uploadError}</p>
//                     <button className='btn btn-danger' onClick={handleRefreshPage}>Konfirm</button>
//                 </Alert>
//             )}
//         </div>
//     );
// };

// export default FileUploadForm;
// yang diatas ini kalau hanya upload dan langsung tembak ke api diwa

// yang dibawah jika disimpan kedalam localstorage
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, ProgressBar, Button } from 'react-bootstrap';

const FileUploadForm = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            setUploading(true);

            const response = await fetch('http://10.32.4.109:8080/customers/files/upload', {
                method: 'POST',
                mode: 'cors',
                body: formData,
            });

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
            setUploading(false);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadSuccess(false);
    };

    const handleClearFile = () => {
        setSelectedFile(null);
        setUploadSuccess(false);
        document.getElementById('fileInput').value = '';
    };

    const handleRefreshPage = (e) => {
        window.location.reload(e);
    };

    const isUploadButtonDisabled = !selectedFile || uploading;

    return (
        <div>
            <form onSubmit={handleUpload} encType="multipart/form-data">
                <h2>Proses Make Upload File</h2>
                <h2>File Upload</h2>
                <div className="mb-3 col col-6">
                    <label htmlFor="formFile" className="form-label">Default file input example</label>
                    <input className="form-control" type="file" name="file" id="fileInput" onChange={handleFileChange} />
                    {selectedFile && (
                        <Button className=" mt-2" variant="danger" onClick={handleClearFile}>
                            Clear
                        </Button>
                    )}
                    <Button className="btn btn-success mt-2" type="submit" value="upload" disabled={isUploadButtonDisabled}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </div>
            </form>
            {uploading && (
                <div>
                    <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                    <p>Upload Progress: {uploadProgress}%</p>
                </div>
            )}
            {uploadSuccess && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>File berhasil diupload, silahkan konfirmasi checker</p>
                    <button className='btn btn-success' onClick={handleRefreshPage}>Log Out</button>
                </Alert>
            )}
            {uploadError && (
                <Alert variant="danger">
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{uploadError}</p>
                    <button className='btn btn-danger' onClick={handleRefreshPage}>Konfirm</button>
                </Alert>
            )}
        </div>
    );
};

export default FileUploadForm;
