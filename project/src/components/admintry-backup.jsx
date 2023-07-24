import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const LoginForm2 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        loginData
      );

      if (response.data.accessToken) {
        // Authentication successful
        console.log("Authentication successful");
        setLoggedIn(true);
        navigate.push("/show");
      } else {
        // Authentication failed
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error
    }
  };

  if (loggedIn) {
    navigate("/show");
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm2;

// import React, { useState } from "react";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";

// const LoginForm2 = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [contact, setContact] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [contactError, setContactError] = useState("");

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     const loginData = {
//       username: username,
//       password: password,
//       contact: contact,
//     };

//     // Perform phone number validation before submitting the form
//     const isValidPhoneNumber = /^\d{10}$/.test(contact);
//     if (!isValidPhoneNumber) {
//       setContactError(
//         "Invalid phone number. Please enter a 10-digit phone number."
//       );
//       return;
//     } else {
//       setContactError("");
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/login",
//         loginData
//       );

//       if (response.data.accessToken) {
//         // Authentication successful
//         console.log("Authentication successful");
//         setLoggedIn(true);
//         navigate.push("/show");
//       } else {
//         // Authentication failed
//         console.log("Authentication failed");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       // Handle login error
//     }
//   };

//   if (loggedIn) {
//     navigate("/show");
//   }

//   return (
//     <div className="container">
//       <h1>Login</h1>
//       <form onSubmit={handleLoginSubmit}>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">
//             Username:
//           </label>
//           <input
//             type="text"
//             id="username"
//             className="form-control"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="contact" className="form-label">
//             Contact (Phone Number):
//           </label>
//           <input
//             type="text"
//             id="contact"
//             className="form-control"
//             value={contact}
//             onChange={(e) => setContact(e.target.value)}
//           />
//           {contactError && <p className="text-danger">{contactError}</p>}
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm2;
