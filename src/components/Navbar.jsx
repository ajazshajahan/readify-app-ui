import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.clear();
    // Redirect to the login page
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  return (
    <>
      <nav>
        <h1 className='head'>READIFY</h1>
        <ul>
          <li>
            <NavLink to="/"><h3>HOME</h3></NavLink>
          </li>
          <li>
            <NavLink to="/about"><h3>ABOUT</h3></NavLink>
          </li>
          {userId && (
            <li>
              <NavLink to="/profile"><h3>PROFILE</h3></NavLink>
            </li>
          )}
          
          <li>
            <NavLink to="/books"><h3>BOOKS</h3></NavLink>
          </li>
          {role === "admin" && (
            <li>
              <NavLink to="/bookManagement"><h3>BOOK MANAGEMENT</h3></NavLink>
            </li>
           
          )}

          {role === "admin" && (
            <li>
              <NavLink to="/userManagement"><h3>USER MANAGEMENT</h3></NavLink>
            </li>

           )}
          
          {role === "user" && (
          <li>
            <NavLink to="/contact"><h3>CONTACT</h3></NavLink>
          </li>
          )}
        </ul>
      </nav>
      <nav className='nav2'>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <button className='logtbtn' onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login"><h3>Login</h3></NavLink>
              </li>
              <li>
                <NavLink to="/register"><h3>Sign Up</h3></NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
