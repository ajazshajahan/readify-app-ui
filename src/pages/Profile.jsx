import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from local storage
      if (!userId) {
        setMessage("User ID not found.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/get/user?userId=${userId}`);

        console.log(response);
        
        const storedUser = response.data;
        setUser({
          id: storedUser.id,
          fullName: storedUser.fullName,
          email: storedUser.email,
          password: storedUser.password, 
         

        });
      } catch (error) {
        setMessage("Error loading user data");
        console.error("Fetch user data error:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    


    const userId = localStorage.getItem("userId"); // Get userId from local storage
    if (!userId) {
      setMessage("User ID not found.");

      return;
    }


    try {
      const response = await axios.put(`http://localhost:8080/api/update/user`, user);
      setMessage(response.data.message || "User updated successfully");
    } catch (error) {
      setMessage("Error updating user");
      console.error("Update user error:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profileh">Profile</h1>
      <form onSubmit={handleSubmit}>
        <label className="prfllab" htmlFor="fullName">Full Name:</label>
        <input className="prfli"
          type="text"
          id="fullName"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
        />
        <br />

        <label className="prfllab" htmlFor="email">Email:</label>
        <input  className="prflin"
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <br />

        <label className="prfllab" htmlFor="password">Password:</label>
        <input  className="prflin"
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <br/> <br></br>
        <button type="submit" className="upbn" >Update</button>
       
      </form>
      <p className="prms">{message}</p>
    </div>
  );
};

export default Profile;
