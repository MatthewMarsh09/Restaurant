// Optimized restaurant data - top-rated establishments across Houston metro
const mockRestaurants = [
    // Houston Core (20 Top-Rated & Verified)
    {name: "Uchi", cuisine: "japanese", rating: 4.8, address: "904 Westheimer Rd, Houston, TX 77006", lat: 29.7402, lng: -95.3902},
    {name: "Hugo's", cuisine: "mexican", rating: 4.7, address: "1600 Westheimer Rd, Houston, TX 77006", lat: 29.7410, lng: -95.4014},
    {name: "Nancy's Hustle", cuisine: "american", rating: 4.7, address: "2704 Polk St, Houston, TX 77003", lat: 29.7500, lng: -95.3518},
    {name: "The Original Ninfa's", cuisine: "mexican", rating: 4.3, address: "2704 Navigation Blvd, Houston, TX 77003", lat: 29.7562, lng: -95.3428},
    {name: "State of Grace", cuisine: "american", rating: 4.6, address: "3258 Westheimer Rd, Houston, TX 77027", lat: 29.7412, lng: -95.4329},
    {name: "Brennan's of Houston", cuisine: "american", rating: 4.4, address: "3300 Smith St, Houston, TX 77006", lat: 29.7341, lng: -95.3894},
    {name: "Xin Chào", cuisine: "vietnamese", rating: 4.7, address: "2310 Decatur St, Houston, TX 77007", lat: 29.7649, lng: -95.3783},
    {name: "Theodore Rex", cuisine: "american", rating: 4.6, address: "1302 Nance St, Houston, TX 77002", lat: 29.7663, lng: -95.3533},
    {name: "Coltivare", cuisine: "italian", rating: 4.5, address: "3320 White Oak Dr, Houston, TX 77007", lat: 29.7820, lng: -95.3972},
    {name: "Himalaya Restaurant", cuisine: "pakistani", rating: 4.5, address: "6652 Southwest Fwy, Houston, TX 77074", lat: 29.7185, lng: -95.5034},
    {name: "Mala Sichuan", cuisine: "chinese", rating: 4.6, address: "9348 Bellaire Blvd, Houston, TX 77036", lat: 29.7047, lng: -95.5492},
    {name: "El Tiempo Cantina", cuisine: "mexican", rating: 4.4, address: "3130 Richmond Ave, Houston, TX 77098", lat: 29.7348, lng: -95.4225},
    {name: "Pondicheri", cuisine: "indian", rating: 4.6, address: "2800 Kirby Dr, Houston, TX 77098", lat: 29.7358, lng: -95.4190},
    {name: "Truth BBQ", cuisine: "american", rating: 4.7, address: "110 S Heights Blvd, Houston, TX 77007", lat: 29.7719, lng: -95.4072},
    {name: "Bludorn", cuisine: "french", rating: 4.7, address: "807 Taft St, Houston, TX 77019", lat: 29.7583, lng: -95.3890},
    {name: "Roka Akor", cuisine: "japanese", rating: 4.6, address: "2929 Weslayan St, Houston, TX 77027", lat: 29.7369, lng: -95.4418},
    {name: "Georgia James", cuisine: "american", rating: 4.7, address: "3503 W Dallas St, Houston, TX 77019", lat: 29.7548, lng: -95.4116},
    {name: "Tepuy", cuisine: "venezuelan", rating: 4.8, address: "755 Telephone Rd, Houston, TX 77023", lat: 29.7304, lng: -95.3283},
    {name: "March", cuisine: "mediterranean", rating: 4.8, address: "1624 Westheimer Rd, Houston, TX 77006", lat: 29.7420, lng: -95.4025},
    {name: "Killen's Barbecue", cuisine: "american", rating: 4.8, address: "3613 E Broadway St, Pearland, TX 77581", lat: 29.5662, lng: -95.2393},

    // Katy (8 restaurants)
    {name: "Local Foods", cuisine: "american", rating: 4.4, address: "24231 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.7366, lng: -95.7891},
    {name: "Black Walnut Cafe", cuisine: "american", rating: 4.4, address: "23233 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.7371, lng: -95.7766},
    {name: "Cava", cuisine: "mediterranean", rating: 4.3, address: "23501 Cinco Ranch Blvd, Katy, TX 77494", lat: 29.7391, lng: -95.7521},
    {name: "In-N-Out Burger", cuisine: "american", rating: 4.4, address: "1010 Katy Fort Bend Rd, Katy, TX 77493", lat: 29.7818, lng: -95.8080},
    {name: "Chipotle", cuisine: "mexican", rating: 4.1, address: "24024 Westheimer Pkwy, Katy, TX 77494", lat: 29.7191, lng: -95.7621},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "1910 W Grand Pkwy S, Katy, TX 77494", lat: 29.7191, lng: -95.7621},
    {name: "Saltgrass Steak House", cuisine: "american", rating: 4.3, address: "21855 Katy Fwy, Katy, TX 77450", lat: 29.7834, lng: -95.7661},
    {name: "Pho Saigon", cuisine: "vietnamese", rating: 4.2, address: "23119 Colonial Pkwy, Katy, TX 77449", lat: 29.7818, lng: -95.7088},

    // Sugar Land (8 restaurants)
    {name: "Perry's Steakhouse", cuisine: "american", rating: 4.5, address: "2115 Town Square Pl, Sugar Land, TX 77479", lat: 29.6015, lng: -95.6179},
    {name: "Ristorante Cavour", cuisine: "italian", rating: 4.6, address: "1080 La Quinta Dr, Sugar Land, TX 77478", lat: 29.6190, lng: -95.6272},
    {name: "Torchy's Tacos", cuisine: "mexican", rating: 4.3, address: "15903 City Walk, Sugar Land, TX 77479", lat: 29.6013, lng: -95.6181},
    {name: "Japaneiro's Sushi Bistro", cuisine: "japanese", rating: 4.5, address: "2168 Texas Dr, Sugar Land, TX 77479", lat: 29.6001, lng: -95.6195},
    {name: "Olive Garden", cuisine: "italian", rating: 4.0, address: "15959 City Walk, Sugar Land, TX 77479", lat: 29.6009, lng: -95.6185},
    {name: "Jason's Deli", cuisine: "american", rating: 4.2, address: "2277 Plaza Dr, Sugar Land, TX 77479", lat: 29.5997, lng: -95.6222},
    {name: "Panda Express", cuisine: "chinese", rating: 3.8, address: "16535 Southwest Fwy, Sugar Land, TX 77479", lat: 29.6007, lng: -95.6026},
    {name: "Alings Chinese Cuisine", cuisine: "chinese", rating: 4.5, address: "15425 Southwest Fwy, Sugar Land, TX 77478", lat: 29.6105, lng: -95.5921},

    // The Woodlands (8 restaurants)
    {name: "Amerigo's Grille", cuisine: "italian", rating: 4.5, address: "25250 Grogans Mill Rd, The Woodlands, TX 77380", lat: 30.1588, lng: -95.4913},
    {name: "Fleming's Prime Steakhouse", cuisine: "american", rating: 4.6, address: "1201 Lake Woodlands Dr #400, The Woodlands, TX 77380", lat: 30.1654, lng: -95.4649},
    {name: "Cava", cuisine: "mediterranean", rating: 4.3, address: "9595 Six Pines Dr, The Woodlands, TX 77380", lat: 30.1653, lng: -95.4641},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "1764 Research Forest Dr, Shenandoah, TX 77381", lat: 30.1812, lng: -95.4674},
    {name: "Salata", cuisine: "american", rating: 4.2, address: "9595 Six Pines Dr, The Woodlands, TX 77380", lat: 30.1653, lng: -95.4641},
    {name: "Jersey Mike's", cuisine: "american", rating: 4.3, address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", lat: 30.1654, lng: -95.4649},
    {name: "Panera Bread", cuisine: "american", rating: 4.1, address: "9595 Six Pines Dr, The Woodlands, TX 77380", lat: 30.1653, lng: -95.4641},
    {name: "Pho An Sushi Bar", cuisine: "vietnamese", rating: 4.4, address: "3091 College Park Dr #295, The Woodlands, TX 77384", lat: 30.1884, lng: -95.4789},

    // Pearland (8 restaurants)
    {name: "Killen's Steakhouse", cuisine: "american", rating: 4.7, address: "6425 Broadway St, Pearland, TX 77581", lat: 29.5662, lng: -95.2393},
    {name: "Texas Roadhouse", cuisine: "american", rating: 4.3, address: "11200 Broadway St, Pearland, TX 77584", lat: 29.5391, lng: -95.3670},
    {name: "Olive Garden", cuisine: "italian", rating: 4.0, address: "11200 Broadway St, Pearland, TX 77584", lat: 29.5391, lng: -95.3670},
    {name: "Chipotle", cuisine: "mexican", rating: 4.1, address: "2405 Pearland Pkwy, Pearland, TX 77581", lat: 29.5539, lng: -95.2536},
    {name: "Pei Wei Asian Kitchen", cuisine: "chinese", rating: 4.1, address: "11200 Broadway St, Pearland, TX 77584", lat: 29.5391, lng: -95.3670},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "2405 Pearland Pkwy, Pearland, TX 77581", lat: 29.5539, lng: -95.2536},
    {name: "McDonald's", cuisine: "american", rating: 3.4, address: "10712 Broadway St, Pearland, TX 77584", lat: 29.5408, lng: -95.3610},
    {name: "Pho Saigon", cuisine: "vietnamese", rating: 4.2, address: "2405 Pearland Pkwy, Pearland, TX 77581", lat: 29.5539, lng: -95.2536},

    // Cypress (8 restaurants)
    {name: "Galiana's Tex Mex", cuisine: "mexican", rating: 4.6, address: "24110 US-290, Cypress, TX 77429", lat: 29.9633, lng: -95.6804},
    {name: "Spring Creek Barbeque", cuisine: "american", rating: 4.3, address: "25701 Northwest Fwy, Cypress, TX 77429", lat: 29.9723, lng: -95.6983},
    {name: "Chick-fil-A", cuisine: "american", rating: 4.4, address: "12920 Northwest Fwy, Cypress, TX 77429", lat: 29.9079, lng: -95.5901},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "11902 Northwest Fwy, Cypress, TX 77429", lat: 29.8973, lng: -95.5786},
    {name: "Chipotle", cuisine: "mexican", rating: 4.1, address: "19401 US-290, Cypress, TX 77433", lat: 29.9329, lng: -95.6543},
    {name: "Olive Garden", cuisine: "italian", rating: 4.0, address: "12848 Northwest Fwy, Cypress, TX 77429", lat: 29.9070, lng: -95.5891},
    {name: "Panda Express", cuisine: "chinese", rating: 3.8, address: "12935 Northwest Fwy, Cypress, TX 77429", lat: 29.9080, lng: -95.5905},
    {name: "Pho Houston", cuisine: "vietnamese", rating: 4.1, address: "11434 Northwest Fwy, Cypress, TX 77429", lat: 29.8920, lng: -95.5721},

    // Humble (8 restaurants)
    {name: "Riva's Italian Restaurant", cuisine: "italian", rating: 4.5, address: "9415 N Sam Houston Pkwy E, Humble, TX 77396", lat: 29.9324, lng: -95.2750},
    {name: "BJ's Restaurant", cuisine: "american", rating: 4.1, address: "7925 FM 1960 Rd E, Humble, TX 77346", lat: 29.9922, lng: -95.2227},
    {name: "Chili's", cuisine: "american", rating: 3.9, address: "7979 FM 1960 Rd E, Humble, TX 77346", lat: 29.9918, lng: -95.2210},
    {name: "Whataburger", cuisine: "american", rating: 4.0, address: "20131 Highway 59 N, Humble, TX 77338", lat: 29.9868, lng: -95.2600},
    {name: "Chipotle", cuisine: "mexican", rating: 4.1, address: "7925 FM 1960 Rd E, Humble, TX 77346", lat: 29.9922, lng: -95.2227},
    {name: "Olive Garden", cuisine: "italian", rating: 4.0, address: "7979 FM 1960 Rd E, Humble, TX 77346", lat: 29.9918, lng: -95.2210},
    {name: "Panda Express", cuisine: "chinese", rating: 3.8, address: "8202 Farm to Market 1960 Rd E, Humble, TX 77346", lat: 29.9888, lng: -95.2132},
    {name: "Pho Saigon", cuisine: "vietnamese", rating: 4.2, address: "20131 Highway 59 N, Humble, TX 77338", lat: 29.9868, lng: -95.2600}
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

