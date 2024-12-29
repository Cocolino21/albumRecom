import React, { useState, useRef, useEffect, useContext } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, VolumeX } from 'lucide-react';
import styles from './componentsCss/Player.css';
import { PlayerContext } from './OneAlbum.jsx';

function Player({ 
  audioSrc, 
  trackTitle = "Unknown Track", 
  artist = "Unknown Artist", 
  albumCover = "/placeholder-album.jpg" 
}) {
  const { 
    isPlaying, 
    playTrack, 
    pauseTrack, 
    currentTrack,
    setAudioElement 
  } = useContext(PlayerContext);
  
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Set the audio element in context when component mounts
    setAudioElement(audioRef.current);

    return () => {
      // Cleanup when component unmounts
      setAudioElement(null);
    };
  }, [setAudioElement]);

  useEffect(() => {
    // Handle play/pause when isPlaying changes
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        pauseTrack();
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, pauseTrack]);

  useEffect(() => {
    // Handle audio source changes
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing new track:", error);
          pauseTrack();
        });
      }
    }
  }, [audioSrc, isPlaying, pauseTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack(currentTrack);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
    const newTime = clickPosition * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeClick = (e) => {
    const volumeBar = e.currentTarget;
    const clickPosition = (e.pageX - volumeBar.offsetLeft) / volumeBar.offsetWidth;
    setVolume(clickPosition);
    audioRef.current.volume = clickPosition;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player">
      <audio 
        ref={audioRef} 
        src={audioSrc}
        onEnded={pauseTrack}
      />
      <div className="player-container">
        <div className="now-playing">
          <img 
            src={albumCover} 
            alt="Album Cover" 
            className="album-thumb"
          />
          <div className="track-info">
            <h4 className="track-title">{trackTitle}</h4>
            <p className="track-artist">{artist}</p>
          </div>
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button className="control-btn">
              <Shuffle size={20} />
            </button>
            <button className="control-btn">
              <SkipBack size={20} />
            </button>
            <button className="control-btn play-btn" onClick={togglePlay}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="control-btn">
              <SkipForward size={20} />
            </button>
            <button className="control-btn">
              <Repeat size={20} />
            </button>
          </div>
          <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <div className="progress-bar" onClick={handleProgressClick}>
              <div 
                className="progress" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="progress-handle"></div>
              </div>
            </div>
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="volume-controls">
          <button className="control-btn" onClick={toggleMute}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <div className="volume-bar" onClick={handleVolumeClick}>
            <div 
              className="volume-progress" 
              style={{ width: `${volume * 100}%` }}
            >
              <div className="volume-handle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;