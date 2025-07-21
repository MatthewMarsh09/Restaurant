// Mock restaurant data with real coordinates for distance calculation
const mockRestaurants = [
    // Houston Restaurants
    {
        name: "The Original Ninfa's",
        cuisine: "mexican",
        rating: 4.3,
        address: "2704 Navigation Blvd, Houston, TX 77003",
        lat: 29.7604,
        lng: -95.3698,
        city: "Houston",
        state: "TX",
        zipcode: "77003"
    },
    {
        name: "Hugo's",
        cuisine: "mexican",
        rating: 4.7,
        address: "1600 Westheimer Rd, Houston, TX 77006",
        lat: 29.7407,
        lng: -95.4013,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Uchi",
        cuisine: "japanese",
        rating: 4.8,
        address: "904 Westheimer Rd, Houston, TX 77006",
        lat: 29.7399,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Xochi",
        cuisine: "mexican",
        rating: 4.6,
        address: "1777 Walker St, Houston, TX 77010",
        lat: 29.7520,
        lng: -95.3698,
        city: "Houston",
        state: "TX",
        zipcode: "77010"
    },
    {
        name: "Turkey Leg Hut",
        cuisine: "american",
        rating: 4.2,
        address: "4830 Almeda Rd, Houston, TX 77004",
        lat: 29.7265,
        lng: -95.3632,
        city: "Houston",
        state: "TX",
        zipcode: "77004"
    },
    {
        name: "Nancy's Hustle",
        cuisine: "american",
        rating: 4.5,
        address: "2704 Polk St, Houston, TX 77003",
        lat: 29.7604,
        lng: -95.3598,
        city: "Houston",
        state: "TX",
        zipcode: "77003"
    },
    {
        name: "Coltivare Pizza & Garden",
        cuisine: "pizza",
        rating: 4.4,
        address: "3320 White Oak Dr, Houston, TX 77007",
        lat: 29.7965,
        lng: -95.4215,
        city: "Houston",
        state: "TX",
        zipcode: "77007"
    },
    {
        name: "Himalaya Restaurant",
        cuisine: "indian",
        rating: 4.3,
        address: "5938 Hillcroft St, Houston, TX 77036",
        lat: 29.7265,
        lng: -95.4894,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "Pho Binh Trailer",
        cuisine: "vietnamese",
        rating: 4.6,
        address: "10928 Bellaire Blvd, Houston, TX 77072",
        lat: 29.7058,
        lng: -95.5694,
        city: "Houston",
        state: "TX",
        zipcode: "77072"
    },
    {
        name: "Mala Sichuan Bistro",
        cuisine: "chinese",
        rating: 4.5,
        address: "9348 Bellaire Blvd, Houston, TX 77036",
        lat: 29.7058,
        lng: -95.4894,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },

    // Katy Restaurants
    {
        name: "Local Table",
        cuisine: "american",
        rating: 4.4,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.7391,
        lng: -95.7521,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Katy Vibes",
        cuisine: "american",
        rating: 4.3,
        address: "25632 Westheimer Pkwy, Katy, TX 77494",
        lat: 29.7391,
        lng: -95.7721,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Peli Peli Kitchen",
        cuisine: "american",
        rating: 4.5,
        address: "1001 S Fry Rd, Katy, TX 77450",
        lat: 29.7391,
        lng: -95.7321,
        city: "Katy",
        state: "TX",
        zipcode: "77450"
    },

    // Sugar Land Restaurants
    {
        name: "Pondicheri",
        cuisine: "indian",
        rating: 4.5,
        address: "2800 Kirby Dr, Houston, TX 77098",
        lat: 29.7341,
        lng: -95.4113,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },
    {
        name: "Perry's Steakhouse",
        cuisine: "american",
        rating: 4.6,
        address: "23501 Cinco Ranch Blvd, Sugar Land, TX 77479",
        lat: 29.5844,
        lng: -95.6349,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "B&B Butchers",
        cuisine: "american",
        rating: 4.7,
        address: "1814 Washington Ave, Houston, TX 77007",
        lat: 29.7965,
        lng: -95.4015,
        city: "Houston",
        state: "TX",
        zipcode: "77007"
    },

    // Pearland Restaurants
    {
        name: "Killen's Barbecue",
        cuisine: "american",
        rating: 4.8,
        address: "3613 E Broadway St, Pearland, TX 77581",
        lat: 29.5583,
        lng: -95.2861,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Killen's Steakhouse",
        cuisine: "american",
        rating: 4.7,
        address: "6425 Broadway St, Pearland, TX 77581",
        lat: 29.5483,
        lng: -95.2761,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Grazia Italian Kitchen",
        cuisine: "italian",
        rating: 4.4,
        address: "11920 Broadway St, Pearland, TX 77584",
        lat: 29.5383,
        lng: -95.2661,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },

    // The Woodlands Restaurants
    {
        name: "Seasons 52",
        cuisine: "american",
        rating: 4.5,
        address: "4410 The Woodlands, The Woodlands, TX 77380",
        lat: 30.1588,
        lng: -95.4913,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Yama Sushi",
        cuisine: "japanese",
        rating: 4.6,
        address: "4775 W Panther Creek Dr, The Woodlands, TX 77381",
        lat: 30.1688,
        lng: -95.5013,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77381"
    },
    {
        name: "Cafe Express",
        cuisine: "american",
        rating: 4.2,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.1488,
        lng: -95.4813,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },

    // Spring Restaurants
    {
        name: "Corkscrew BBQ",
        cuisine: "american",
        rating: 4.7,
        address: "26608 Keith St, Spring, TX 77373",
        lat: 30.0799,
        lng: -95.4171,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Taste of Texas",
        cuisine: "american",
        rating: 4.4,
        address: "10505 Katy Fwy, Houston, TX 77024",
        lat: 29.7799,
        lng: -95.5471,
        city: "Houston",
        state: "TX",
        zipcode: "77024"
    },

    // Conroe Restaurants
    {
        name: "Republic Grille",
        cuisine: "american",
        rating: 4.3,
        address: "26500 Kuykendahl Rd, Conroe, TX 77385",
        lat: 30.3133,
        lng: -95.4904,
        city: "Conroe",
        state: "TX",
        zipcode: "77385"
    },
    {
        name: "Margaritaville",
        cuisine: "american",
        rating: 4.1,
        address: "1000 Lake Front Cir, Conroe, TX 77384",
        lat: 30.3233,
        lng: -95.5004,
        city: "Conroe",
        state: "TX",
        zipcode: "77384"
    },

    // Cypress Restaurants
    {
        name: "Goode Company BBQ",
        cuisine: "american",
        rating: 4.5,
        address: "20102 NW Fwy, Cypress, TX 77429",
        lat: 29.9733,
        lng: -95.6904,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Pappadeaux Seafood",
        cuisine: "american",
        rating: 4.4,
        address: "13080 NW Fwy, Cypress, TX 77429",
        lat: 29.9633,
        lng: -95.6804,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },

    // Humble Restaurants
    {
        name: "Southern Smoke BBQ",
        cuisine: "american",
        rating: 4.6,
        address: "18331 US-59, Humble, TX 77338",
        lat: 30.0133,
        lng: -95.2604,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "El Tiempo Cantina",
        cuisine: "mexican",
        rating: 4.3,
        address: "20940 Atascocita Rd, Humble, TX 77338",
        lat: 30.0233,
        lng: -95.2704,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },

    // Pasadena Restaurants
    {
        name: "Pappas Seafood House",
        cuisine: "american",
        rating: 4.4,
        address: "6945 Spencer Hwy, Pasadena, TX 77505",
        lat: 29.6911,
        lng: -95.2091,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Los Cucos Mexican Cafe",
        cuisine: "mexican",
        rating: 4.2,
        address: "4312 Fairmont Pkwy, Pasadena, TX 77504",
        lat: 29.6811,
        lng: -95.1991,
        city: "Pasadena",
        state: "TX",
        zipcode: "77504"
    },

    // Texas City Restaurants
    {
        name: "Yaga's Burger Haus",
        cuisine: "american",
        rating: 4.3,
        address: "323 6th Ave N, Texas City, TX 77590",
        lat: 29.3838,
        lng: -94.9027,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Monument Inn",
        cuisine: "american",
        rating: 4.5,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.6338,
        lng: -95.0827,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },

    // Galveston Restaurants
    {
        name: "The Rooftop Bar",
        cuisine: "american",
        rating: 4.4,
        address: "2024 Postoffice St, Galveston, TX 77550",
        lat: 29.3013,
        lng: -94.7977,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Shrimp 'N Stuff Downtown",
        cuisine: "american",
        rating: 4.3,
        address: "2300 Strand St, Galveston, TX 77550",
        lat: 29.3113,
        lng: -94.8077,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Fishy's Seafood",
        cuisine: "american",
        rating: 4.2,
        address: "3801 Ave O, Galveston, TX 77550",
        lat: 29.2913,
        lng: -94.7877,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },

    // Richmond/Rosenberg Restaurants
    {
        name: "Nuevo Leon Mexican Restaurant",
        cuisine: "mexican",
        rating: 4.4,
        address: "1209 2nd St, Rosenberg, TX 77471",
        lat: 29.5570,
        lng: -95.8066,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Brookshire Brothers",
        cuisine: "american",
        rating: 4.1,
        address: "24703 Southwest Fwy, Rosenberg, TX 77471",
        lat: 29.5470,
        lng: -95.7966,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },

    // Alvin Restaurants
    {
        name: "Joe Allen's Pit BBQ",
        cuisine: "american",
        rating: 4.5,
        address: "301 W House St, Alvin, TX 77511",
        lat: 29.4239,
        lng: -95.2441,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Nolan Ryan's All Star Grill",
        cuisine: "american",
        rating: 4.2,
        address: "2925 W Broadway St, Alvin, TX 77511",
        lat: 29.4139,
        lng: -95.2541,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    }
];

