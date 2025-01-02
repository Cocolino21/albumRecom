import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { 
  fetchUserById, 
  followUser, 
  fetchUserReviews, 
  checkForUserFollow, 
  fetchMyUser,
  checkForFriendship
} from '../serviceLayer/userApi';
import UserWall from './UserWall.jsx'
import styles from './componentsCss/UserProfile.css'
const UserProfile = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [myUid, setMyUid] = useState(-1);
  const reviewsPerPage = 1;
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = id.split('_')[0];
        const [userData, userReviews, isFollowingData, isFriendData] = await Promise.all([
          fetchUserById(userId),
          fetchUserReviews(userId),
          checkForUserFollow(userId),
          checkForFriendship(userId)
        ]);
        
        if (userData) {
          setUserProfile(userData);
          setReviews(userReviews || []);
          setIsFollowing(isFollowingData || false);
          setIsFriend(isFriendData)
          const myUserData = await fetchMyUser();
          setMyUid(myUserData?.user_id || -1);
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFollowUser = async () => {
    if (!userProfile) return;
    try {
      const success = await followUser(userProfile.user_id);
      if (success) {
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Error following user:', err);
    }
  };

  const renderStars = (rating) => (
    <div className="stars">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? "#0EA5E9" : "none"}
          color={index < rating ? "#0EA5E9" : "#64748b"}
        />
      ))}
    </div>
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!userProfile) return <div className="error">User not found</div>;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="user-profile">
      <div className="content-wrapper">
        
        <div className="main-content">
          <div className="user-info">
            <img 
              src={userProfile.profilePictureUrl || "/img/logo.png"} 
              alt={userProfile.username} 
              className="profile-image"
            />
            <div className="user-details">
              <h1>{userProfile.username}</h1>
              <p>{userProfile.email}</p>
              {myUid !== userProfile.user_id && (
                <button 
                  className={`follow-button ${isFollowing ? 'following' : ''}`}
                  onClick={handleFollowUser}
                  disabled={isFollowing}
                >
                  {isFollowing ? (isFriend?'Friends':'Following') : 'Follow'}
                </button>
              )}
            </div>
          </div>
          
          <div className="reviews">
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet</p>
            ) : (
              <>
                {currentReviews.map((review) => (
                  <div key={review.reviewId} className="review">
                    <Link 
                      to={`/album/${review.reviewedAlbum.albumId}_${review.reviewedAlbum.albumName}`} 
                      className="album-info"
                    >
                      <img 
                        src={review.reviewedAlbum.albumCoverImageUrl || "/img/1.jpeg"} 
                        alt={review.reviewedAlbum.albumName} 
                      />
                      <div>
                        <h3>{review.reviewedAlbum.albumName}</h3>
                        {renderStars(review.rating)}
                      </div>
                    </Link>
                    <p>{review.content}</p>
                    <time>{new Date(review.reviewDate).toLocaleDateString()}</time>
                  </div>
                ))}
                
                <div className="pagination">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
             
                    <button
                      
                      onClick={() => setCurrentPage(currentPage)}
                      className={currentPage === currentPage ? 'active' : ''}
                    >
                      {currentPage}
                    </button>
                
                  
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="wall">
          <UserWall userId={userProfile.user_id} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;