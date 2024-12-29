import React, { useState, useEffect } from 'react';
import { Camera, Edit, Save, X, Mail, User, Lock, CheckCircle } from 'lucide-react';
import { fetchMyUser, updateUser } from '../serviceLayer/userApi';
import styles from './componentsCss/MyProfilePage.css'
const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
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
          email: data.email,
          userProfilePictureUrl: data.userProfilePictureUrl,
        });
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    };
    getMyUser();
  }, []);

  const [tempData, setTempData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({ ...profileData });
  };

  const handleSave = async () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
    try {
      const success = await updateUser(tempData);
      if (success) {
        window.location.replace("/")
        console.log("pulamia");
      } else {
        setError('Update failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred during update.');
      console.error('Update error:', err);
    }
  };

  const handleChange = (e) => {
    setTempData({
      ...tempData,
      [e.target.name]: e.target.value
    });
  };

  if (error) {
    return <div className="profile-error">Error loading profile: {error}</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Settings</h1>
        {!isEditing && (
          <button onClick={handleEdit} className="edit-button">
            <Edit size={16} />
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-picture-section">
            <div className="profile-picture-container">
              <img
                src={profileData.userProfilePictureUrl!=null?profileData.userProfilePictureUrl:'/img/logo.png'}
                alt="Profile"
                className="profile-picture"
              />
              {isEditing && (
                <button className="picture-edit-button">
                  <Camera size={20} />
                </button>
              )}
            </div>
            <h2 className="profile-name">{profileData.username}</h2>
            <div className="profile-status">
              <CheckCircle size={14} style={{ marginRight: '6px' }} />
              Active Account
            </div>
          </div>

          <div className="profile-details">
            <div className="form-group">
              <label className="form-label">
                <User size={16} />
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={tempData.username}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <div className="profile-value">{profileData.username}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={tempData.email}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <div className="profile-value">{profileData.email}</div>
              )}
            </div>

          

            {isEditing && (
              <div className="profile-actions">
                <button onClick={handleSave} className="save-button">
                  <Save size={16} />
                  Save Changes
                </button>
                <button onClick={handleCancel} className="cancel-button">
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;