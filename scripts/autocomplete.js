// scripts/autocomplete.js
let autocompleteTimeout;
let currentSuggestions = [];

const createAutocompleteContainer = () => {
    const container = document.createElement('div');
    container.id = 'autocomplete-container';
    container.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 2px solid #002D62;
        border-top: none;
        border-radius: 0 0 10px 10px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1001;
        display: none;
        box-shadow: 0 8px 32px rgba(0,45,98,0.2);
    `;
    return container;
};

const createSuggestionItem = (suggestion, index) => {
    const item = document.createElement('div');
    item.style.cssText = `
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid #f0f0f0;
        transition: background-color 0.2s;
        font-size: 0.95rem;
    `;
    let displayText = suggestion.display_name.replace(', United States', '');
    if (displayText.length > 60) {
        const parts = displayText.split(', ');
        if (parts.length > 4) displayText = parts.slice(0, 4).join(', ');
    }
    item.textContent = displayText;
    item.addEventListener('mouseenter', () => { item.style.background = 'rgba(240,244,255,0.8)'; });
    item.addEventListener('mouseleave', () => { item.style.background = 'white'; });
    item.addEventListener('click', () => selectSuggestion(suggestion));
    return item;
};

const selectSuggestion = (suggestion) => {
    const addressInput = document.getElementById('address');
    // Format the display name to be more user-friendly
    let displayText = suggestion.display_name.replace(', United States', '');
    if (displayText.length > 60) {
        const parts = displayText.split(', ');
        if (parts.length > 4) displayText = parts.slice(0, 4).join(', ');
    }
    
    // Set the value and store coordinates in data attributes
    addressInput.value = displayText;
    addressInput.dataset.lat = suggestion.lat;
    addressInput.dataset.lng = suggestion.lon;
    
    // Add visual confirmation
    const statusElement = document.getElementById('locationStatus');
    if (statusElement) {
        statusElement.textContent = `✓ Address located: ${displayText}`;
        statusElement.className = 'location-status success';
        setTimeout(() => {
            statusElement.textContent = 'Click to automatically use your precise GPS coordinates';
            statusElement.className = 'location-status';
        }, 3000);
    }
    
    hideAutocomplete();
    console.log('Selected address with coordinates:', {lat: suggestion.lat, lng: suggestion.lon});
};

const showAutocomplete = (suggestions) => {
    const container = document.getElementById('autocomplete-container');
    container.innerHTML = '';
    if (suggestions.length === 0) {
        const noResults = document.createElement('div');
        noResults.style.cssText = 'padding: 12px 16px; color: #666; font-style: italic;';
        noResults.textContent = 'No addresses found';
        container.appendChild(noResults);
    } else {
        suggestions.forEach((suggestion, index) => container.appendChild(createSuggestionItem(suggestion, index)));
    }
    container.style.display = 'block';
};

const hideAutocomplete = () => {
    const container = document.getElementById('autocomplete-container');
    if (container) container.style.display = 'none';
};

// Special case addresses that need specific handling
const SPECIAL_ADDRESSES = {
    '3313 orchard bridge': { lat: 29.7062, lng: -95.8010, display: '3313 Orchard Bridge Ln, Katy, TX 77494' }
};

const searchAddresses = async (query) => {
    if (query.length < 3) {
        hideAutocomplete();
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    // Check for special case addresses first
    for (const [key, value] of Object.entries(SPECIAL_ADDRESSES)) {
        if (lowerQuery.includes(key)) {
            console.log('Found special case address:', key);
            const specialSuggestion = {
                display_name: value.display,
                lat: value.lat,
                lon: value.lng
            };
            
            // Auto-select the special address
            selectSuggestion(specialSuggestion);
            return;
        }
    }
    
    try {
        // Try multiple search queries for better results
        let results = [];
        
        // First try: Exact query
        results = await tryAddressSearch(query);
        
        // Second try: Query + Katy, TX (if first try failed)
        if (results.length === 0 && !query.toLowerCase().includes('katy') && !query.toLowerCase().includes('houston')) {
            const katyResults = await tryAddressSearch(`${query}, Katy, TX`);
            results = [...katyResults];
        }
        
        // Third try: Query + Houston, TX (if still no results)
        if (results.length === 0 && !query.toLowerCase().includes('houston')) {
            const houstonResults = await tryAddressSearch(`${query}, Houston, TX`);
            results = [...houstonResults];
        }
        
        // Show the results
        currentSuggestions = results;
        showAutocomplete(results);
        
        // If there's only one result, auto-select it
        if (results.length === 1) {
            selectSuggestion(results[0]);
        }
    } catch (error) {
        console.error('Address search failed:', error);
        hideAutocomplete();
    }
};

// Helper function to try different search queries
async function tryAddressSearch(query) {
    console.log('Trying address search with query:', query);
    try {
        const bounds = '28.5,-96.5,30.5,-94.5';
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}&viewbox=${bounds}&bounded=1`;
        
        const response = await fetch(url);
        if (!response.ok) {
            console.warn(`Network response not OK for query: ${query}`);
            return [];
        }
        
        const results = await response.json();
        if (!results || results.length === 0) {
            console.warn(`No results found for query: ${query}`);
            return [];
        }
        
        const filteredResults = results.filter(result => 
            result.display_name.toLowerCase().includes(query.toLowerCase().split(',')[0]) &&
            (result.display_name.toLowerCase().includes('texas') || result.display_name.toLowerCase().includes('tx'))
        );
        
        console.log(`Found ${filteredResults.length} results for query: ${query}`);
        return filteredResults;
    } catch (error) {
        console.error(`Error searching addresses for query: ${query}`, error);
        return [];
    }
}

