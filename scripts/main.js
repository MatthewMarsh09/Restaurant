// Mock restaurant data
const mockRestaurants = [
    // Houston Restaurants
    {
        name: "The Original Ninfa's",
        cuisine: "mexican",
        rating: 4.3,
        distance: 2.5,
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
        distance: 3.1,
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
        distance: 2.9,
        address: "904 Westheimer Rd, Houston, TX 77006",
        lat: 29.7399,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "The Pass & Provisions",
        cuisine: "american",
        rating: 4.5,
        distance: 4.2,
        address: "807 Taft St, Houston, TX 77019",
        lat: 29.7633,
        lng: -95.4255,
        city: "Houston",
        state: "TX",
        zipcode: "77019"
    },
    {
        name: "Xochi",
        cuisine: "mexican",
        rating: 4.6,
        distance: 1.8,
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
        distance: 5.1,
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
        distance: 3.8,
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
        distance: 6.2,
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
        distance: 7.8,
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
        distance: 4.5,
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
        distance: 8.3,
        address: "9348 Bellaire Blvd, Houston, TX 77036",
        lat: 29.7058,
        lng: -95.4894,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "North Italia",
        cuisine: "italian",
        rating: 4.2,
        distance: 12.4,
        address: "1700 Post Oak Blvd, Houston, TX 77056",
        lat: 29.7372,
        lng: -95.4618,
        city: "Houston",
        state: "TX",
        zipcode: "77056"
    },
    {
        name: "Brennan's of Houston",
        cuisine: "american",
        rating: 4.4,
        distance: 3.2,
        address: "3300 Smith St, Houston, TX 77006",
        lat: 29.7407,
        lng: -95.3913,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Pizza Karma",
        cuisine: "pizza",
        rating: 4.3,
        distance: 5.8,
        address: "4502 Montrose Blvd, Houston, TX 77006",
        lat: 29.7341,
        lng: -95.3913,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Kata Robata",
        cuisine: "japanese",
        rating: 4.7,
        distance: 7.1,
        address: "3600 Kirby Dr, Houston, TX 77098",
        lat: 29.7341,
        lng: -95.4113,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },
    {
        name: "Pondicheri",
        cuisine: "indian",
        rating: 4.5,
        distance: 2.7,
        address: "2800 Kirby Dr, Houston, TX 77098",
        lat: 29.7341,
        lng: -95.4113,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },
    {
        name: "Tacos Tierra Caliente",
        cuisine: "mexican",
        rating: 4.4,
        distance: 9.2,
        address: "2032 Dunlavy St, Houston, TX 77006",
        lat: 29.7407,
        lng: -95.4013,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Crawfish & Noodles",
        cuisine: "vietnamese",
        rating: 4.3,
        distance: 11.5,
        address: "11360 Bellaire Blvd, Houston, TX 77072",
        lat: 29.7058,
        lng: -95.5794,
        city: "Houston",
        state: "TX",
        zipcode: "77072"
    },
    {
        name: "Giuseppe Pizzeria",
        cuisine: "pizza",
        rating: 4.6,
        distance: 8.7,
        address: "2202 Washington Ave, Houston, TX 77007",
        lat: 29.7965,
        lng: -95.4115,
        city: "Houston",
        state: "TX",
        zipcode: "77007"
    },
    {
        name: "BCN Taste & Tradition",
        cuisine: "spanish",
        rating: 4.5,
        distance: 4.8,
        address: "4210 Roseland St, Houston, TX 77006",
        lat: 29.7341,
        lng: -95.3813,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Mamak",
        cuisine: "malaysian",
        rating: 4.4,
        distance: 6.3,
        address: "8201 Richmond Ave, Houston, TX 77063",
        lat: 29.7265,
        lng: -95.5294,
        city: "Houston",
        state: "TX",
        zipcode: "77063"
    },
    {
        name: "Killen's Barbecue",
        cuisine: "american",
        rating: 4.8,
        distance: 22.5,
        address: "3613 E Broadway St, Pearland, TX 77581",
        lat: 29.5583,
        lng: -95.2861,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Truth BBQ",
        cuisine: "american",
        rating: 4.6,
        distance: 8.9,
        address: "110 N Main St, Brenham, TX 77833",
        lat: 30.1669,
        lng: -96.3978,
        city: "Brenham",
        state: "TX",
        zipcode: "77833"
    },
    {
        name: "Roka Akor",
        cuisine: "japanese",
        rating: 4.7,
        distance: 13.2,
        address: "2929 Weslayan St, Houston, TX 77027",
        lat: 29.7372,
        lng: -95.4518,
        city: "Houston",
        state: "TX",
        zipcode: "77027"
    }
];

let map = null;
let currentResults = [];

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

function searchAndShow(viewType) {
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
    
    // Filter restaurants based on selected cuisines, range, and location
    currentResults = mockRestaurants.filter(restaurant => {
        const cuisineMatch = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisine);
        const rangeMatch = restaurant.distance <= range;
        const locationMatch = matchesLocation(restaurant, locationFilter);
        return cuisineMatch && rangeMatch && locationMatch;
    });

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
        map = L.map('map').setView([29.7604, -95.3698], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }

    // Clear existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add markers for current results
    currentResults.forEach(restaurant => {
        const marker = L.marker([restaurant.lat, restaurant.lng]).addTo(map);
        marker.bindPopup(`
            <div style="text-align: center;">
                <h4 style="color: #ea580c; margin-bottom: 5px;">${restaurant.name}</h4>
                <p style="margin: 5px 0;"><span style="background: #fef2f2; color: #ea580c; padding: 2px 8px; border-radius: 10px; font-size: 12px;">${restaurant.cuisine}</span></p>
                <p style="margin: 5px 0;">⭐ ${restaurant.rating} • ${restaurant.distance} miles</p>
                <p style="font-size: 12px; color: #666;">${restaurant.address}</p>
            </div>
        `);
    });

    // Fit map to show all markers
    if (currentResults.length > 0) {
        const group = new L.featureGroup(currentResults.map(r => L.marker([r.lat, r.lng])));
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
        <div class="distance">${randomRestaurant.distance} miles away</div>
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
        <div class="distance">${restaurant.distance} miles away</div>
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
        searchForm.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
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
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Style the header dynamically
    const header = document.querySelector('.header');
    if (header) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.borderBottom = '1px solid rgba(255, 107, 53, 0.2)';
    }
    
    // Style the brand title
    const brand = document.querySelector('.nav__brand h1');
    if (brand) {
        brand.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
        brand.style.webkitBackgroundClip = 'text';
        brand.style.webkitTextFillColor = 'transparent';
        brand.style.backgroundClip = 'text';
    }
}