let map = null;
let currentResults = [];
let userLocation = { lat: 29.7604, lng: -95.3698 }; // Default to Houston center

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    document.getElementById('showList').addEventListener('click', () => searchAndShow('list'));
    document.getElementById('showMap').addEventListener('click', () => searchAndShow('map'));
    document.getElementById('randomPick').addEventListener('click', () => searchAndShow('random'));
    document.getElementById('pickAnother').addEventListener('click', showRandomResult);
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Radius of the Earth in miles
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in miles
    return Math.round(d * 10) / 10; // Round to 1 decimal place
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

// Geocode location input to get coordinates
async function geocodeLocation(locationInput) {
    // This is a simplified geocoder - in a real app you'd use a service like Google Maps API
    const cityCoordinates = {
        'houston': { lat: 29.7604, lng: -95.3698 },
        'katy': { lat: 29.7391, lng: -95.7521 },
        'sugar land': { lat: 29.5844, lng: -95.6349 },
        'pearland': { lat: 29.5583, lng: -95.2861 },
        'the woodlands': { lat: 30.1588, lng: -95.4913 },
        'woodlands': { lat: 30.1588, lng: -95.4913 },
        'spring': { lat: 30.0799, lng: -95.4171 },
        'conroe': { lat: 30.3133, lng: -95.4904 },
        'cypress': { lat: 29.9733, lng: -95.6904 },
        'humble': { lat: 30.0133, lng: -95.2604 },
        'pasadena': { lat: 29.6911, lng: -95.2091 },
        'texas city': { lat: 29.3838, lng: -94.9027 },
        'galveston': { lat: 29.3013, lng: -94.7977 },
        'richmond': { lat: 29.5820, lng: -95.7605 },
        'rosenberg': { lat: 29.5570, lng: -95.8066 },
        'alvin': { lat: 29.4239, lng: -95.2441 }
    };

    const location = locationInput.toLowerCase().trim();
    
    // Check for zip code patterns
    if (/^\d{5}$/.test(location)) {
        // Simple zip code lookup (in real app, use proper geocoding service)
        const zipCoordinates = {
            '77006': { lat: 29.7407, lng: -95.4013 },
            '77007': { lat: 29.7965, lng: -95.4215 },
            '77494': { lat: 29.7391, lng: -95.7521 },
            '77479': { lat: 29.5844, lng: -95.6349 },
            '77581': { lat: 29.5583, lng: -95.2861 },
            '77380': { lat: 30.1588, lng: -95.4913 }
        };
        return zipCoordinates[location] || { lat: 29.7604, lng: -95.3698 };
    }

    // Check city names
    for (const [city, coords] of Object.entries(cityCoordinates)) {
        if (location.includes(city)) {
            return coords;
        }
    }

    // Default to Houston if not found
    return { lat: 29.7604, lng: -95.3698 };
}