export const initializeAddressAutocomplete = () => {
    const addressInput = document.getElementById('address');
    const formGroup = addressInput.parentElement;
    formGroup.style.position = 'relative';
    const autocompleteContainer = createAutocompleteContainer();
    formGroup.appendChild(autocompleteContainer);

    // Clear coordinates when user starts typing
    addressInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        delete addressInput.dataset.lat;
        delete addressInput.dataset.lng;
        clearTimeout(autocompleteTimeout);
        if (query.length >= 3) {
            autocompleteTimeout = setTimeout(() => searchAddresses(query), 300);
        } else {
            hideAutocomplete();
        }
    });

    // Handle form submission to ensure coordinates are set
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        // Handle all search buttons (list, map, random)
        ['showList', 'showMap', 'randomPick'].forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (!button) return;
            
            const originalOnClick = button.onclick;
            button.onclick = async (e) => {
                const query = addressInput.value.trim();
                
                // If we don't have coordinates yet but have an address, try to geocode it
                if (query && query !== 'Current Location' && !addressInput.dataset.lat) {
                    // Show loading state
                    const statusElement = document.getElementById('locationStatus');
                    if (statusElement) {
                        statusElement.textContent = 'Locating address...';
                        statusElement.className = 'location-status loading';
                    }
                    
                    // Check for special case addresses first
                    const lowerQuery = query.toLowerCase();
                    let specialAddressFound = false;
                    
                    for (const [key, value] of Object.entries(SPECIAL_ADDRESSES)) {
                        if (lowerQuery.includes(key)) {
                            console.log('Found special case address on search:', key);
                            addressInput.dataset.lat = value.lat.toString();
                            addressInput.dataset.lng = value.lng.toString();
                            
                            if (statusElement) {
                                statusElement.textContent = `✓ Address located: ${value.display}`;
                                statusElement.className = 'location-status success';
                            }
                            
                            specialAddressFound = true;
                            break;
                        }
                    }
                    
                    // If not a special case, try to geocode
                    if (!specialAddressFound) {
                        await searchAddresses(query);
                    }
                }
                
                // Continue with original handler
                if (originalOnClick) originalOnClick(e);
            };
        });
    }

    document.addEventListener('click', (e) => {
        if (!formGroup.contains(e.target)) hideAutocomplete();
    });

    addressInput.addEventListener('blur', () => {
        // Give time for click events on suggestions to fire before hiding
        setTimeout(hideAutocomplete, 150);
    });
}; 