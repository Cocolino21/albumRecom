import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../serviceLayer/authApi';
import styles from './componentsCss/App.css'
const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            window.location.replace("/")
        } else {
            console.error('Logout failed');
            alert('Logout failed. Please try again.');
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="nav-item"
        >
            Logout
        </button>
    );
};

export default LogoutButton;