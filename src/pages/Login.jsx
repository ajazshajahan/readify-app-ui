import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import the useAuth hook
import './Login.css';
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Access the login function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:8080/api/login/user", {
        params: {
          email: email.trim(),
          password: password.trim(),
        },
      });

      // Save user data to localStorage
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("role", response.data.role);
      
      if (response && response.data) {
        login(); // Update login state
        navigate('/books');
      } else {
        alert("User not valid");
      }
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred during login.");
      }
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="heads">Login</h2>
     
      <form  onSubmit={handleSubmit}>
      
        <label className="loglab"  htmlFor="email">Email</label>
        <input className="loginp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          id="email"
          name="email"
        /><br></br>
        <label className="loglab" htmlFor="password">Password</label>
        <input className="loginp"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          
        />
      
        <br /> <br></br><br></br>
        <button className="logbut" type="submit">Login</button>
      
      </form>
      <br />
      <div className="link-bt">
        <Link to="/register">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
