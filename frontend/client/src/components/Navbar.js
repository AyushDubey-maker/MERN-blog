import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
function Navbar() {
  const { loggedIn } = useContext(AuthContext);
  const { getLoggedIn } = useContext(AuthContext);
  const {userData}=useContext(AuthContext)
  async function logout() {
    await axios.get("http://localhost:5000/auth/logout");
    getLoggedIn();
  }
  return (
    <div className="header">
        <div className="header_nav">
      <Link to="/home">Home</Link>
          
      {loggedIn === false && (
        <>
          <Link to="/register">Register</Link>

          <Link to="/login">Login</Link>
        </>
      )}
     
      {loggedIn === true && (
        <>
          <Link to="/blog">Blog</Link>
        
          <button onClick={logout}>Logout</button>
          <Link className="nav_email">Hello {userData?.email}</Link>
         
        </>
      )}
    
      </div>
    </div>
  );
}

export default Navbar;