async function searchAndShow(viewType) {
    const selectedCuisines = getSelectedCuisines();
    const rangeInput = document.getElementById('range').value;
    const range = parseInt(rangeInput) || 10; // Default to 10 if invalid
    const locationFilter = getLocationFilter();
    
    // Validate range
    if (range < 1 || range > 100) {
        alert('Please enter a range between 1 and 100 miles.');
        document.getElementById('range').focus();
        return;
    }
    
    // Get user's location coordinates
    const locationInput = locationFilter.city || locationFilter.address || locationFilter.zipcode || 'Houston, TX';
    userLocation = await geocodeLocation(locationInput);
    
    // Calculate distances and filter restaurants
    currentResults = mockRestaurants.filter(restaurant => {
        const cuisineMatch = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisine);
        const distance = calculateDistance(userLocation.lat, userLocation.lng, restaurant.lat, restaurant.lng);
        restaurant.calculatedDistance = distance; // Store calculated distance
        const rangeMatch = distance <= range;
        const locationMatch = matchesLocation(restaurant, locationFilter);
        return cuisineMatch && rangeMatch && locationMatch;
    }).sort((a, b) => a.calculatedDistance - b.calculatedDistance); // Sort by distance

    // Show results section
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

    // Hide all views first
    document.getElementById('listView').style.display = 'none';
    document.getElementById('mapView').style.display = 'none';
    document.getElementById('randomView').style.display = 'none';

    // Show the requested view
    switch(viewType) {
        case 'list':
            showListView();
            break;
        case 'map':
            showMapView();
            break;
        case 'random':
            showRandomView();
            break;
    }
}

