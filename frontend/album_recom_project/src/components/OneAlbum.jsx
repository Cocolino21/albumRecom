import React, { useState, useEffect, useContext, createContext } from 'react';
import { Star, Play, Pause } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { fetchAlbumById, fetchAlbumSongs } from '../serviceLayer/albumsApi';
import styles from './componentsCss/OneAlbum.css';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  const playTrack = (track) => {
    if (currentTrack?.songId === track.songId) {
      // Same track - just toggle play/pause
      setIsPlaying(true);
      audioElement?.play();
    } else {
      // New track
      setCurrentTrack(track);
      setIsPlaying(true);
      // Audio element will be initialized in Player component
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    audioElement?.pause();
  };

  return (
    <PlayerContext.Provider value={{ 
      currentTrack, 
      isPlaying, 
      playTrack, 
      pauseTrack,
      audioElement,
      setAudioElement 
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

function OneAlbum() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useContext(PlayerContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const numericId = id.split('_')[0];
        
        const [albumData, songsData] = await Promise.all([
          fetchAlbumById(numericId),
          fetchAlbumSongs(numericId)
        ]);
        
        setAlbum(albumData);
        setSongs(songsData);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load album data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePlayClick = (song) => {
    if (currentTrack?.songId === song.songId && isPlaying) {
      pauseTrack();
    } else {
      playTrack({
        ...song,
        albumName: album.albumName,
        albumCover: album.albumCoverImageUrl || '/img/1.jpeg'
      });
    }
  };
  
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration);
    const seconds = Math.round((duration - minutes) * 100);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmitReview = () => {
    // TODO: Implement review submission
    console.log({ reviewText, rating });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!album) return <div className="error">Album not found</div>;

  return (
    <div className="one-album-container">
      <div className="album-left-section">
        <div className="album-info-container">
          <img 
            src={album.albumCoverImageUrl || '/img/1.jpeg'} 
            alt={album.albumName} 
            className="album-cover"
          />
          <div className="album-info">
            <h1 className="album-title">{album.albumName}</h1>
            <div className="album-details">
              <p>Duration: {formatDuration(album.albumDuration)}</p>
              <p>Rating: {album.albumRating} ({album.albumReviewNumber} reviews)</p>
              <p>Release Date: {formatDate(album.albumReleaseDate)}</p>
              <p>Genre: {album.albumGenre}</p>
            </div>
          </div>
        </div>
        
        <div className="songs-container">
          <h2>Songs</h2>
          <ul className="songs-list">
            {songs.map((song) => (
              <li key={song.songId} className={`song-item ${currentTrack?.songId === song.songId ? 'active' : ''}`}>
                <button 
                  className="play-button"
                  onClick={() => handlePlayClick(song)}
                >
                  {currentTrack?.songId === song.songId && isPlaying ? 
                    <Pause size={20} /> : <Play size={20} />}
                </button>
                <span className="song-title">{song.songTitle}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="album-right-section">
        <div className="review-form">
          <h2>Write a Review</h2>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-button ${star <= rating ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                <Star size={24} />
              </button>
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="review-textarea"
          />
          <button className="post-review-btn" onClick={handleSubmitReview}>
            Post Review
          </button>
        </div>

        <div className="reviews-section">
          <h2>Reviews</h2>
          <div className="reviews-list">
            {/* Add actual reviews here */}
          </div>
          <div className="pagination">
            <button 
              className="page-btn"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            <span className="page-number">Page {currentPage}</span>
            <button 
              className="page-btn"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneAlbum;