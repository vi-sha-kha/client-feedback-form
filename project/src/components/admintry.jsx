import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm2 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        console.log("Token received:", response.data.accessToken);
        // Store the token in the browser's local storage
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/show");
      } else {
        // Authentication failed
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error
    }
  };

  //useEffect to handle login on component mount
  // useEffect(() => {
  //   handleLoginSubmit();
  // }, []);
  useEffect(() => {
    // Check if the user is already authenticated (token exists in local storage)
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Verify the token with the server
      axios
        .post("http://localhost:3000/api/verify-token", {
          accessToken: accessToken,
        })
        .then((response) => {
          if (response.data.valid) {
            console.log("Token verified. Redirecting to /show");
            navigate("/show");
          } else {
            if (response.data.expired) {
              console.log("Token has expired. Auto-logout.");
            } else {
              console.log("Invalid token. Please login again.");
            }
            localStorage.removeItem("accessToken");
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("accessToken");
        });
    }
  }, [navigate]);

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
