import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import {fetchUserPosts, checkForFriendship, userPost} from '../serviceLayer/userApi.js'
import {fetchAlbumByNameStartingWith} from '../serviceLayer/albumsApi.js'
import styles from './componentsCss/UserWall.css'
const UserWall = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postContent, setPostContent] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchAlbum, setSearchAlbum] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const postsPerPage = 5;

  useEffect(() => {
    const checkFriendshipStatus = async () => {
      try {

          const status = await checkForFriendship(userId);
          setIsFriend(status);
        
          const fetchedPosts = await fetchUserPosts(userId);
          setPosts(fetchedPosts || []);
        
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkFriendshipStatus();
  }, [userId]);

  const handleAlbumSearch = async (query) => {
    setSearchAlbum(query);
    if (query.trim()) {
      try {
        const results = await fetchAlbumByNameStartingWith(query);
        setSearchResults(results || []);
      } catch (error) {
        console.error('Error searching albums:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSubmitPost = async () => {
    if (!postContent.trim() || !selectedAlbum) return;

    try {
      const usrPost = await userPost(userId,selectedAlbum, postContent, null );
      const newPost = {
        content: postContent,
        album: selectedAlbum,
        timestamp: new Date().toISOString()
      };
      const fetchedPosts = await fetchUserPosts(userId);
      setPosts(fetchedPosts || []);
      setPostContent('');
      setSelectedAlbum(null);
      setSearchAlbum('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="user-wall">
      {isFriend && (
        <div className="post-creation">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write something..."
            className="post-input"
          />
          <div className="album-search">
            <div className="search-box">
              <input
                type="text"
                value={searchAlbum}
                onChange={(e) => handleAlbumSearch(e.target.value)}
                placeholder="Search for an album..."
                className="album-search-input"
              />
              <Search className="search-icon" size={20} />
            </div>
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((album) => (
                  <div
                    key={album.albumId}
                    className="search-result-item"
                    onClick={() => {
                      setSelectedAlbum(album);
                      setSearchAlbum(album.albumName);
                      setSearchResults([]);
                    }}
                  >
                    <img
                      src={album.albumCoverImageUrl || '/img/1.jpeg'}
                      alt={album.albumName}
                      className="result-album-cover"
                    />
                    <span>{album.albumName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedAlbum && (
            <div className="selected-album">
              <img
                src={selectedAlbum.albumCoverImageUrl || '/img/1.jpeg'}
                alt={selectedAlbum.albumName}
                className="selected-album-cover"
              />
              <span>{selectedAlbum.albumName}</span>
            </div>
          )}
          <button
            onClick={handleSubmitPost}
            className="post-button"
            disabled={!postContent.trim() || !selectedAlbum}
          >
            Post
          </button>
        </div>
      )}
<div className="posts-container">
  {currentPosts.map((post, index) => (
    <div key={index} className="post">
      <div className="post-user">
        <Link to={`/users/${post.poster.user_id}`} className="user-link">
          <img 
            src={post.poster.userProfilePictureUrl || '/img/logo.png'} 
            alt={post.poster.username} 
            className="user-avatar"
          />
          <span className="username">{post.poster.username}</span>
        </Link>
        <span className="post-timestamp">
          {new Date(post.postDate).toLocaleDateString()}
        </span>
      </div>
      <p className="post-content">{post.comment}</p>
      <div className="post-header">
        <Link to={`/album/${post.album.albumId}`} className="album-link">
          <img
            src={post.album.albumCoverImageUrl || '/img/1.jpeg'}
            alt={post.album.albumName}
            className="post-album-cover"
          />
          <span className="album-name">{post.album.albumName}</span>
        </Link>
      </div>
    </div>
  ))}
</div>

      {posts.length > postsPerPage && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <div className="page-numbers">
              <button
                onClick={() => setCurrentPage(currentPage)}
                className={`page-number ${currentPage === currentPage ? 'active' : ''}`}
              >
                {currentPage}
              </button>
          </div>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserWall;