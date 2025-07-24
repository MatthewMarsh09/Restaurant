// scripts/restaurants.js
import { verifyRestaurantCoordinates } from './location.js';

export let mockRestaurants = [];
export let restaurantsByCuisine = {};
export let restaurantsByPrice = {};

export const fetchRestaurants = async () => {
    try {
        const response = await fetch('data/restaurants.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Add price ranges if not present
        mockRestaurants = data.map(restaurant => {
            if (!restaurant.price) {
                // Assign price based on cuisine type as a fallback
                if (['fast food', 'pizza', 'mexican', 'chinese'].includes(restaurant.cuisine.toLowerCase())) {
                    restaurant.price = '$';
                } else if (['seafood', 'steakhouse', 'french', 'japanese'].includes(restaurant.cuisine.toLowerCase())) {
                    restaurant.price = '$$$';
                } else {
                    restaurant.price = '$$';
                }
            }
            return restaurant;
        });
        
        // Pre-process data for fast filtering by cuisine
        restaurantsByCuisine = {};
        mockRestaurants.forEach(r => {
            const cuisine = r.cuisine.toLowerCase();
            if (!restaurantsByCuisine[cuisine]) {
                restaurantsByCuisine[cuisine] = [];
            }
            restaurantsByCuisine[cuisine].push(r);
        });
        
        // Pre-process data for fast filtering by price
        restaurantsByPrice = {
            '$': [],
            '$$': [],
            '$$$': [],
            '$$$$': []
        };
        
        mockRestaurants.forEach(r => {
            if (restaurantsByPrice[r.price]) {
                restaurantsByPrice[r.price].push(r);
            }
        });
        
        return mockRestaurants;

    } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        // Provide a default or handle the error appropriately
        mockRestaurants = [{"name": "Uchi", "cuisine": "japanese", "rating": 4.8, "address": "904 Westheimer Rd, Houston, TX 77006", "lat": 29.7402, "lng": -95.3902, "price": "$$$"}];
        return mockRestaurants;
    }
};

export const getSelectedCuisines = () => Array.from(document.querySelectorAll('.dropdown-option input[type="checkbox"]:checked'))
    .map(cb => cb.value).filter(v => v !== '');

export const getSelectedPrices = () => Array.from(document.querySelectorAll('.price-option input[type="checkbox"]:checked'))
    .map(cb => cb.value).filter(v => v !== ''); 

// Add a function to verify and update restaurant coordinates
export const verifyAllRestaurantCoordinates = async () => {
    const statusContainer = document.createElement('div');
    statusContainer.className = 'verification-status';
    statusContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255,255,255,0.95);
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 300px;
        font-size: 14px;
    `;
    document.body.appendChild(statusContainer);
    
    try {
        statusContainer.textContent = 'Starting coordinate verification...';
        
        // Verify all restaurant coordinates
        const results = await verifyRestaurantCoordinates(mockRestaurants);
        
        // Display results
        statusContainer.innerHTML = `
            <strong>Verification Complete:</strong><br>
            ✅ ${results.verified.length} verified<br>
            ⚠️ ${results.needsReview.length} need review<br>
            ❌ ${results.failed.length} failed
        `;
        
        // If there are restaurants that need review, create a downloadable report
        if (results.needsReview.length > 0) {
            const reportBtn = document.createElement('button');
            reportBtn.textContent = 'Download Report';
            reportBtn.style.cssText = `
                background: #0275d8;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                margin-top: 10px;
                cursor: pointer;
            `;
            statusContainer.appendChild(reportBtn);
            
            reportBtn.addEventListener('click', () => {
                // Create report data
                const reportData = {
                    verified: results.verified.length,
                    needsReview: results.needsReview,
                    failed: results.failed
                };
                
                // Create downloadable JSON file
                const dataStr = JSON.stringify(reportData, null, 2);
                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                
                const downloadLink = document.createElement('a');
                downloadLink.setAttribute('href', dataUri);
                downloadLink.setAttribute('download', 'restaurant-verification-report.json');
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
        }
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #666;
        `;
        statusContainer.appendChild(closeBtn);
        
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(statusContainer);
        });
        
        // Auto-remove after 30 seconds
        setTimeout(() => {
            if (document.body.contains(statusContainer)) {
                document.body.removeChild(statusContainer);
            }
        }, 30000);
        
        return results;
    } catch (error) {
        console.error('Error verifying coordinates:', error);
        statusContainer.innerHTML = `
            <strong>Verification Error:</strong><br>
            ${error.message}
        `;
        
        // Auto-remove after 10 seconds on error
        setTimeout(() => {
            if (document.body.contains(statusContainer)) {
                document.body.removeChild(statusContainer);
            }
        }, 10000);
        
        return null;
    }
}; 