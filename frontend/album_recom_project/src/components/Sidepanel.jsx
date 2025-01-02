import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFollowingForMyUser, fetchFriendRequestsForMyUser } from '../serviceLayer/userApi';
import { Check, X } from 'lucide-react';
function Sidepanel() {
  const [followingList, setFollowingList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [error, setError] = useState('');
  const [searchData, setSearchData] = useState('');

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const requests = await fetchFriendRequestsForMyUser();
        setFriendRequests(requests || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchFriendRequests();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const getFollowingList = async () => {
        try {
          const followingListData = await fetchFollowingForMyUser(searchData);
          setFollowingList(followingListData);
        } catch (err) {
          console.error(err);
          setError(err.message);
        }
      };
      getFollowingList();
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchData]);

  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleAcceptRequest = async (userId) => {
    try {
      // Add your accept request API call here
      setFriendRequests(prevRequests => 
        prevRequests.filter(request => request.user_id !== userId)
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDenyRequest = async (userId) => {
    try {
      // Add your deny request API call here
      setFriendRequests(prevRequests => 
        prevRequests.filter(request => request.user_id !== userId)
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const friendRequestList = friendRequests.map((request) => (
    <li key={request.user_id} className="mb-4">
      <div className="flex items-center justify-between p-2 bg-surface-dark rounded-lg">
        <Link to={"/users/" + request.user_id} className="friend-link">
          <img
            src={request.profile_picture || "/img/logo.png"}
            alt={request.username}
            className="friend-avatar"
          />
          <span className="friend-name">{request.username}</span>
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => handleAcceptRequest(request.user_id)}
            className="friend-actions-button accept"
            title="Accept request"
          >
            <Check size={16} color="white" />
          </button>
          <button
            onClick={() => handleDenyRequest(request.user_id)}
            className="friend-actions-button deny"
            title="Deny request"
          >
            <X size={16} color="white" />
          </button>
        </div>
      </div>
    </li>
  ));

  const following = followingList?.map((usr) => (
    <li key={usr.user_id}>
      <Link to={"/users/" + usr.user_id} className="friend-link">
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
      {friendRequests.length > 0 && (
        <>
          <h3>Friend Requests</h3>
          <ul className="mb-6">{friendRequestList}</ul>
        </>
      )}
      
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