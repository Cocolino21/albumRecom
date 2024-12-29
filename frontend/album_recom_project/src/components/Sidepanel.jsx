import React from 'react';
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { fetchFollowingForMyUser } from '../serviceLayer/userApi';
function Sidepanel() {

const [followingList, setFollowingList] = useState([]);
const [error, setError] = useState('');
const [searchData, setSearchData] = useState('');

useEffect(() => {
    const debounceTimeout = setTimeout(() => {
    const getFollowingList = async () => {
        try{
            const followingListData = await fetchFollowingForMyUser(searchData);
            setFollowingList(followingListData); 
    
        }catch(err){
            console.log(err);
            setError(err.message);
        }
     
    }
    getFollowingList();
}, 300); 
return () => clearTimeout(debounceTimeout);

}, [searchData]);

const handleSearchChange = (e) => {
    setSearchData(e.target.value);
  };

  const following = followingList?.map((usr) => (
    <li key={usr.user_id}>
        <Link to={"/users/" + usr.user_id + "_"+ usr.username} className="friend-link">
            <img 
                src={usr.profile_picture || "/img/logo.png"} 
                alt={usr.username} 
                className="friend-avatar"
            />
            <span className="friend-name">{usr.username}</span>
        </Link>
    </li>
)) || [];

return (
    <div className="sidepanel">
        <h3>Following List</h3>
         <div className="navbar-center">
            <div className="friend-search-container">
    <input 
        type="text"
        id="searchData"
        name="searchData"
        placeholder="Search..."
        className="friend-search-input"
        value={searchData}
        onChange={handleSearchChange}
    />
   
</div>
            </div>
        
        <ul style={{ paddingTop: '20px' }}>{following}</ul>
    </div>
);
}

export default Sidepanel;
