import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import styles from './componentsCss/PaginatedReviews.css';

const PaginatedReviews = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 1;
  
  // Calculate indexes for current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  
  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        fill={index < rating ? "#0EA5E9" : "none"}
        color={index < rating ? "#0EA5E9" : "#64748b"}
      />
    ));
  };

  if (reviews.length === 0) {
    return (
      <div className="reviews-section">
        <h2>Reviews</h2>
        <p className="review-content">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <h2>Reviews</h2>
      <div className="reviews-list">
        {currentReviews.map((rev) => (
          <div key={rev.reviewId} className="review-item">
            <div className="review-header">
              <Link 
                to={`/users/${rev.reviewer.user_id}`} 
                className="reviewer-info"   
              >
                <img 
                  src={rev.reviewer.userProfilePictureUrl || "/img/logo.png"} 
                  alt={rev.reviewer.username} 
                  className="reviewer-avatar"
                />
                <span className="reviewer-name">{rev.reviewer.username}</span>
              </Link>
              <span className="review-date">
                {new Date(rev.reviewDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="review-rating">
              {renderStars(rev.rating)}
            </div>
            <p className="review-content">{rev.content}</p>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        
        <div className="page-numbers">
          {
            <button
       
              onClick={() => handlePageChange(currentPage)}
              className={`page-number`}
            >
              {currentPage}
            </button>
          }
        </div>

        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedReviews;