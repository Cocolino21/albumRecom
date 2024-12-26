import React from 'react';
import Sidepanel from './Sidepanel';
import Album from './Album';
import Navbar from './Navbar'; // Import the Header component
import './componentsCss/App.css'; // Import the CSS

function Home() {
    return (
    
            <div className="album-container">
                <Album />
            </div>
       
    );
}

export default Home;
