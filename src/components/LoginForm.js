// contoh fix
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = ({ onLogin }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = (e) => {
//         e.preventDefault();

//         // lets say user just admin , password admin
//         if (username === 'maker' && password === 'maker') {
//             console.log("username: ", username);
//             console.log("pass: ", password);
//             setError('');
//             onLogin();
//             navigate('/maker');
//         } else {
//             setError('password dan username salah.');
//         }
//     };

//     return (
//         <div className='w-50'>
//             <form>
//                 <h2>Login Upload Diwa</h2>
//                 <div className='form-group'>
//                     <label htmlFor="InputEmail">Username:</label>
//                     <input type="text" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
//                 </div>

//                 <div className='form-group'>
//                     <label htmlFor='Input password'>Password:</label>
//                     <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>

//                 <div className='mt-3'>
//                     <button type='submit' className='btn btn-primary' onClick={handleLogin}>Login</button>
//                 </div>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}

//             </form>
//         </div>
//     );
// };
// export default LoginForm;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Cek login sebagai maker
        if (username === 'maker' && password === 'maker') {
            console.log("username: ", username);
            console.log("pass: ", password);
            setError('');
            onLogin();
            navigate('/maker');
        }
        // Cek login sebagai checker
        else if (username === 'checker' && password === 'checker') {
            console.log("username: ", username);
            console.log("pass: ", password);
            setError('');
            onLogin();
            navigate('/checker');
        } else {
            setError('Password dan username salah.');
        }
    };

    return (
        <div className='w-50'>
            <form>
                <h2>Login Upload Diwa</h2>
                <div className='form-group'>
                    <label htmlFor="InputEmail">Username:</label>
                    <input type="text" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor='Input password'>Password:</label>
                    <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='mt-3'>
                    <button type='submit' className='btn btn-primary' onClick={handleLogin}>Login</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;


// import * as React from "react";
// import { Navigate } from "react-router-dom";

// class LoginForm extends React.Component {
//   state = { user: null, error: null };

//   async handleSubmit(event) {
//     event.preventDefault();
//     try {
//       let user = await login(event.target);
//       console.log("username :", user);
//       this.setState({ user });
//     } catch (error) {
//       this.setState({ error });
//     }
//   }


//   render() {
//     let { user, error } = this.state;
//     return (
//       <div>
//         {error && <p>{error.message}</p>}
//         {user && (
//           <Navigate to="/dashboard" replace={true} />
//         )}
//         <form
//           onSubmit={(event) => this.handleSubmit(event)}
//         >
//           <input type="text" name="username" />
//           <input type="password" name="password" />
//         </form>
//       </div>
//     );
//   }
// }