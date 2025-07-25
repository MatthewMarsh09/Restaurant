// scripts/ui.js
import { HOUSTON_DEFAULT } from './app.js';
import { generateMapsLink } from './location.js';
import { createReviewForm, createReviewsDisplay, getAverageRating, getReviews } from './reviews.js';

let map;
export let currentResults = [];
let currentPage = 1;
const resultsPerPage = 12;

// Review modal elements
let reviewModal;
let reviewModalContent;
let currentRestaurantId;
let currentRestaurantName;

export const updateCurrentResults = (newResults) => {
    currentResults = newResults;
    currentPage = 1; // Reset to first page on new search
};

export const showListView = () => {
    const grid = document.getElementById('resultsGrid');
    const container = document.getElementById('listView');
    const paginationControls = document.getElementById('paginationControls');
    container.style.display = 'block';
    
    const totalPages = Math.ceil(currentResults.length / resultsPerPage);
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginatedResults = currentResults.slice(start, end);

    const fragment = document.createDocumentFragment();

    if (paginatedResults.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No restaurants found.';
        fragment.appendChild(p);
        paginationControls.style.display = 'none';
    } else {
        paginatedResults.forEach(r => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Get the appropriate CSS class for the price
            const priceClass = `price-${r.price.replace(/\$/g, '\\$')}`;
            
            // Generate unique ID for the restaurant if not present
            const restaurantId = r.id || `restaurant-${r.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${r.lat}-${r.lng}`;
            
            // Get user reviews if available
            const reviews = getReviews(restaurantId);
            const reviewCount = reviews.length;
            const userRating = getAverageRating(restaurantId);
            const ratingDisplay = userRating ? `⭐ ${userRating.toFixed(1)}/5.0 (${reviewCount})` : `⭐ ${r.rating}/5.0`;
            
            // Display price with range if available
            const priceDisplay = r.priceRange ? `${r.price} (${r.priceRange})` : r.price;
            
            card.innerHTML = `<h3>${r.name}</h3>
                <div class="card-header">
                    <div class="cuisine">${r.cuisine.charAt(0).toUpperCase() + r.cuisine.slice(1)}</div>
                    <div class="price-indicator ${priceClass}">${priceDisplay}</div>
                </div>
                <div class="rating">${ratingDisplay}</div>
                <div class="distance">📍 ${r.calculatedDistance.toFixed(1)} miles</div>
                <div class="address"><a href="${generateMapsLink(r.address)}" target="_blank" rel="noopener">${r.address}</a></div>
                <div class="card-actions">
                    <button class="btn btn--small write-review-btn" data-id="${restaurantId}" data-name="${r.name}">Write Review</button>
                    ${reviewCount > 0 ? `<button class="btn btn--small btn--secondary view-reviews-btn" data-id="${restaurantId}" data-name="${r.name}">View Reviews (${reviewCount})</button>` : ''}
                </div>`;
            fragment.appendChild(card);
        });
        updatePaginationControls(totalPages);
        paginationControls.style.display = 'flex';
    }
    grid.innerHTML = '';
    grid.appendChild(fragment);
    
    // Add event listeners for review buttons
    document.querySelectorAll('.write-review-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            showReviewModal('write', id, name);
        });
    });
    
    document.querySelectorAll('.view-reviews-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            showReviewModal('view', id, name);
        });
    });
};

const updatePaginationControls = (totalPages) => {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageIndicator = document.getElementById('pageIndicator');

    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
};

export const changePage = (direction) => {
    const totalPages = Math.ceil(currentResults.length / resultsPerPage);
    currentPage += direction;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    showListView();
};

