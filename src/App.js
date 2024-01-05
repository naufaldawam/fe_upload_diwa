// import React from 'react';
// import FileUploadForm from './components/FileUploadForm';

// const App = () => {
//   return (
//     <div>
//       <h1>React File Upload</h1>
//       <FileUploadForm />
//     </div>
//   );
// };

// export default App;
// // App.js
// import React from 'react';
// import LoginForm from './components/LoginForm';
// import FileUploadForm from './components/FileUploadForm';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/upload" element={<FileUploadForm />} />
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// contoh kedua
// App.js
import React, { useState } from 'react';
// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import FileUploadForm from './components/maker/FileUploadForm';
import ApproveData from './components/cheker/ApproveData';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  
  const PrivateRoute = ({ element }) => {
    
    return loggedIn ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* <Route path="/cheker" element={<ApproveData/>} /> */}
        {/* <Route path="/login" element={<LoginForm/>} /> */}
        {/* <Route path="/maker" element={<FileUploadForm/>} /> */}
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/maker" element={<PrivateRoute element={<FileUploadForm />} />} />
        <Route path="/checker" element={<PrivateRoute element={<ApproveData />} />} />
      </Routes>
    </Router>
  );
};

export default App;
