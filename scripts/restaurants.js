// scripts/restaurants.js
export let mockRestaurants = [];
export let restaurantsByCuisine = {};

export const fetchRestaurants = async () => {
    try {
        const response = await fetch('data/restaurants.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        mockRestaurants = data;
        
        // Pre-process data for fast filtering
        restaurantsByCuisine = {};
        mockRestaurants.forEach(r => {
            const cuisine = r.cuisine.toLowerCase();
            if (!restaurantsByCuisine[cuisine]) {
                restaurantsByCuisine[cuisine] = [];
            }
            restaurantsByCuisine[cuisine].push(r);
        });
        
        return mockRestaurants;

    } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        // Provide a default or handle the error appropriately
        mockRestaurants = [{"name": "Uchi", "cuisine": "japanese", "rating": 4.8, "address": "904 Westheimer Rd, Houston, TX 77006", "lat": 29.7402, "lng": -95.3902}];
        return mockRestaurants;
    }
};

export const getSelectedCuisines = () => Array.from(document.querySelectorAll('.dropdown-option input[type="checkbox"]:checked'))
    .map(cb => cb.value).filter(v => v !== ''); 