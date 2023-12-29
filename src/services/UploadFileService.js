import axios from "axios";

class UploadFileService {
  upload(file, onUploadProgress, cstAcctNo, channel, nameInputFile) {
    const formData = new FormData();
    formData.append("file", file);

    // const apiUrl = "http://localhost:8001/customers/upload";
    // const apiUrl = "http://localhost:8080/customers/upload";
    const apiUrl = "http://10.32.4.109/customers/upload";

    const headers = {
      "Content-Type": "multipart/form-data",
      channel,
      cst_acct_no: cstAcctNo,
    };

    return axios.post(apiUrl, formData, {
      headers,
      onUploadProgress,
    })
    .then(response => {
      const responseHeaders = response.headers;
      console.log("Response Headers:", responseHeaders);

      const contentType = responseHeaders['content-type'];
      console.log("Content-Type Header:", contentType);

      const responseData = response.data;
      console.log("Response Data:", responseData);

      return response; // You can also return the response if needed
    });
  }
}

const UploadFileServices = new UploadFileService();
export default UploadFileServices;
