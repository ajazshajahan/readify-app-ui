// UserManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserManagement.css"; // Import CSS file

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/find/all/user");
        setUsers(response.data);
      } catch (error) {
        setMessage("Error loading users");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete/user/${userId}`); // Adjust the URL as needed
      setUsers(users.filter(user => user.id !== userId)); // Update local state
      setMessage("User deleted successfully");
    } catch (error) {
      setMessage("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-list">
      <h1>User List</h1>
      {message && <p>{message}</p>}
      <div className="user-cards">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.fullName}</h3>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDelete(user.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export {UserManagement};
