// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';


// const ApproveData = () => {
//     return (
//         <div className="w-60">
//             <div>
//                 <h1>Proses Approval Data</h1>
//             </div>

//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th scope="col">No</th>
//                         <th scope="col">data yang diupload</th>
//                         <th scope="col">action</th>
//                     </tr>
//                     <tr>
//                         <th scope="row">1</th>
//                         <td>file csv 1 yang diambil dari data maker</td>
//                         <td>
//                             <button className="btn btn-danger m-1">reject</button>
//                             <button className="btn btn-success m-1">approve</button>
//                             <button className="btn btn-primary m-1">download</button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th scope="row">2</th>
//                         <td>file csv 2 yang diambil dari data maker</td>
//                         <td>
//                             <button className="btn btn-danger m-1">reject</button>
//                             <button className="btn btn-success m-1">approve</button>
//                             <button className="btn btn-primary m-1">download</button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th scope="row">3</th>
//                         <td>file csv 3 yang diambil dari data maker</td>
//                         <td>
//                             <button className="btn btn-danger m-1">reject</button>
//                             <button className="btn btn-success m-1">approve</button>
//                             <button className="btn btn-primary m-1">download</button>
//                         </td>
//                     </tr>
//                 </thead>
//             </table>

//             <div>
//                 <button className="btn btn-success">download semua</button>
//             </div>
//         </div>
//     );
// }

// export default ApproveData;


import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ApproveData.css';

const Popup = ({ message, onClose }) => (
    <div className="popup">
        <div className="popup-content">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
);

const ApproveData = () => {
    const [files, setFiles] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('http://10.32.4.109:8080/customers/files/all');
                if (response.ok) {
                    const data = await response.json();
                    setFiles(data);
                } else {
                    console.error('Gagal mengambil data files:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const handleApprove = async (index) => {
        try {
            const formData = new FormData();
            formData.append('filePath', files[index].filePath);

            const response = await fetch('http://10.32.4.109:8080/customers/upload', {
                method: 'POST',
                body: formData,
                mode: 'cors',
            });

            if (response.ok) {
                const updatedFiles = [...files];
                updatedFiles.splice(index, 1);
                setFiles(updatedFiles);

                // Menampilkan popup
                setShowPopup(true);
                setPopupMessage("File berhasil disetujui!");
            } else {
                console.error('Gagal menyetujui file:', response.statusText);
            }
        } catch (error) {
            console.error('Error menyetujui file:', error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
    };

    const handleReject = (index) => {
        const updatedFiles = files.filter((file, i) => i !== index);
        setFiles(updatedFiles);

        const nameFile = files[index].fileName;
        console.log("Nama file yang direject:", nameFile);

        fetch(`http://10.32.4.109:8080/customers/files/reject/${files[index].fileName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('File berhasil dihapus:', response);
            })
            .catch(error => {
                console.error('Error saat menghapus file:', error);
            });
    };

    const handleDownload = async (index) => {
        try {
            const response = await fetch(`http://10.32.4.109:8080/customers/files/download/${files[index].fileName}`);

            if (response.ok) {
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = files[index].fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error('Gagal mendownload file:', response.statusText);
            }
        } catch (error) {
            console.error('Error mendownload file:', error);
        }
    };

    return (
        <div className="w-60">
            <div>
                <h1>Proses Approval Data</h1>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Data yang Diupload</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{file.fileName}</td>
                            <td>
                                <button className="btn btn-danger m-1" onClick={() => handleReject(index)}>Reject</button>
                                <button className="btn btn-success m-1" onClick={() => handleApprove(index)}>Approve</button>
                                <button className="btn btn-primary m-1" onClick={() => handleDownload(index)}>Download</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPopup && (
                <Popup message={popupMessage} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default ApproveData;
