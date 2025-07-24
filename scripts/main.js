// Optimized restaurant data - top-rated establishments across Houston metro
let mockRestaurants = []; // This will be populated from the JSON file

// Fetch and process restaurant data
const fetchRestaurants = async () => {
    try {
        const response = await fetch('data/restaurants.json');
        if (!response.ok) throw new Error('Network response was not ok');
        mockRestaurants = await response.json();
        
        // Pre-process data for fast filtering
        restaurantsByCuisine = {};
        mockRestaurants.forEach(r => {
            const cuisine = r.cuisine.toLowerCase();
            if (!restaurantsByCuisine[cuisine]) {
                restaurantsByCuisine[cuisine] = [];
            }
            restaurantsByCuisine[cuisine].push(r);
        });

    } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        mockRestaurants = [{"name": "Uchi", "cuisine": "japanese", "rating": 4.8, "address": "904 Westheimer Rd, Houston, TX 77006", "lat": 29.7402, "lng": -95.3902}];
    }
};

let map, currentResults = [], currentUserGpsLocation = null; // Stored GPS location
const HOUSTON_DEFAULT = { lat: 29.7604, lng: -95.3698 }; // Default location constant
let restaurantsByCuisine = {}; // Pre-processed data for performance

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

// Address autocomplete functionality (OpenStreetMap)
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
    addressInput.value = suggestion.display_name;
    hideAutocomplete();
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
        const results = await response.json();
        const filteredResults = results.filter(result => 
            result.display_name.toLowerCase().includes(query.toLowerCase()) &&
            (result.display_name.toLowerCase().includes('texas') || result.display_name.toLowerCase().includes('tx'))
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
    formGroup.style.position = 'relative';
    const autocompleteContainer = createAutocompleteContainer();
    formGroup.appendChild(autocompleteContainer);

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

    document.addEventListener('click', (e) => {
        if (!formGroup.contains(e.target)) hideAutocomplete();
    });

    addressInput.addEventListener('blur', () => {
        setTimeout(hideAutocomplete, 150);
    });
};

// GPS location functionality
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

// Geocoding function
const geocodeLocation = async input => {
    const cleanedInput = input?.trim().toLowerCase();
    if (cleanedInput === 'current location') return currentUserGpsLocation || HOUSTON_DEFAULT;
    if (!cleanedInput) return HOUSTON_DEFAULT;

    const addressInput = document.getElementById('address');
    if (addressInput.dataset.lat && addressInput.dataset.lng) {
        return { lat: parseFloat(addressInput.dataset.lat), lng: parseFloat(addressInput.dataset.lng) };
    }

    try {
        const bounds = '28.5,-96.5,30.5,-94.5';
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(cleanedInput + ' Houston Texas')}&viewbox=${bounds}&bounded=1`;
        const response = await fetch(url);
        const results = await response.json();
        if (results.length > 0) {
            return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
        }
    } catch (error) {
        console.warn('Geocoding failed:', error);
    }

    console.warn("Could not geocode input, defaulting to Houston.");
    return HOUSTON_DEFAULT;
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await fetchRestaurants();
    ['showList', 'showMap', 'randomPick', 'pickAnother', 'useLocationBtn'].forEach((id, i) => 
        document.getElementById(id).onclick = [
            () => searchAndShow('list'), 
            () => searchAndShow('map'), 
            () => searchAndShow('random'), 
            () => showRandomResult(),
            requestUserLocation
        ][i]
    );
    initializeDropdown();
    initializeAddressAutocomplete();
    initializeChatbot(); // Initialize the chatbot
    document.getElementById('totalRestaurants').textContent = mockRestaurants.length;
});

// Main search function - updated for major performance gains
const searchAndShow = async viewType => {
    const address = document.getElementById('address').value;
    const range = parseInt(document.getElementById('range').value) || 10;
    const selectedCuisines = getSelectedCuisines();
    
    try {
        const searchCenter = await geocodeLocation(address);
        
        // Use pre-filtered lists for speed if cuisines are selected
        const restaurantsToSearch = selectedCuisines.length > 0
            ? selectedCuisines.flatMap(c => restaurantsByCuisine[c] || [])
            : mockRestaurants;

        currentResults = restaurantsToSearch.map(r => ({ 
            ...r, 
            calculatedDistance: calculateDistance(searchCenter.lat, searchCenter.lng, r.lat, r.lng) 
        }))
        .filter(r => r.calculatedDistance <= range)
        .sort((a, b) => a.calculatedDistance - b.calculatedDistance);
        
        const section = document.getElementById('resultsSection'), title = document.getElementById('resultsTitle');
        section.style.display = 'block'; 
        section.scrollIntoView({ behavior: 'smooth' });
        title.textContent = currentResults.length === 0 ? `No restaurants found within ${range} miles` : 
            `Found ${currentResults.length} restaurant${currentResults.length !== 1 ? 's' : ''} within ${range} miles`;
        
        ['listView', 'mapView', 'randomView'].forEach(v => document.getElementById(v).style.display = 'none');
        
        const viewFunction = { list: showListView, map: showMapView, random: showRandomView }[viewType];
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

// Highly optimized view function for rendering the list
const showListView = restaurants => {
    const grid = document.getElementById('resultsGrid');
    const container = document.getElementById('listView');
    container.style.display = 'block';
    
    // Use a document fragment to minimize DOM manipulation
    const fragment = document.createDocumentFragment();

    if (restaurants.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No restaurants found.';
        fragment.appendChild(p);
    } else {
        restaurants.forEach(r => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<h3>${r.name}</h3>
                <div class="cuisine">${r.cuisine.charAt(0).toUpperCase() + r.cuisine.slice(1)}</div>
                <div class="rating">⭐ ${r.rating}/5.0</div>
                <div class="distance">📍 ${r.calculatedDistance.toFixed(1)} miles</div>
                <div class="address"><a href="${generateMapsLink(r.address)}" target="_blank" rel="noopener">${r.address}</a></div>`;
            fragment.appendChild(card);
        });
    }

    // Clear the grid and append the fragment in one go
    grid.innerHTML = '';
    grid.appendChild(fragment);
};


