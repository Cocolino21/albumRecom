import React from 'react';
import Navbar from "./Navbar";
import Sidepanel from "./Sidepanel";
import Player from "./Player";  
import { Outlet } from "react-router-dom";
import {useContext } from 'react'
import {PlayerContext} from './OneAlbum.jsx'
function Layout() {
    const { currentTrack, isPlaying } = useContext(PlayerContext);
    
    return (
      <div className="app-container">
        <Navbar />
        <Sidepanel />
        <main>
          <Outlet />
        </main>
        {currentTrack && (
          <Player 
            audioSrc={currentTrack.songAudioUrl}
            trackTitle={currentTrack.songTitle}
            artist={currentTrack.artist || "Unknown Artist"}
            albumCover={currentTrack.albumCover}
          />
        )}
      </div>
    );
  }

export default Layout;