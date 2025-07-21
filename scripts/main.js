// Optimized restaurant data - top-rated establishments across Houston metro
let mockRestaurants = []; // This will be populated from the JSON file

// Fetch restaurant data from the external JSON file
const fetchRestaurants = async () => {
    try {
        const response = await fetch('data/restaurants.json');
        if (!response.ok) throw new Error('Network response was not ok');
        mockRestaurants = await response.json();
    } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        // Fallback to a minimal set of restaurants if the fetch fails
        mockRestaurants = [
            {"name": "Uchi", "cuisine": "japanese", "rating": 4.8, "address": "904 Westheimer Rd, Houston, TX 77006", "lat": 29.7402, "lng": -95.3902}
        ];
    }
};

let map, currentResults = [], currentUserGpsLocation = null; // Stored GPS location
const HOUSTON_DEFAULT = { lat: 29.7604, lng: -95.3698 }; // Default location constant

// Optimized utility functions
const toRad = deg => deg * (Math.PI / 180);
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3959, dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Multi-select dropdown functionality
const getSelectedCuisines = () => Array.from(document.querySelectorAll('.dropdown-option input[type="checkbox"]:checked'))
    .map(cb => cb.value).filter(v => v !== '');

const updateDropdownText = () => {
    const selected = getSelectedCuisines(), text = document.querySelector('.selected-text');
    text.textContent = selected.length === 0 ? 'All Cuisines' : 
        selected.length === 1 ? selected[0].charAt(0).toUpperCase() + selected[0].slice(1) : 
        `${selected.length} Cuisines Selected`;
};

// Debounced update function to prevent lag
let updateTimeout;
const debouncedUpdateResultsCount = () => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
        const selected = getSelectedCuisines(), counter = document.getElementById('totalRestaurants');
        if (selected.length === 0) {
            counter.textContent = `${mockRestaurants.length}`;
        } else {
            // Use a more efficient filtering approach
            let count = 0;
            for (let i = 0; i < mockRestaurants.length; i++) {
                if (selected.includes(mockRestaurants[i].cuisine)) {
                    count++;
                }
            }
            counter.textContent = `${count} of ${mockRestaurants.length}`;
        }
    }, 150); // 150ms debounce
};

// Cached DOM elements to avoid repeated queries
let dropdownElements = null;

// Initialize dropdown with event listeners
const initializeDropdown = () => {
    // Cache all DOM elements once
    if (!dropdownElements) {
        dropdownElements = {
            dropdown: document.querySelector('.custom-dropdown'),
            selected: document.getElementById('dropdownSelected'),
            options: document.getElementById('dropdownOptions'),
            checkboxes: document.querySelectorAll('.dropdown-option input[type="checkbox"]'),
            allCuisinesCheckbox: document.querySelector('.dropdown-option input[value=""]')
        };
    }

    const { dropdown, selected, options, checkboxes, allCuisinesCheckbox } = dropdownElements;

    // Toggle dropdown visibility
    selected.addEventListener('click', (event) => {
        event.stopPropagation();
        options.classList.toggle('open');
        selected.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            options.classList.remove('open');
            selected.classList.remove('open');
        }
    });

    // Handle checkbox logic with simple performance optimization
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox === allCuisinesCheckbox && checkbox.checked) {
                // If "All Cuisines" is checked, uncheck all other options
                checkboxes.forEach(cb => {
                    if (cb !== allCuisinesCheckbox) cb.checked = false;
                });
            } else if (checkbox !== allCuisinesCheckbox && checkbox.checked) {
                // If a specific cuisine is checked, uncheck "All Cuisines"
                allCuisinesCheckbox.checked = false;
            }
            
            // If no checkboxes are checked, default to "All Cuisines"
            const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
            if (!anyChecked) {
                allCuisinesCheckbox.checked = true;
            }

            updateDropdownText();
            debouncedUpdateResultsCount();
        });
    });

    // Prevent clicks inside the options list from closing the dropdown
    options.addEventListener('click', (event) => {
        event.stopPropagation();
    });
};

