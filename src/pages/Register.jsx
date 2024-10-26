import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  const saveUser = async () => {
    try {
      localStorage.clear();
      const response = await axios.post("http://localhost:8080/api/save/user", {
        fullName,
        email,
        password,
      });

      console.log("User saved:", response.data);
      

      localStorage.setItem("email", response.data.email);
      localStorage.setItem("fullName", response.data.fullNames);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userId" ,response.data.id)

      navigate('/books');
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="register-cont">
      <h2 className="regsterheadin">Sign Up</h2>
      <form onSubmit={(e) => {
          e.preventDefault();
          saveUser();
        }}
      >
        <form>
          <label className="regful">Full Name </label>
        
        <div className="reginp"> 
        <input className="regin"
     
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          placeholder="Full Name"
          id="fullName"
          name="name"
        />
        </div>
        </form>

        <label className="reglab" htmlFor="email">Email</label>
        <input
         className="reginpu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
        />

        <label className="reglab" htmlFor="password">Password</label>
        <input
         className="reginpu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        /><br></br><br></br><br></br>
        
        <button type="submit" className="registerbutton">Register</button>
      </form>
      
      <div className="login-link">
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
