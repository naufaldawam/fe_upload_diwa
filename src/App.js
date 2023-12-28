import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UploadFileComponents from './components/UploadFileComponents';

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div style={{ margin: "20px" }}>
        <h3>Upload balance diwa</h3>
        <h4>React upload Files</h4>
      </div>

      <UploadFileComponents />
    </div>
  );
}

export default App;
