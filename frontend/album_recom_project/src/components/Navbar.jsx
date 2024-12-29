
import React from 'react';
import {Link} from 'react-router-dom'
import LogoutButton from './LogoutButton.jsx'
function Navbar() {
    return (
        <nav className="navbar">
          <div className="navbar-content">
            <div className="navbar-left">
              <Link to = "/">
              <img 
                src="/img/logo.png" 
                alt="Logo" 
                className="logoimg"
              />
              </Link>
              <button className="nav-item">Latest</button>
              <button className="nav-item">For You</button>
              <button className="nav-item">My Wall</button>
            </div>
            <div className="navbar-center">
            <div className="search-container">
    <input 
        type="text" 
        placeholder="Search..."
        className="search-input"
    />
    <button className="search-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
    </button>
</div>
            </div>
       
            <div className="navbar-right">
              <Link to = "/myprofile">
              <button className="nav-item">Profile</button>
              </Link>
              <Link to = "/login">
              <LogoutButton>Log-out</LogoutButton>
              </Link>
              
            </div>
          </div>
        </nav>
      );
}

export default Navbar;