// Reverse geocode coordinates to get an address using OpenStreetMap
const reverseGeocode = async (lat, lng) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
            headers: { 'User-Agent': 'HoustonFoodFinder/1.0 (https://matthewmarsh09.github.io/Restaurant/)' }
        });
        if (!response.ok) throw new Error('Reverse geocoding failed');
        const data = await response.json();
        return data.display_name || `GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
        console.error('Reverse geocode error:', error);
        return `GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}`; // Fallback to GPS coordinates
    }
};

// GPS location with optimized error handling and reverse geocoding
const requestUserLocation = () => {
    const btn = document.getElementById('useLocationBtn'), status = document.getElementById('locationStatus');
    if (!navigator.geolocation) return status.textContent = 'Geolocation not supported', status.className = 'location-status error';
    
    btn.disabled = true; btn.textContent = '📍 Getting Location...'; status.textContent = 'Getting GPS signal...'; status.className = 'location-status loading';
    
    navigator.geolocation.getCurrentPosition(
        async pos => {
            userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            status.textContent = `✓ GPS Lock (±${Math.round(pos.coords.accuracy)}m). Finding address...`;
            
            const address = await reverseGeocode(userLocation.lat, userLocation.lng);
            document.getElementById('address').value = address;
            
            status.textContent = `✓ Closest Address Found!`;
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
        document.getElementById(id).onclick = [
            () => searchAndShow('list'), 
            () => searchAndShow('map'), 
            () => searchAndShow('random'), 
            () => showRandomResult(), // <-- FIX: Wrapped in anonymous function
            requestUserLocation
        ][i]);
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