
import React from 'react';
import {Link} from 'react-router-dom'
import LogoutButton from './LogoutButton.jsx'
import {useState, useEffect} from 'react'
import {fetchMyUser} from '../serviceLayer/userApi.js'
function Navbar() {
  const [searchData, setSearchData] = useState('');
  const [profileData, setProfileData] = useState({
    user_id: '-1',
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    password: '********',
    userProfilePictureUrl: 'img/1.jpeg'
  });


  useEffect(() => {
    const getMyUser = async () => {
      try {
        const data = await fetchMyUser();
        setProfileData({
          user_id: data.user_id,
          username: data.username,
          userProfilePictureUrl: data.userProfilePictureUrl,
        });
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    };
    getMyUser();
  }, []);


  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
  };

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
              <Link to = "/recent">
              <button className="nav-item">Latest</button>
              </Link>
              <button className="nav-item">For You</button>
              <Link to = {"/users/" + profileData.user_id}>
              <button className="nav-item">My Wall</button>
              </Link>
            </div>
            <div className="navbar-center">
            <div className="search-container">
    <input 
        type="text" 
        placeholder="Search..."
        className="search-input"
        value={searchData}
        onChange={handleSearchChange}
    />
    <Link to={searchData==null||searchData==''?'/':"/albums/search/" + searchData}>
    <button className="search-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
    </button>
    </Link>
</div>
            </div>
       
            <div className="navbar-right">
              <Link to = "/myprofile">
            
              <button className="nav-item">{profileData.username}</button>
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
