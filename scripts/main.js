// Optimized restaurant data - top-rated establishments across Houston metro
const mockRestaurants = [
    // Houston Core (20 Top-Rated)
    {name: "Uchi", cuisine: "japanese", rating: 4.8, address: "904 Westheimer Rd, Houston, TX 77006", lat: 29.7399, lng: -95.3894},
    {name: "Hugo's", cuisine: "mexican", rating: 4.7, address: "1600 Westheimer Rd, Houston, TX 77006", lat: 29.7407, lng: -95.4013},
    {name: "Oxheart", cuisine: "american", rating: 4.8, address: "1302 Nance St, Houston, TX 77002", lat: 29.7520, lng: -95.3598},
    {name: "The Original Ninfa's", cuisine: "mexican", rating: 4.3, address: "2704 Navigation Blvd, Houston, TX 77003", lat: 29.7604, lng: -95.3698},
    {name: "State of Grace", cuisine: "american", rating: 4.6, address: "3258 Westheimer Rd, Houston, TX 77027", lat: 29.7399, lng: -95.4194},
    {name: "Brennan's of Houston", cuisine: "american", rating: 4.4, address: "3300 Smith St, Houston, TX 77006", lat: 29.7341, lng: -95.3894},
    {name: "Xin Chào", cuisine: "vietnamese", rating: 4.7, address: "2310 Decatur St, Houston, TX 77007", lat: 29.7841, lng: -95.3794},
    {name: "Theodore Rex", cuisine: "american", rating: 4.6, address: "1302 Nance St, Houston, TX 77002", lat: 29.7420, lng: -95.3498},
    {name: "Coltivare", cuisine: "italian", rating: 4.5, address: "3320 White Oak Dr, Houston, TX 77007", lat: 29.7741, lng: -95.3694},
    {name: "Himalaya Palace", cuisine: "pakistani", rating: 4.5, address: "5938 Hillcroft St, Houston, TX 77036", lat: 29.7058, lng: -95.4494},
    {name: "Mala Sichuan", cuisine: "chinese", rating: 4.6, address: "9348 Bellaire Blvd, Houston, TX 77036", lat: 29.7058, lng: -95.4394},
    {name: "El Tiempo Cantina", cuisine: "mexican", rating: 4.4, address: "3130 Richmond Ave, Houston, TX 77098", lat: 29.7341, lng: -95.4094},
    {name: "Pondicheri", cuisine: "indian", rating: 4.6, address: "2800 Kirby Dr, Houston, TX 77098", lat: 29.7258, lng: -95.4194},
    {name: "Truth BBQ", cuisine: "american", rating: 4.7, address: "110 N Main St, Houston, TX 77002", lat: 29.7620, lng: -95.3698},
    {name: "Killen's Barbecue", cuisine: "american", rating: 4.8, address: "3613 E Broadway St, Pearland, TX 77581", lat: 29.5583, lng: -95.2861},
    {name: "Underbelly", cuisine: "american", rating: 4.5, address: "1100 Westheimer Rd, Houston, TX 77006", lat: 29.7399, lng: -95.3794},
    {name: "Roka Akor", cuisine: "japanese", rating: 4.6, address: "2929 Weslayan St, Houston, TX 77027", lat: 29.7399, lng: -95.4294},
    {name: "Georgia James", cuisine: "american", rating: 4.7, address: "3503 W Dallas St, Houston, TX 77019", lat: 29.7641, lng: -95.4094},
    {name: "Arepas Cafe", cuisine: "venezuelan", rating: 4.5, address: "2630 Dunvale Rd, Houston, TX 77063", lat: 29.7341, lng: -95.4594},
    {name: "Degust", cuisine: "french", rating: 4.6, address: "3309 Richmond Ave, Houston, TX 77098", lat: 29.7341, lng: -95.4194},

    // Major Suburbs (8 per area)
    // Katy
    {name: "Local Foods", cuisine: "american", rating: 4.4, address: "23501 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.7391, lng: -95.7521},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "1910 W Grand Pkwy S, Katy, TX 77494", lat: 29.7191, lng: -95.7621},
    {name: "Cava", cuisine: "mediterranean", rating: 4.3, address: "23501 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.7391, lng: -95.7521},
    {name: "In-N-Out Burger", cuisine: "american", rating: 4.4, address: "23501 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.7291, lng: -95.7421},
    {name: "Chipotle", cuisine: "mexican", rating: 4.1, address: "23501 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.7091, lng: -95.7521},
    {name: "Black Walnut Cafe", cuisine: "american", rating: 4.4, address: "23501 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.6791, lng: -95.7821},
    {name: "Saltgrass Steak House", cuisine: "american", rating: 4.3, address: "23501 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.6691, lng: -95.7921},
    {name: "Pho Saigon", cuisine: "vietnamese", rating: 4.2, address: "23501 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.6591, lng: -95.8021},

    // Sugar Land
    {name: "Perry's Steakhouse", cuisine: "american", rating: 4.5, address: "2831 Town Center Blvd, Sugar Land, TX 77479", lat: 29.5844, lng: -95.6349},
    {name: "Ristorante Cavour", cuisine: "italian", rating: 4.6, address: "2831 Town Center Blvd, Sugar Land, TX 77479", lat: 29.5744, lng: -95.6249},
    {name: "Torchy's Tacos", cuisine: "mexican", rating: 4.3, address: "2831 Town Center Blvd, Sugar Land, TX 77479", lat: 29.5644, lng: -95.6149},
    {name: "Seasons 52", cuisine: "american", rating: 4.4, address: "2831 Town Center Blvd, Sugar Land, TX 77479", lat: 29.5544, lng: -95.6049},
    {name: "Olive Garden", cuisine: "italian", rating: 4.0, address: "2831 Town Center Blvd, Sugar Land, TX 77479", lat: 29.5444, lng: -95.5949},
    {name: "Jason's Deli", cuisine: "american", rating: 4.2, address: "2831 Town Center Blvd, Sugar Land, TX 77479", lat: 29.5244, lng: -95.5749},
    {name: "Panda Express", cuisine: "chinese", rating: 3.8, address: "2831 Town Center Blvd, Sugar Land, TX 77479", lat: 29.5144, lng: -95.5649},
    {name: "Himalaya Restaurant", cuisine: "pakistani", rating: 4.4, address: "2831 Town Center Blvd, Sugar Land, TX 77479", lat: 29.5044, lng: -95.5549},

    // The Woodlands
    {name: "Amerigo's Grille", cuisine: "italian", rating: 4.5, address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", lat: 30.1588, lng: -95.4913},
    {name: "Fleming's Prime Steakhouse", cuisine: "american", rating: 4.6, address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", lat: 30.1488, lng: -95.4813},
    {name: "Cava", cuisine: "mediterranean", rating: 4.3, address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", lat: 30.1488, lng: -95.4813},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", lat: 30.1588, lng: -95.4913},
    {name: "Salata", cuisine: "american", rating: 4.2, address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", lat: 30.1288, lng: -95.4613},
    {name: "Jersey Mike's", cuisine: "american", rating: 4.3, address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", lat: 30.0588, lng: -95.3913},
    {name: "Panera Bread", cuisine: "american", rating: 4.1, address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", lat: 30.0288, lng: -95.3613},
    {name: "Pho Vietnam", cuisine: "vietnamese", rating: 4.2, address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", lat: 30.0188, lng: -95.3513},

    // Pearland  
    {name: "Killen's Barbecue", cuisine: "american", rating: 4.8, address: "3613 E Broadway St, Pearland, TX 77581", lat: 29.5583, lng: -95.2861},
    {name: "Chipotle", cuisine: "mexican", rating: 4.1, address: "11920 Broadway St, Pearland, TX 77584", lat: 29.5283, lng: -95.2561},
    {name: "Olive Garden", cuisine: "italian", rating: 4.0, address: "11920 Broadway St, Pearland, TX 77584", lat: 29.5183, lng: -95.2461},
    {name: "Texas Roadhouse", cuisine: "american", rating: 4.3, address: "11920 Broadway St, Pearland, TX 77584", lat: 29.5083, lng: -95.2361},
    {name: "Pei Wei Asian Kitchen", cuisine: "chinese", rating: 4.1, address: "11920 Broadway St, Pearland, TX 77584", lat: 29.4983, lng: -95.2261},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "11920 Broadway St, Pearland, TX 77584", lat: 29.5383, lng: -95.2661},
    {name: "McDonald's", cuisine: "american", rating: 3.4, address: "11920 Broadway St, Pearland, TX 77584", lat: 29.4183, lng: -95.1461},
    {name: "Pho Saigon", cuisine: "vietnamese", rating: 4.2, address: "11920 Broadway St, Pearland, TX 77584", lat: 29.4083, lng: -95.1361},

    // Cypress
    {name: "Galiana's Tex Mex", cuisine: "mexican", rating: 4.6, address: "24110 US-290, Cypress, TX 77429", lat: 29.9633, lng: -95.6804},
    {name: "Spring Creek Barbeque", cuisine: "american", rating: 4.3, address: "25701 Northwest Fwy, Cypress, TX 77429", lat: 29.9533, lng: -95.6704},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "25701 Northwest Fwy, Cypress, TX 77429", lat: 29.9633, lng: -95.6804},
    {name: "Chick-fil-A", cuisine: "american", rating: 4.4, address: "25701 Northwest Fwy, Cypress, TX 77429", lat: 29.9433, lng: -95.6604},
    {name: "Chipotle", cuisine: "mexican", rating: 4.1, address: "25701 Northwest Fwy, Cypress, TX 77429", lat: 29.9333, lng: -95.6504},
    {name: "Olive Garden", cuisine: "italian", rating: 4.0, address: "25701 Northwest Fwy, Cypress, TX 77429", lat: 29.9233, lng: -95.6404},
    {name: "Panda Express", cuisine: "chinese", rating: 3.8, address: "25701 Northwest Fwy, Cypress, TX 77429", lat: 29.9133, lng: -95.6304},
    {name: "Pho Houston", cuisine: "vietnamese", rating: 4.1, address: "25701 Northwest Fwy, Cypress, TX 77429", lat: 29.9033, lng: -95.6204},

    // Humble
    {name: "Riva's Italian Restaurant", cuisine: "italian", rating: 4.5, address: "20131 Highway 59 N, Humble, TX 77338", lat: 30.0133, lng: -95.2604},
    {name: "BJ's Restaurant", cuisine: "american", rating: 4.1, address: "20131 Highway 59 N, Humble, TX 77338", lat: 30.0033, lng: -95.2504},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "20131 Highway 59 N, Humble, TX 77338", lat: 30.0133, lng: -95.2604},
    {name: "Chili's", cuisine: "american", rating: 3.9, address: "20131 Highway 59 N, Humble, TX 77338", lat: 29.9933, lng: -95.2404},
    {name: "Chipotle", cuisine: "mexican", rating: 4.1, address: "20131 Highway 59 N, Humble, TX 77338", lat: 29.9833, lng: -95.2304},
    {name: "Olive Garden", cuisine: "italian", rating: 4.0, address: "20131 Highway 59 N, Humble, TX 77338", lat: 29.9733, lng: -95.2204},
    {name: "Panda Express", cuisine: "chinese", rating: 3.8, address: "20131 Highway 59 N, Humble, TX 77338", lat: 29.9633, lng: -95.2104},
    {name: "Pho Saigon", cuisine: "vietnamese", rating: 4.2, address: "20131 Highway 59 N, Humble, TX 77338", lat: 29.9533, lng: -95.2004}
];

let map, currentResults = [], userLocation = { lat: 29.7604, lng: -95.3698 };

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
    const selected = document.getElementById('dropdownSelected'), options = document.getElementById('dropdownOptions');
    const checkboxes = document.querySelectorAll('.dropdown-option input[type="checkbox"]');
    
    selected.onclick = () => options.classList.toggle('open') || selected.classList.toggle('open');
    document.onclick = e => !e.target.closest('.custom-dropdown') && (options.classList.remove('open'), selected.classList.remove('open'));
    
    checkboxes.forEach(cb => cb.onchange = function() {
        if (this.value === '' && this.checked) checkboxes.forEach(c => c !== this && (c.checked = false));
        else if (this.value !== '' && this.checked) checkboxes.forEach(c => c.value === '' && (c.checked = false));
        updateDropdownText(); updateResultsCount();
    });
};

// GPS location with optimized error handling
const requestUserLocation = () => {
    const btn = document.getElementById('useLocationBtn'), status = document.getElementById('locationStatus');
    if (!navigator.geolocation) return status.textContent = 'Geolocation not supported', status.className = 'location-status error';
    
    btn.disabled = true; btn.textContent = '📍 Getting Location...'; status.textContent = 'Getting GPS...'; status.className = 'location-status loading';
    
    navigator.geolocation.getCurrentPosition(
        pos => {
            userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            const coords = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
            document.getElementById('address').value = `GPS: ${coords}`;
            status.textContent = `✓ Located (±${Math.round(pos.coords.accuracy)}m)`;
            status.className = 'location-status success';
            btn.disabled = false; btn.textContent = '📍 Use My Exact Location';
            setTimeout(() => currentResults.length === 0 && searchAndShow('list'), 1500);
        },
        err => {
            const msgs = ['Location denied', 'Location unavailable', 'Location timeout', 'Location error'];
            status.textContent = msgs[err.code - 1] || msgs[3]; status.className = 'location-status error';
            btn.disabled = false; btn.textContent = '📍 Use My Exact Location';
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
};

// Optimized geocoding
const geocodeLocation = async input => {
    if (!input?.trim()) return { lat: 29.7604, lng: -95.3698 };
    const loc = input.toLowerCase().trim();
    
    // GPS coordinates
    const coordMatch = loc.match(/^gps:\s*(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/) || loc.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
    if (coordMatch) return { lat: parseFloat(coordMatch[coordMatch.length-2]), lng: parseFloat(coordMatch[coordMatch.length-1]) };
    
    // City lookup
    const cities = {
        houston: [29.7604, -95.3698], katy: [29.7391, -95.7521], 'sugar land': [29.5844, -95.6349],
        pearland: [29.5583, -95.2861], woodlands: [30.1588, -95.4913], spring: [30.0799, -95.4171],
        conroe: [30.3133, -95.4904], cypress: [29.9733, -95.6904], humble: [30.0133, -95.2604],
        pasadena: [29.6911, -95.2091], galveston: [29.3013, -94.7977]
    };
    
    for (const [city, coords] of Object.entries(cities)) 
        if (loc.includes(city)) return { lat: coords[0], lng: coords[1] };
    
    return { lat: 29.7604, lng: -95.3698 };
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    ['showList', 'showMap', 'randomPick', 'pickAnother', 'useLocationBtn'].forEach((id, i) => 
        document.getElementById(id).onclick = [() => searchAndShow('list'), () => searchAndShow('map'), 
        () => searchAndShow('random'), showRandomResult, requestUserLocation][i]);
    initializeDropdown();
    document.getElementById('totalRestaurants').textContent = mockRestaurants.length;
});

// Main search function - optimized
const searchAndShow = async viewType => {
    const address = document.getElementById('address').value, range = parseInt(document.getElementById('range').value) || 10;
    const selected = getSelectedCuisines();
    
    try {
        userLocation = await geocodeLocation(address);
        currentResults = mockRestaurants.map(r => ({ ...r, calculatedDistance: calculateDistance(userLocation.lat, userLocation.lng, r.lat, r.lng) }))
            .filter(r => r.calculatedDistance <= range && (selected.length === 0 || selected.includes(r.cuisine)))
            .sort((a, b) => a.calculatedDistance - b.calculatedDistance);
        
        const section = document.getElementById('resultsSection'), title = document.getElementById('resultsTitle');
        section.style.display = 'block'; section.scrollIntoView({ behavior: 'smooth' });
        title.textContent = currentResults.length === 0 ? `No restaurants within ${range} miles` : 
            `Found ${currentResults.length} restaurant${currentResults.length !== 1 ? 's' : ''} within ${range} miles`;
        
        ['listView', 'mapView', 'randomView'].forEach(v => document.getElementById(v).style.display = 'none');
        ({ list: showListView, map: showMapView, random: showRandomView }[viewType])(currentResults);
    } catch (err) { console.error('Search failed:', err); alert('Search failed. Try again.'); }
};

// Optimized view functions
const showListView = restaurants => {
    document.getElementById('listView').style.display = 'block';
    document.getElementById('resultsGrid').innerHTML = restaurants.length === 0 ? '<p>No restaurants found.</p>' :
        restaurants.map(r => `<div class="card"><h3>${r.name}</h3><div class="cuisine">${r.cuisine.charAt(0).toUpperCase() + r.cuisine.slice(1)}</div>
        <div class="rating">⭐ ${r.rating}/5.0</div><div class="distance">📍 ${r.calculatedDistance.toFixed(1)} miles</div>
        <div class="address">${r.address}</div></div>`).join('');
};

const showMapView = restaurants => {
    document.getElementById('mapView').style.display = 'block';
    const range = parseInt(document.getElementById('range').value) || 10;
    
    if (!map) {
        map = L.map('map').setView([userLocation.lat, userLocation.lng], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
    } else {
        map.eachLayer(layer => (layer instanceof L.Marker || layer instanceof L.Circle) && map.removeLayer(layer));
        map.setView([userLocation.lat, userLocation.lng], 11);
    }
    
    L.marker([userLocation.lat, userLocation.lng]).addTo(map).bindPopup('Your Location').openPopup();
    L.circle([userLocation.lat, userLocation.lng], { color: '#002D62', fillColor: '#EB6E1F', fillOpacity: 0.1, radius: range * 1609.34 }).addTo(map);
    restaurants.forEach(r => L.marker([r.lat, r.lng]).addTo(map).bindPopup(`<strong>${r.name}</strong><br>${r.cuisine}<br>⭐ ${r.rating}<br>📍 ${r.calculatedDistance.toFixed(1)} miles<br>${r.address}`));
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
        <div class="address">${r.address}</div>`;
};