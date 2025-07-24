// scripts/reviews.js
// Reviews management module

// Store for reviews data - will be populated from localStorage or server
let restaurantReviews = {};

// Initialize reviews from localStorage
export const initializeReviews = () => {
    try {
        const savedReviews = localStorage.getItem('restaurantReviews');
        if (savedReviews) {
            restaurantReviews = JSON.parse(savedReviews);
        }
    } catch (error) {
        console.error('Failed to load reviews from localStorage:', error);
    }
};

// Save reviews to localStorage
const saveReviews = () => {
    try {
        localStorage.setItem('restaurantReviews', JSON.stringify(restaurantReviews));
    } catch (error) {
        console.error('Failed to save reviews to localStorage:', error);
    }
};

// Add a new review for a restaurant
export const addReview = (restaurantId, reviewData) => {
    if (!restaurantReviews[restaurantId]) {
        restaurantReviews[restaurantId] = [];
    }
    
    // Add timestamp and unique ID to the review
    const review = {
        ...reviewData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
    };
    
    restaurantReviews[restaurantId].push(review);
    saveReviews();
    
    return review;
};

// Get all reviews for a restaurant
export const getReviews = (restaurantId) => {
    return restaurantReviews[restaurantId] || [];
};

// Calculate average rating for a restaurant
export const getAverageRating = (restaurantId) => {
    const reviews = getReviews(restaurantId);
    if (reviews.length === 0) return null;
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
};

// Delete a review
export const deleteReview = (restaurantId, reviewId) => {
    if (!restaurantReviews[restaurantId]) return false;
    
    const initialLength = restaurantReviews[restaurantId].length;
    restaurantReviews[restaurantId] = restaurantReviews[restaurantId].filter(review => review.id !== reviewId);
    
    if (restaurantReviews[restaurantId].length !== initialLength) {
        saveReviews();
        return true;
    }
    
    return false;
};

// Create a review form element
export const createReviewForm = (restaurantId, restaurantName, onSubmitCallback) => {
    const form = document.createElement('form');
    form.className = 'review-form';
    form.innerHTML = `
        <h3>Write a Review for ${restaurantName}</h3>
        <div class="form-group">
            <label for="reviewName">Your Name</label>
            <input type="text" id="reviewName" required>
        </div>
        <div class="form-group">
            <label for="reviewRating">Rating</label>
            <div class="star-rating">
                <input type="radio" id="star5" name="rating" value="5" required><label for="star5"></label>
                <input type="radio" id="star4" name="rating" value="4"><label for="star4"></label>
                <input type="radio" id="star3" name="rating" value="3"><label for="star3"></label>
                <input type="radio" id="star2" name="rating" value="2"><label for="star2"></label>
                <input type="radio" id="star1" name="rating" value="1"><label for="star1"></label>
            </div>
        </div>
        <div class="form-group">
            <label for="reviewComment">Your Review</label>
            <textarea id="reviewComment" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn btn--primary">Submit Review</button>
    `;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value;
        const rating = parseInt(document.querySelector('input[name="rating"]:checked').value);
        const comment = document.getElementById('reviewComment').value;
        
        const reviewData = {
            name,
            rating,
            comment
        };
        
        const review = addReview(restaurantId, reviewData);
        
        if (onSubmitCallback) {
            onSubmitCallback(review);
        }
        
        form.reset();
    });
    
    return form;
};

// Create a review display element
export const createReviewsDisplay = (restaurantId) => {
    const reviews = getReviews(restaurantId);
    const container = document.createElement('div');
    container.className = 'reviews-container';
    
    if (reviews.length === 0) {
        container.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
        return container;
    }
    
    const reviewsList = document.createElement('div');
    reviewsList.className = 'reviews-list';
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        
        const date = new Date(review.timestamp);
        const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.name}</span>
                <span class="review-rating">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </span>
                <span class="review-date">${formattedDate}</span>
            </div>
            <div class="review-content">
                <p>${review.comment}</p>
            </div>
        `;
        
        reviewsList.appendChild(reviewElement);
    });
    
    container.appendChild(reviewsList);
    return container;
}; 