export const showMapView = (restaurants, searchCenter) => {
    document.getElementById('mapView').style.display = 'block';
    const range = parseInt(document.getElementById('range').value) || 10;
    const center = searchCenter || HOUSTON_DEFAULT;

    if (!map) {
        map = L.map('map').setView([center.lat, center.lng], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
    } else {
        map.eachLayer(layer => (layer instanceof L.Marker || layer instanceof L.Circle) && map.removeLayer(layer));
        map.setView([center.lat, center.lng], 11);
    }
    
    const popupText = (document.getElementById('address').value?.toLowerCase() === 'current location') ? 'Your Current Location' : 'Search Center';
    L.marker([center.lat, center.lng]).addTo(map).bindPopup(popupText).openPopup();
    L.circle([center.lat, center.lng], { color: '#002D62', fillColor: '#EB6E1F', fillOpacity: 0.1, radius: range * 1609.34 }).addTo(map);
    restaurants.forEach(r => {
        const marker = L.marker([r.lat, r.lng]).addTo(map);
        
        // Display price with range if available
        const priceDisplay = r.priceRange ? `${r.price} (${r.priceRange})` : r.price;
        
        const popupContent = `<div style="text-align: center; min-width: 200px;">
            <strong style="font-size: 14px;">${r.name}</strong><br>
            <div style="display: flex; justify-content: center; gap: 10px; margin: 5px 0;">
                <span style="color: #666;">${r.cuisine.charAt(0).toUpperCase() + r.cuisine.slice(1)}</span>
                <span style="font-weight: 600;">${priceDisplay}</span>
            </div>
            <span style="color: #ff6600;">⭐ ${r.rating}/5.0</span><br>
            <span style="color: #002D62;">📍 ${r.calculatedDistance.toFixed(1)} miles</span><br>
            <a href="${generateMapsLink(r.address)}" target="_blank" rel="noopener" style="color: #0066cc; text-decoration: underline; font-size: 12px;">${r.address}</a>
        </div>`;
        marker.bindPopup(popupContent);
    });
};

export const showRandomView = (restaurants) => {
    document.getElementById('randomView').style.display = 'block';
    showRandomResult(restaurants);
};

export const showRandomResult = (restaurants = currentResults) => {
    const card = document.getElementById('randomCard');
    if (!restaurants?.length) {
        card.innerHTML = '<p>No restaurants available to choose from. Please broaden your search.</p>';
        return;
    }
    const r = restaurants[Math.floor(Math.random() * restaurants.length)];
    
    // Get the appropriate CSS class for the price
    const priceClass = `price-${r.price.replace(/\$/g, '\\$')}`;
    
    // Display price with range if available
    const priceDisplay = r.priceRange ? `${r.price} (${r.priceRange})` : r.price;
    
    card.innerHTML = `<h4>${r.name}</h4>
        <div class="card-header">
            <div class="cuisine">${r.cuisine.charAt(0).toUpperCase() + r.cuisine.slice(1)}</div>
            <div class="price-indicator ${priceClass}">${priceDisplay}</div>
        </div>
        <div class="rating">⭐ ${r.rating}/5.0</div>
        <div class="distance">📍 ${r.calculatedDistance.toFixed(1)} miles</div>
        <div class="address"><a href="${generateMapsLink(r.address)}" target="_blank" rel="noopener">${r.address}</a></div>`;
}; 

// Initialize review modal
export const initializeReviewModal = () => {
    // Create modal if it doesn't exist
    if (!reviewModal) {
        reviewModal = document.createElement('div');
        reviewModal.className = 'review-modal';
        reviewModal.id = 'reviewModal';
        
        reviewModalContent = document.createElement('div');
        reviewModalContent.className = 'review-modal-content';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'review-modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = closeReviewModal;
        
        reviewModalContent.appendChild(closeBtn);
        reviewModal.appendChild(reviewModalContent);
        
        // Close modal when clicking outside content
        reviewModal.addEventListener('click', (e) => {
            if (e.target === reviewModal) {
                closeReviewModal();
            }
        });
        
        document.body.appendChild(reviewModal);
    }
};

// Show review modal
const showReviewModal = (mode, restaurantId, restaurantName) => {
    currentRestaurantId = restaurantId;
    currentRestaurantName = restaurantName;
    
    // Clear previous content
    reviewModalContent.innerHTML = '';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'review-modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeReviewModal;
    reviewModalContent.appendChild(closeBtn);
    
    const title = document.createElement('h2');
    title.textContent = mode === 'write' ? `Write a Review for ${restaurantName}` : `Reviews for ${restaurantName}`;
    reviewModalContent.appendChild(title);
    
    if (mode === 'write') {
        const form = createReviewForm(restaurantId, restaurantName, () => {
            // After submitting, refresh the view
            closeReviewModal();
            showListView(); // Refresh the list view to show updated reviews
        });
        reviewModalContent.appendChild(form);
    } else {
        const reviewsDisplay = createReviewsDisplay(restaurantId);
        reviewModalContent.appendChild(reviewsDisplay);
        
        // Add a button to write a review
        const writeBtn = document.createElement('button');
        writeBtn.className = 'btn btn--primary';
        writeBtn.textContent = 'Write a Review';
        writeBtn.onclick = () => showReviewModal('write', restaurantId, restaurantName);
        reviewModalContent.appendChild(writeBtn);
    }
    
    // Show the modal
    reviewModal.classList.add('active');
};

// Close review modal
const closeReviewModal = () => {
    reviewModal.classList.remove('active');
}; 