// GPS location functionality - updated for clarity and reliability
const requestUserLocation = () => {
    const btn = document.getElementById('useLocationBtn'), status = document.getElementById('locationStatus'), addressInput = document.getElementById('address');
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser.';
        status.className = 'location-status error';
        return;
    }
    
    btn.disabled = true; 
    btn.textContent = '📍 Getting Location...'; 
    status.textContent = 'Requesting GPS signal...'; 
    status.className = 'location-status loading';
    
    navigator.geolocation.getCurrentPosition(
        pos => {
            // Store the precise coordinates globally
            currentUserGpsLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            
            // Update the UI to reflect the new location status
            addressInput.value = "Current Location";
            status.textContent = `✓ GPS Lock Acquired (Accuracy: ${Math.round(pos.coords.accuracy)}m)`;
            status.className = 'location-status success';
            btn.disabled = false; 
            btn.textContent = '📍 Use My Exact Location';
            
            // Automatically trigger a search after finding the location
            setTimeout(() => searchAndShow('list'), 500);
        },
        err => {
            const msgs = {
                1: 'Permission denied. Please enable location services.',
                2: 'Location unavailable. Could not detect a position.',
                3: 'Request timed out. Please try again.'
            };
            status.textContent = msgs[err.code] || 'An unknown location error occurred.';
            status.className = 'location-status error';
            btn.disabled = false; 
            btn.textContent = '📍 Use My Exact Location';
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
};

// Address autocomplete functionality
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
    item.textContent = suggestion.display_name;
    item.addEventListener('mouseenter', () => {
        item.style.background = 'rgba(240,244,255,0.8)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.background = 'white';
    });
    item.addEventListener('click', () => {
        selectSuggestion(suggestion);
    });
    return item;
};

const selectSuggestion = (suggestion) => {
    const addressInput = document.getElementById('address');
    addressInput.value = suggestion.display_name;
    hideAutocomplete();
    
    // Store the exact coordinates for later use
    addressInput.dataset.lat = suggestion.lat;
    addressInput.dataset.lng = suggestion.lon;
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
        suggestions.forEach((suggestion, index) => {
            container.appendChild(createSuggestionItem(suggestion, index));
        });
    }
    
    container.style.display = 'block';
};

const hideAutocomplete = () => {
    const container = document.getElementById('autocomplete-container');
    if (container) {
        container.style.display = 'none';
    }
};

