import axios from "axios";

class UploadFileService {
  upload(file, onUploadProgress, cstAcctNo, channel, nameInputFile) {
    const formData = new FormData();
    formData.append("file", file);

    const apiUrl = "http://localhost:8080/customers/upload";

    const headers = {
      "Content-Type": "multipart/form-data",
      channel,
      cst_acct_no: cstAcctNo,
    };

    return axios.post(apiUrl, formData, {
      headers,
      onUploadProgress,
    });
  }
}

const UploadFileServices = new UploadFileService();
export default UploadFileServices;
