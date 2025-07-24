// scripts/autocomplete.js
let autocompleteTimeout;
let currentSuggestions = [];

// Special case addresses that need specific handling
const SPECIAL_ADDRESSES = {
    '3313 orchard bridge': { lat: 29.7062, lng: -95.8010, display: '3313 Orchard Bridge Ln, Katy, TX 77494' },
    'orchard bridge': { lat: 29.7062, lng: -95.8010, display: 'Orchard Bridge Ln, Katy, TX 77494' }
};

// Common Houston area addresses for autofill
const COMMON_ADDRESSES = [
    "Downtown Houston, TX",
    "The Galleria, Houston, TX",
    "Memorial Park, Houston, TX",
    "NRG Stadium, Houston, TX",
    "Rice University, Houston, TX",
    "University of Houston, TX",
    "Katy Mills Mall, Katy, TX",
    "Sugar Land Town Square, TX",
    "The Woodlands Mall, TX",
    "Kemah Boardwalk, TX",
    "Galveston Seawall, TX"
];

// Common street names for number-based suggestions
const COMMON_STREETS = [
    "Main St", "Oak Dr", "Center St", "Park Ave", "Washington St", 
    "Broadway St", "Market St", "Westheimer Rd", "Richmond Ave", "Kirby Dr",
    "Shepherd Dr", "Heights Blvd", "Memorial Dr", "San Felipe St", "Montrose Blvd",
    "Fannin St", "Bellaire Blvd", "Bissonnet St", "Holcombe Blvd", "Waugh Dr"
];

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
    
    // Handle both string suggestions and API result objects
    let displayText = typeof suggestion === 'string' 
        ? suggestion 
        : suggestion.display_name.replace(', United States', '');
    
    if (typeof suggestion !== 'string' && displayText.length > 60) {
        const parts = displayText.split(', ');
        if (parts.length > 4) displayText = parts.slice(0, 4).join(', ');
    }
    
    item.textContent = displayText;
    item.addEventListener('mouseenter', () => { item.style.background = 'rgba(240,244,255,0.8)'; });
    item.addEventListener('mouseleave', () => { item.style.background = 'white'; });
    
    if (typeof suggestion === 'string') {
        item.addEventListener('click', () => selectCommonAddress(suggestion));
    } else {
        item.addEventListener('click', () => selectSuggestion(suggestion));
    }
    
    return item;
};

const selectCommonAddress = (address) => {
    const addressInput = document.getElementById('address');
    addressInput.value = address;
    hideAutocomplete();
    
    // Clear coordinates to force geocoding on search
    delete addressInput.dataset.lat;
    delete addressInput.dataset.lng;
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
    
    hideAutocomplete();
};

const showAutocomplete = (suggestions) => {
    const container = document.getElementById('autocomplete-container');
    container.innerHTML = '';
    
    if (!suggestions || suggestions.length === 0) {
        // Show common addresses when no matches found
        showCommonAddresses();
        return;
    }
    
    const fragment = document.createDocumentFragment();
    suggestions.forEach((suggestion, index) => 
        fragment.appendChild(createSuggestionItem(suggestion, index))
    );
    
    container.appendChild(fragment);
    container.style.display = 'block';
};

const showCommonAddresses = () => {
    const container = document.getElementById('autocomplete-container');
    container.innerHTML = '';
    
    const header = document.createElement('div');
    header.className = 'autocomplete-header';
    header.textContent = 'Popular Places:';
    container.appendChild(header);
    
    const fragment = document.createDocumentFragment();
    COMMON_ADDRESSES.forEach((address, index) => 
        fragment.appendChild(createSuggestionItem(address, index))
    );
    
    container.appendChild(fragment);
    container.style.display = 'block';
};

// Generate street address suggestions based on a number
const generateStreetSuggestions = (number) => {
    const suggestions = [];
    
    // Create suggestions with the number and common street names
    COMMON_STREETS.forEach(street => {
        suggestions.push(`${number} ${street}, Houston, TX`);
    });
    
    // Add some area-specific suggestions
    if (parseInt(number) > 1000) {
        suggestions.push(`${number} Westheimer Rd, Houston, TX`);
        suggestions.push(`${number} Richmond Ave, Houston, TX`);
        suggestions.push(`${number} Memorial Dr, Houston, TX`);
        suggestions.push(`${number} Katy Fwy, Houston, TX`);
        suggestions.push(`${number} FM 1960, Houston, TX`);
    }
    
    return suggestions;
};

