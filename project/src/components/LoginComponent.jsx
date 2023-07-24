import React, { useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";

const FormComponent = ({ apiEndpoint }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [formData, setFormData] = useState([]);

  //const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      const response = await axios.post(apiEndpoint, loginData);

      if (response.status === 200) {
        // Admin logged in successfully
        // Redirect to admin dashboard or perform necessary actions
        console.log("Admin logged in successfully");
      } else {
        // Handle login error
        console.error("Login error:", response.data);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* <Link to="/">See all books</Link> */}
    </div>
  );
};

export default FormComponent;