const searchAddresses = async (query) => {
    if (query.length < 3) {
        hideAutocomplete();
        return;
    }
    
    try {
        // Focus on Houston metro area for better results
        const bounds = '28.5,-96.5,30.5,-94.5'; // Rough Houston metro bounds
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query + ' Houston Texas')}&viewbox=${bounds}&bounded=1`;
        
        const response = await fetch(url);
        const results = await response.json();
        
        // Filter for addresses that actually contain the query
        const filteredResults = results.filter(result => 
            result.display_name.toLowerCase().includes(query.toLowerCase()) &&
            (result.display_name.toLowerCase().includes('texas') || 
             result.display_name.toLowerCase().includes('tx'))
        );
        
        currentSuggestions = filteredResults;
        showAutocomplete(filteredResults);
    } catch (error) {
        console.error('Address search failed:', error);
        hideAutocomplete();
    }
};

const initializeAddressAutocomplete = () => {
    const addressInput = document.getElementById('address');
    const formGroup = addressInput.parentElement;
    
    // Make the form group relative for positioning
    formGroup.style.position = 'relative';
    
    // Create and append autocomplete container
    const autocompleteContainer = createAutocompleteContainer();
    formGroup.appendChild(autocompleteContainer);
    
    // Add input event listener for autocomplete
    addressInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        // Clear stored coordinates when user types
        delete addressInput.dataset.lat;
        delete addressInput.dataset.lng;
        
        clearTimeout(autocompleteTimeout);
        
        if (query.length >= 3) {
            autocompleteTimeout = setTimeout(() => {
                searchAddresses(query);
            }, 300); // 300ms debounce
        } else {
            hideAutocomplete();
        }
    });
    
    // Hide autocomplete when clicking outside
    document.addEventListener('click', (e) => {
        if (!formGroup.contains(e.target)) {
            hideAutocomplete();
        }
    });
    
    // Hide autocomplete when input loses focus
    addressInput.addEventListener('blur', () => {
        // Small delay to allow clicking on suggestions
        setTimeout(hideAutocomplete, 150);
    });
    
    // Handle keyboard navigation
    addressInput.addEventListener('keydown', (e) => {
        const container = document.getElementById('autocomplete-container');
        const items = container.querySelectorAll('div[style*="cursor: pointer"]');
        
        if (e.key === 'Escape') {
            hideAutocomplete();
        } else if (e.key === 'ArrowDown' && items.length > 0) {
            e.preventDefault();
            const firstItem = items[0];
            firstItem.style.background = 'rgba(240,244,255,0.8)';
            firstItem.focus();
        }
    });
};

// Geocoding function - updated to use stored coordinates from autocomplete
const geocodeLocation = async input => {
    const cleanedInput = input?.trim().toLowerCase();

    if (cleanedInput === 'current location') {
        return currentUserGpsLocation || HOUSTON_DEFAULT;
    }

    if (!cleanedInput) return HOUSTON_DEFAULT;
    
    // Check if we have stored coordinates from autocomplete
    const addressInput = document.getElementById('address');
    if (addressInput.dataset.lat && addressInput.dataset.lng) {
        return {
            lat: parseFloat(addressInput.dataset.lat),
            lng: parseFloat(addressInput.dataset.lng)
        };
    }
    
    const coordMatch = cleanedInput.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
    if (coordMatch) return { lat: parseFloat(coordMatch[1]), lng: parseFloat(coordMatch[2]) };
    
    // City lookup (basic fallback)
    const cities = {
        houston: [29.7604, -95.3698], katy: [29.7391, -95.7521], 'sugar land': [29.5844, -95.6349],
        pearland: [29.5583, -95.2861], woodlands: [30.1588, -95.4913], spring: [30.0799, -95.4171],
        conroe: [30.3133, -95.4904], cypress: [29.9733, -95.6904], humble: [30.0133, -95.2604],
        pasadena: [29.6911, -95.2091], galveston: [29.3013, -94.7977]
    };
    
    for (const [city, coords] of Object.entries(cities)) 
        if (cleanedInput.includes(city)) return { lat: coords[0], lng: coords[1] };
    
    // If no match and it looks like an address, try to geocode it
    if (cleanedInput.includes('st') || cleanedInput.includes('street') || 
        cleanedInput.includes('ave') || cleanedInput.includes('avenue') ||
        cleanedInput.includes('rd') || cleanedInput.includes('road') ||
        cleanedInput.includes('ln') || cleanedInput.includes('lane') ||
        cleanedInput.includes('dr') || cleanedInput.includes('drive') ||
        /\d/.test(cleanedInput)) {
        
        try {
            const bounds = '28.5,-96.5,30.5,-94.5';
            const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(cleanedInput + ' Houston Texas')}&viewbox=${bounds}&bounded=1`;
            const response = await fetch(url);
            const results = await response.json();
            
            if (results.length > 0) {
                return {
                    lat: parseFloat(results[0].lat),
                    lng: parseFloat(results[0].lon)
                };
            }
        } catch (error) {
            console.warn('Geocoding failed:', error);
        }
    }
    
    console.warn("Could not geocode input, defaulting to Houston.");
    return HOUSTON_DEFAULT;
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await fetchRestaurants(); // Load restaurants first
    
    ['showList', 'showMap', 'randomPick', 'pickAnother', 'useLocationBtn'].forEach((id, i) => 
        document.getElementById(id).onclick = [
            () => searchAndShow('list'), 
            () => searchAndShow('map'), 
            () => searchAndShow('random'), 
            () => showRandomResult(),
            requestUserLocation
        ][i]);
    initializeDropdown();
    initializeAddressAutocomplete(); // Initialize address autocomplete
    document.getElementById('totalRestaurants').textContent = mockRestaurants.length;
});

