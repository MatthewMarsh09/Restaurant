// scripts/app.js
import { fetchRestaurants, getSelectedCuisines, getSelectedPrices, mockRestaurants, restaurantsByCuisine, restaurantsByPrice } from './restaurants.js';
import { calculateDistance, geocodeLocation, requestUserLocation } from './location.js';
import { initializeDropdown } from './dropdown.js';
import { initializeAddressAutocomplete } from './autocomplete.js';
import { initializeChatbot } from './chatbot.js';
import { showListView, showMapView, showRandomView, showRandomResult, updateCurrentResults, changePage } from './ui.js';

export const HOUSTON_DEFAULT = { lat: 29.7604, lng: -95.3698 };

const searchAndShow = async (viewType) => {
    const address = document.getElementById('address').value;
    const range = parseInt(document.getElementById('range').value) || 10;
    const selectedCuisines = getSelectedCuisines();
    const selectedPrices = getSelectedPrices();
    
    try {
        const searchCenter = await geocodeLocation(address);
        
        // First filter by cuisine if selected
        let restaurantsToSearch = selectedCuisines.length > 0
            ? selectedCuisines.flatMap(c => restaurantsByCuisine[c] || [])
            : mockRestaurants;
            
        // Then filter by price if selected
        if (selectedPrices.length > 0) {
            restaurantsToSearch = restaurantsToSearch.filter(r => 
                selectedPrices.includes(r.price)
            );
        }

        const results = restaurantsToSearch.map(r => ({ 
            ...r, 
            calculatedDistance: calculateDistance(searchCenter.lat, searchCenter.lng, r.lat, r.lng) 
        }))
        .filter(r => r.calculatedDistance <= range)
        .sort((a, b) => a.calculatedDistance - b.calculatedDistance);
        
        updateCurrentResults(results);

        const section = document.getElementById('resultsSection'), title = document.getElementById('resultsTitle');
        section.style.display = 'block'; 
        section.scrollIntoView({ behavior: 'smooth' });
        title.textContent = results.length === 0 ? `No restaurants found within ${range} miles` : 
            `Found ${results.length} restaurant${results.length !== 1 ? 's' : ''} within ${range} miles`;
        
        ['listView', 'mapView', 'randomView'].forEach(v => document.getElementById(v).style.display = 'none');
        
        const viewFunction = { list: showListView, map: showMapView, random: showRandomView }[viewType];
        if (viewType === 'map') {
            viewFunction(results, searchCenter);
        } else {
            viewFunction(results);
        }
    } catch (err) { 
        console.error('Search failed:', err); 
        alert('Search failed. Please try again.'); 
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await fetchRestaurants();
    document.getElementById('totalRestaurants').textContent = mockRestaurants.length;

    document.getElementById('showList').onclick = () => searchAndShow('list');
    document.getElementById('showMap').onclick = () => searchAndShow('map');
    document.getElementById('randomPick').onclick = () => searchAndShow('random');
    document.getElementById('pickAnother').onclick = () => showRandomResult();
    document.getElementById('useLocationBtn').onclick = () => requestUserLocation(searchAndShow);
    document.getElementById('prevPageBtn').onclick = () => changePage(-1);
    document.getElementById('nextPageBtn').onclick = () => changePage(1);

    initializeDropdown();
    initializeAddressAutocomplete();
    initializeChatbot();
}); 