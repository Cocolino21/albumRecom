import { fetchAlbums } from '../serviceLayer/albumsApi';
import React, { useState, useEffect } from 'react';
import styles from './componentsCss/Album.css';
import {Link} from 'react-router-dom'


function Album() {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getAlbums = async () => {
            try {
                const data = await fetchAlbums();
                setAlbums(data);
            } catch (err) {
                console.log(err);
                setError(err.message); 
            }
        };
        getAlbums();
    }, []);

    const albumLists = albums.map(album => (
        <li key={album.albumId} className="album-card"><Link to={"/album/" + album.albumId + "_" + album.albumName.replace(/\s/g, '_')} className = "album-lnk">
    <div className="card">
        <img 
            src={album.albumCoverImageUrl ||  '/img/1.jpeg'} 
            alt={album.albumName || 'Untitled Album'} 
        />
        <div className="card-body">
            <h5 className="card-title">{album.albumName || 'Untitled Album'}</h5>
            <p className="card-text">{album.albumArtists || 'Unknown Artist'}</p>
            <p className="card-text">{album.albumGenre || 'Unknown Artist'}</p>
            <p className="card-text">{album.albumRating || 'Unknown Artist'}</p>
        </div>
    </div>
    </Link>
</li>
    ));

    return (
        <>
            {error && <p>Error: {error}</p>} {/* Display error if any */}
            <ul className="album-list">

                {albumLists}
            </ul>
        </>
    );
}

export default Album;