// Map view function
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

// Chatbot functionality
const initializeChatbot = () => {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
    const closeChatbotBtn = document.getElementById('closeChatbotBtn');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    // Toggle chatbot visibility
    chatbotToggleBtn.addEventListener('click', () => chatbotContainer.classList.toggle('open'));
    closeChatbotBtn.addEventListener('click', () => chatbotContainer.classList.remove('open'));

    // Handle form submission
    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = chatbotInput.value.trim();
        if (!userInput) return;

        addMessage(userInput, 'user');
        chatbotInput.value = '';
        
        // Process user input and get a bot response
        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            addMessage(botResponse, 'bot');
        }, 250); // Reduced delay for faster response
    });

    // Function to add a message to the chat window
    const addMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.className = `${sender}-message`;
        const p = document.createElement('p');
        p.textContent = message; // Automatically sanitizes content
        messageElement.appendChild(p);
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll
    };

    // Refactored and optimized AI to process user input
    const getBotResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase();

        const keywords = {
            cuisine: ['mexican', 'italian', 'chinese', 'japanese', 'indian', 'bbq', 'seafood', 'fast food', 'sushi', 'pizza', 'burger', 'venezuelan'],
            quality: ['best', 'top', 'great', 'good', 'highest rated'],
            price: ['cheap', 'affordable', 'inexpensive'],
            random: ['random', 'anything', 'surprise me']
        };

        const findKeyword = (arr) => arr.find(kw => lowerInput.includes(kw));

        const foundCuisine = findKeyword(keywords.cuisine);
        const wantsBest = findKeyword(keywords.quality);
        const wantsCheap = findKeyword(keywords.price);

        if (findKeyword(keywords.random) && !foundCuisine) {
            const randomRest = mockRestaurants[Math.floor(Math.random() * mockRestaurants.length)];
            return `How about trying ${randomRest.name}? It's a ${randomRest.cuisine} place at ${randomRest.address}.`;
        }

        let results = [...mockRestaurants];

        if (foundCuisine) {
            results = results.filter(r => r.cuisine.toLowerCase() === foundCuisine);
        }

        if (wantsBest) {
            results.sort((a, b) => b.rating - a.rating);
        } else if (wantsCheap) {
            results.sort((a, b) => a.rating - b.rating);
            results = results.slice(0, Math.ceil(results.length / 2));
        }

        if (results.length === 0) {
            return "Sorry, I couldn't find any restaurants matching your request. Please try asking differently!";
        }

        const restaurant = wantsBest ? results[0] : results[Math.floor(Math.random() * results.length)];

        if (!restaurant) {
            return "I'm having trouble finding a suggestion. Could you rephrase your question?";
        }

        const qualityDesc = wantsBest ? 'highly-rated ' : '';
        return `I'd recommend ${restaurant.name}. It's a ${qualityDesc}${restaurant.cuisine} restaurant with a ${restaurant.rating}-star rating, located at ${restaurant.address}.`;
    };
};