// Show street number suggestions
const showStreetSuggestions = (number) => {
    const container = document.getElementById('autocomplete-container');
    container.innerHTML = '';
    
    const header = document.createElement('div');
    header.className = 'autocomplete-header';
    header.textContent = 'Street Address Suggestions:';
    container.appendChild(header);
    
    const fragment = document.createDocumentFragment();
    const suggestions = generateStreetSuggestions(number);
    
    suggestions.forEach((address, index) => 
        fragment.appendChild(createSuggestionItem(address, index))
    );
    
    container.appendChild(fragment);
    container.style.display = 'block';
};

const hideAutocomplete = () => {
    const container = document.getElementById('autocomplete-container');
    if (container) container.style.display = 'none';
};

const searchAddresses = async (query) => {
    if (query.length < 3) {
        showCommonAddresses();
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    // Check for special case addresses first
    for (const [key, value] of Object.entries(SPECIAL_ADDRESSES)) {
        if (lowerQuery.includes(key)) {
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
    
    // Check if query is just a number or starts with a number
    const numberMatch = query.match(/^(\d+)(\s+)?$/);
    if (numberMatch) {
        // Show street suggestions for this number
        showStreetSuggestions(numberMatch[1]);
        return;
    }
    
    // Filter common addresses that match the query
    const matchingCommonAddresses = COMMON_ADDRESSES.filter(addr => 
        addr.toLowerCase().includes(lowerQuery)
    );
    
    try {
        const bounds = '28.5,-96.5,30.5,-94.5';
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}, Houston, TX&viewbox=${bounds}&bounded=1`;
        
        const response = await fetch(url);
        if (!response.ok) {
            showAutocomplete(matchingCommonAddresses);
            return;
        }
        
        const results = await response.json();
        if (!results || results.length === 0) {
            showAutocomplete(matchingCommonAddresses);
            return;
        }
        
        // Filter results to Texas addresses
        const filteredResults = results.filter(result => 
            (result.display_name.toLowerCase().includes('texas') || 
             result.display_name.toLowerCase().includes('tx'))
        );
        
        // Combine API results with matching common addresses
        currentSuggestions = [...filteredResults];
        
        if (filteredResults.length === 0) {
            showAutocomplete(matchingCommonAddresses);
        } else {
            showAutocomplete(filteredResults);
        }
        
        // If there's only one result, auto-select it
        if (filteredResults.length === 1) {
            selectSuggestion(filteredResults[0]);
        }
    } catch (error) {
        showAutocomplete(matchingCommonAddresses);
    }
};

export const initializeAddressAutocomplete = () => {
    const addressInput = document.getElementById('address');
    const formGroup = addressInput.parentElement;
    formGroup.style.position = 'relative';
    const autocompleteContainer = createAutocompleteContainer();
    formGroup.appendChild(autocompleteContainer);

    // Show common addresses on focus
    addressInput.addEventListener('focus', () => {
        if (!addressInput.value || addressInput.value.length < 3) {
            showCommonAddresses();
        }
    });

    // Clear coordinates when user starts typing
    addressInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        delete addressInput.dataset.lat;
        delete addressInput.dataset.lng;
        clearTimeout(autocompleteTimeout);
        
        if (query.length >= 3) {
            autocompleteTimeout = setTimeout(() => searchAddresses(query), 300);
        } else if (query.length === 0) {
            showCommonAddresses();
        } else if (/^\d+$/.test(query)) {
            // If it's just a number, show street suggestions immediately
            showStreetSuggestions(query);
        } else {
            hideAutocomplete();
        }
    });

    // Handle all search buttons (list, map, random)
    ['showList', 'showMap', 'randomPick'].forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (!button) return;
        
        const originalOnClick = button.onclick;
        button.onclick = async (e) => {
            const query = addressInput.value.trim();
            
            // If we don't have coordinates yet but have an address, try to geocode it
            if (query && query !== 'Current Location' && !addressInput.dataset.lat) {
                // Check for special case addresses first
                const lowerQuery = query.toLowerCase();
                for (const [key, value] of Object.entries(SPECIAL_ADDRESSES)) {
                    if (lowerQuery.includes(key)) {
                        addressInput.dataset.lat = value.lat.toString();
                        addressInput.dataset.lng = value.lng.toString();
                        break;
                    }
                }
            }
            
            // Continue with original handler
            if (originalOnClick) originalOnClick(e);
        };
    });

    document.addEventListener('click', (e) => {
        if (!formGroup.contains(e.target)) hideAutocomplete();
    });

    addressInput.addEventListener('blur', () => {
        // Give time for click events on suggestions to fire before hiding
        setTimeout(hideAutocomplete, 150);
    });
}; 