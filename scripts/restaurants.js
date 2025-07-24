// scripts/restaurants.js
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