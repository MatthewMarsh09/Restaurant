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

const searchAddresses = async (query) => {
    if (query.length < 3) {
        hideAutocomplete();
        return;
    }
    try {
        const bounds = '28.5,-96.5,30.5,-94.5';
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query + ' Houston Texas')}&viewbox=${bounds}&bounded=1`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const results = await response.json();
        if (!results || results.length === 0) {
            showAutocomplete([]);
            return;
        }
        
        const filteredResults = results.filter(result => 
            result.display_name.toLowerCase().includes(query.toLowerCase()) &&
            (result.display_name.toLowerCase().includes('texas') || result.display_name.toLowerCase().includes('tx'))
        );
        
        currentSuggestions = filteredResults;
        showAutocomplete(filteredResults);
        
        // If there's only one result and it's a perfect match, auto-select it
        if (filteredResults.length === 1 && 
            filteredResults[0].display_name.toLowerCase().includes(query.toLowerCase())) {
            selectSuggestion(filteredResults[0]);
        }
    } catch (error) {
        console.error('Address search failed:', error);
        hideAutocomplete();
    }
};

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
        const originalOnClick = document.getElementById('showList').onclick;
        document.getElementById('showList').onclick = async (e) => {
            const query = addressInput.value.trim();
            
            // If we don't have coordinates yet but have an address, try to geocode it
            if (query && query !== 'Current Location' && !addressInput.dataset.lat) {
                // Show loading state
                const statusElement = document.getElementById('locationStatus');
                if (statusElement) {
                    statusElement.textContent = 'Locating address...';
                    statusElement.className = 'location-status loading';
                }
                
                // Try to geocode
                await searchAddresses(query);
                
                // If still no coordinates, the geocoding will handle the default
            }
            
            // Continue with original handler
            if (originalOnClick) originalOnClick(e);
        };
    }

    document.addEventListener('click', (e) => {
        if (!formGroup.contains(e.target)) hideAutocomplete();
    });

    addressInput.addEventListener('blur', () => {
        // Give time for click events on suggestions to fire before hiding
        setTimeout(hideAutocomplete, 150);
    });
}; 