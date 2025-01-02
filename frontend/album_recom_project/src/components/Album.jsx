import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchRecentAlbums, fetchAlbumByNameStartingWith } from '../serviceLayer/albumsApi';
import styles from './componentsCss/Album.css';

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { searchQuery } = useParams();
  
  const albumsPerPage = 30;

  useEffect(() => {
    const getAlbums = async () => {
      try {
        setLoading(true);
        let data;
        
        // Reset to first page when changing routes/search
        setCurrentPage(1);

        if (location.pathname === '/' || location.pathname === '/recent') {
          data = await fetchRecentAlbums();
        } else if (searchQuery) {
          data = await fetchAlbumByNameStartingWith(searchQuery);
        }

        setAlbums(data || []);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getAlbums();
  }, [location.pathname, searchQuery]);

  // Get current albums
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const totalPages = Math.ceil(albums.length / albumsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="album-container">
      <div className="album-content">
        {albums.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            {searchQuery ? `No albums found matching "${searchQuery}"` : 'No albums available'}
          </div>
        ) : (
          <>
            <ul className="album-list">
              {currentAlbums.map(album => (
                <li key={album.albumId} className="album-card">
                  <Link 
                    to={`/album/${album.albumId}_${album.albumName.replace(/\s/g, '_')}`} 
                    className="album-lnk"
                  >
                    <div className="card">
                      <img 
                        src={album.albumCoverImageUrl || '/img/1.jpeg'} 
                        alt={album.albumName || 'Untitled Album'} 
                      />
                      <div className="card-body">
                        <h5 className="card-title">{album.albumName || 'Untitled Album'}</h5>
                        <p className="card-text">{album.albumArtists || 'Unknown Artist'}</p>
                        <p className="card-text">{album.albumGenre || 'Unknown Genre'}</p>
                        <p className="card-text">{new Date(new Date(album.albumReleaseDate)).toLocaleDateString() || 'No Rating'}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className="pagination-nav-button"
                >
                  First
                </button>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-nav-button"
                >
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(num => {
                      if (totalPages <= 7) return true;
                      if (num === 1 || num === totalPages) return true;
                      if (num >= currentPage - 2 && num <= currentPage + 2) return true;
                      return false;
                    })
                    .map((number, index, array) => {
                      if (index > 0 && array[index - 1] !== number - 1) {
                        return [
                          <span key={`ellipsis-${number}`} className="pagination-ellipsis">...</span>,
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                          >
                            {number}
                          </button>
                        ];
                      }
                      return (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                        >
                          {number}
                        </button>
                      );
                    })}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-nav-button"
                >
                  Next
                </button>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className="pagination-nav-button"
                >
                  Last
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Album;