function getSelectedCuisines() {
    const checkboxes = document.querySelectorAll('.food-types input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function getLocationFilter() {
    return {
        city: document.getElementById('city').value.trim(),
        address: document.getElementById('address').value.trim(),
        zipcode: document.getElementById('zipcode').value.trim()
    };
}

function matchesLocation(restaurant, locationFilter) {
    // If no location filters are provided, show all restaurants
    if (!locationFilter.city && !locationFilter.address && !locationFilter.zipcode) {
        return true;
    }
    
    // Check city match (case insensitive, partial match)
    if (locationFilter.city) {
        const cityMatch = restaurant.city.toLowerCase().includes(locationFilter.city.toLowerCase()) ||
                         restaurant.address.toLowerCase().includes(locationFilter.city.toLowerCase());
        if (!cityMatch) return false;
    }
    
    // Check address match (case insensitive, partial match)
    if (locationFilter.address) {
        const addressMatch = restaurant.address.toLowerCase().includes(locationFilter.address.toLowerCase());
        if (!addressMatch) return false;
    }
    
    // Check zipcode match (exact match)
    if (locationFilter.zipcode) {
        const zipcodeMatch = restaurant.zipcode === locationFilter.zipcode;
        if (!zipcodeMatch) return false;
    }
    
    return true;
}

function showListView() {
    document.getElementById('resultsTitle').textContent = `Found ${currentResults.length} restaurants`;
    document.getElementById('listView').style.display = 'block';
    
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '';

    if (currentResults.length === 0) {
        resultsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No restaurants found. Try adjusting your filters.</p>';
        return;
    }

    currentResults.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        resultsGrid.appendChild(card);
    });
}

