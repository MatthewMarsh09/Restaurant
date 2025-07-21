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

const updateResultsCount = () => {
    const selected = getSelectedCuisines(), counter = document.getElementById('totalRestaurants');
    counter.textContent = selected.length === 0 ? `${mockRestaurants.length}` : 
        `${mockRestaurants.filter(r => selected.includes(r.cuisine)).length} of ${mockRestaurants.length}`;
};

// Initialize dropdown with event listeners
const initializeDropdown = () => {
    const dropdown = document.querySelector('.custom-dropdown');
    const selected = document.getElementById('dropdownSelected');
    const options = document.getElementById('dropdownOptions');
    const checkboxes = document.querySelectorAll('.dropdown-option input[type="checkbox"]');
    const allCuisinesCheckbox = document.querySelector('.dropdown-option input[value=""]');

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

    // Handle checkbox logic
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
            updateResultsCount();
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

// Geocoding function - refactored for clarity
const geocodeLocation = async input => {
    const cleanedInput = input?.trim().toLowerCase();

    if (cleanedInput === 'current location') {
        return currentUserGpsLocation || HOUSTON_DEFAULT;
    }

    if (!cleanedInput) return HOUSTON_DEFAULT;
    
    const coordMatch = cleanedInput.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
    if (coordMatch) return { lat: parseFloat(coordMatch[1]), lng: parseFloat(coordMatch[2]) };
    
    // City lookup (basic)
    const cities = {
        houston: [29.7604, -95.3698], katy: [29.7391, -95.7521], 'sugar land': [29.5844, -95.6349],
        pearland: [29.5583, -95.2861], woodlands: [30.1588, -95.4913], spring: [30.0799, -95.4171],
        conroe: [30.3133, -95.4904], cypress: [29.9733, -95.6904], humble: [30.0133, -95.2604],
        pasadena: [29.6911, -95.2091], galveston: [29.3013, -94.7977]
    };
    
    for (const [city, coords] of Object.entries(cities)) 
        if (cleanedInput.includes(city)) return { lat: coords[0], lng: coords[1] };
    
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