// Main search function - refactored to use a local searchCenter variable
const searchAndShow = async viewType => {
    const address = document.getElementById('address').value;
    const range = parseInt(document.getElementById('range').value) || 10;
    const selectedCuisines = getSelectedCuisines();
    
    try {
        const searchCenter = await geocodeLocation(address); // Use a local variable for the search point
        
        currentResults = mockRestaurants.map(r => ({ 
            ...r, 
            calculatedDistance: calculateDistance(searchCenter.lat, searchCenter.lng, r.lat, r.lng) 
        }))
        .filter(r => r.calculatedDistance <= range && (selectedCuisines.length === 0 || selectedCuisines.includes(r.cuisine)))
        .sort((a, b) => a.calculatedDistance - b.calculatedDistance);
        
        const section = document.getElementById('resultsSection'), title = document.getElementById('resultsTitle');
        section.style.display = 'block'; 
        section.scrollIntoView({ behavior: 'smooth' });
        title.textContent = currentResults.length === 0 ? `No restaurants found within ${range} miles` : 
            `Found ${currentResults.length} restaurant${currentResults.length !== 1 ? 's' : ''} within ${range} miles`;
        
        ['listView', 'mapView', 'randomView'].forEach(v => document.getElementById(v).style.display = 'none');
        
        const viewFunction = { list: showListView, map: showMapView, random: showRandomView }[viewType];
        // Pass the explicit searchCenter to the map view function
        if (viewType === 'map') {
            viewFunction(currentResults, searchCenter);
        } else {
            viewFunction(currentResults);
        }
    } catch (err) { 
        console.error('Search failed:', err); 
        alert('Search failed. Please try again.'); 
    }
};

// Optimized view functions
const showListView = restaurants => {
    document.getElementById('listView').style.display = 'block';
    document.getElementById('resultsGrid').innerHTML = restaurants.length === 0 ? '<p>No restaurants found.</p>' :
        restaurants.map(r => `<div class="card"><h3>${r.name}</h3><div class="cuisine">${r.cuisine.charAt(0).toUpperCase() + r.cuisine.slice(1)}</div>
        <div class="rating">⭐ ${r.rating}/5.0</div><div class="distance">📍 ${r.calculatedDistance.toFixed(1)} miles</div>
        <div class="address"><a href="${generateMapsLink(r.address)}" target="_blank" rel="noopener">${r.address}</a></div></div>`).join('');
};

const showMapView = (restaurants, searchCenter) => {
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
        const popupContent = `<div style="text-align: center; min-width: 200px;">
            <strong style="font-size: 14px;">${r.name}</strong><br>
            <span style="color: #666;">${r.cuisine.charAt(0).toUpperCase() + r.cuisine.slice(1)}</span><br>
            <span style="color: #ff6600;">⭐ ${r.rating}/5.0</span><br>
            <span style="color: #002D62;">📍 ${r.calculatedDistance.toFixed(1)} miles</span><br>
            <a href="${generateMapsLink(r.address)}" target="_blank" rel="noopener" style="color: #0066cc; text-decoration: underline; font-size: 12px;">${r.address}</a>
        </div>`;
        marker.bindPopup(popupContent);
    });
};

const showRandomView = restaurants => {
    document.getElementById('randomView').style.display = 'block';
    showRandomResult(restaurants);
};

const showRandomResult = (restaurants = currentResults) => {
    const card = document.getElementById('randomCard');
    if (!restaurants?.length) return card.innerHTML = '<p>No restaurants available.</p>';
    const r = restaurants[Math.floor(Math.random() * restaurants.length)];
    card.innerHTML = `<h4>${r.name}</h4><div class="cuisine">${r.cuisine.charAt(0).toUpperCase() + r.cuisine.slice(1)}</div>
        <div class="rating">⭐ ${r.rating}/5.0</div><div class="distance">📍 ${r.calculatedDistance.toFixed(1)} miles</div>
        <div class="address"><a href="${generateMapsLink(r.address)}" target="_blank" rel="noopener">${r.address}</a></div>`;
};

// Generate maps link that works for both iOS (Apple Maps) and other devices (Google Maps)
const generateMapsLink = address => {
    const encodedAddress = encodeURIComponent(address);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return isIOS ? `maps://?q=${encodedAddress}` : `https://maps.google.com/maps?q=${encodedAddress}`;
};