function showMapView() {
    document.getElementById('resultsTitle').textContent = `Showing ${currentResults.length} restaurants on map`;
    document.getElementById('mapView').style.display = 'block';
    
    // Initialize map if not already done
    if (!map) {
        map = L.map('map').setView([userLocation.lat, userLocation.lng], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.setView([userLocation.lat, userLocation.lng], 10);
    }

    // Clear existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
            map.removeLayer(layer);
        }
    });

    // Add user location marker
    const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: L.divIcon({
            className: 'user-location-marker',
            html: '<div style="background: #EB6E1F; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        })
    }).addTo(map);
    userMarker.bindPopup('<div style="text-align: center;"><strong>Your Location</strong></div>');

    // Add radius circle
    const range = parseInt(document.getElementById('range').value) || 10;
    const radiusCircle = L.circle([userLocation.lat, userLocation.lng], {
        color: '#002D62',
        fillColor: '#EB6E1F',
        fillOpacity: 0.1,
        radius: range * 1609.34 // Convert miles to meters
    }).addTo(map);

    // Add markers for current results
    currentResults.forEach(restaurant => {
        const marker = L.marker([restaurant.lat, restaurant.lng]).addTo(map);
        marker.bindPopup(`
            <div style="text-align: center;">
                <h4 style="color: #002D62; margin-bottom: 5px;">${restaurant.name}</h4>
                <p style="margin: 5px 0;"><span style="background: #f0f4ff; color: #002D62; padding: 2px 8px; border-radius: 10px; font-size: 12px;">${restaurant.cuisine}</span></p>
                <p style="margin: 5px 0; color: #EB6E1F; font-weight: 600;">⭐ ${restaurant.rating} • ${restaurant.calculatedDistance} miles</p>
                <p style="font-size: 12px; color: #666;">${restaurant.address}</p>
            </div>
        `);
    });

    // Fit map to show all markers including user location
    if (currentResults.length > 0) {
        const group = new L.featureGroup([
            userMarker,
            ...currentResults.map(r => L.marker([r.lat, r.lng]))
        ]);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

function showRandomView() {
    document.getElementById('resultsTitle').textContent = 'Random Pick';
    document.getElementById('randomView').style.display = 'block';
    showRandomResult();
}

function showRandomResult() {
    if (currentResults.length === 0) {
        document.getElementById('randomCard').innerHTML = '<p>No restaurants found. Try adjusting your filters.</p>';
        return;
    }

    const randomRestaurant = currentResults[Math.floor(Math.random() * currentResults.length)];
    
    document.getElementById('randomCard').innerHTML = `
        <h4>${randomRestaurant.name}</h4>
        <div class="cuisine">${randomRestaurant.cuisine}</div>
        <div class="rating">⭐ ${randomRestaurant.rating}</div>
        <div class="distance">${randomRestaurant.calculatedDistance} miles away</div>
        <div class="address">${randomRestaurant.address}</div>
    `;
}

function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <h3>${restaurant.name}</h3>
        <div class="cuisine">${restaurant.cuisine}</div>
        <div class="rating">⭐ ${restaurant.rating}</div>
        <div class="distance">${restaurant.calculatedDistance} miles away</div>
        <div class="address">${restaurant.address}</div>
    `;
    
    return card;
}

// Add some sample selections for demo
window.addEventListener('load', function() {
    // Pre-select mexican and american for demo
    document.querySelector('input[value="mexican"]').checked = true;
    document.querySelector('input[value="american"]').checked = true;
    
    // Apply dynamic styles via JavaScript (alternative to CSS)
    applyDynamicStyles();
});

// Function to apply styles via JavaScript
function applyDynamicStyles() {
    // Style the search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.style.background = 'linear-gradient(145deg, #ffffff, #f8f9fa)';
        searchForm.style.borderRadius = '20px';
        searchForm.style.boxShadow = '0 20px 40px rgba(0,45,98,0.1)';
        searchForm.style.border = '1px solid #e9ecef';
    }
    
    // Style all buttons dynamically
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.style.borderRadius = '25px';
        btn.style.fontWeight = '600';
        btn.style.textTransform = 'uppercase';
        btn.style.letterSpacing = '1px';
        
        // Add hover effects via JavaScript
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(0,45,98,0.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0,45,98,0.1)';
        });
    });
    
    // Style the header dynamically
    const header = document.querySelector('.header');
    if (header) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.borderBottom = '1px solid rgba(0, 45, 98, 0.2)';
    }
    
    // Style the brand title
    const brand = document.querySelector('.nav__brand h1');
    if (brand) {
        brand.style.background = 'linear-gradient(45deg, #002D62, #EB6E1F)';
        brand.style.webkitBackgroundClip = 'text';
        brand.style.webkitTextFillColor = 'transparent';
        brand.style.backgroundClip = 'text';
    }
    
    // Update user location marker color
    const userLocationStyle = `
        .user-location-marker div {
            background: #EB6E1F !important;
            border: 3px solid white !important;
        }
    `;
    
    // Add dynamic style to head
    const style = document.createElement('style');
    style.textContent = userLocationStyle;
    document.head.appendChild(style);
}

