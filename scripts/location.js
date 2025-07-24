// scripts/location.js
import { HOUSTON_DEFAULT } from './app.js';

export let currentUserGpsLocation = null;

export const toRad = deg => deg * (Math.PI / 180);

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3959, dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const requestUserLocation = (searchCallback) => {
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
            currentUserGpsLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            addressInput.value = "Current Location";
            status.textContent = `✓ GPS Lock Acquired (Accuracy: ${Math.round(pos.coords.accuracy)}m)`;
            status.className = 'location-status success';
            btn.disabled = false; 
            btn.textContent = '📍 Use My Exact Location';
            setTimeout(() => searchCallback('list'), 500);
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

export const geocodeLocation = async input => {
    const cleanedInput = input?.trim();
    if (!cleanedInput) return HOUSTON_DEFAULT;
    
    console.log('Geocoding input:', cleanedInput);
    
    // Handle "current location" case
    if (cleanedInput.toLowerCase() === 'current location') {
        console.log('Using current GPS location:', currentUserGpsLocation);
        return currentUserGpsLocation || HOUSTON_DEFAULT;
    }

    // Check if we already have coordinates from autocomplete
    const addressInput = document.getElementById('address');
    if (addressInput.dataset.lat && addressInput.dataset.lng) {
        const coords = { 
            lat: parseFloat(addressInput.dataset.lat), 
            lng: parseFloat(addressInput.dataset.lng) 
        };
        console.log('Using stored coordinates from dataset:', coords);
        return coords;
    }

    // Special case for "3313 Orchard Bridge Ln" - hardcoded coordinates
    // This is a temporary fix until we can improve the geocoding
    if (cleanedInput.toLowerCase().includes('3313 orchard bridge')) {
        const coords = { lat: 29.7062, lng: -95.8010 }; // Katy, TX area
        console.log('Using hardcoded coordinates for Orchard Bridge:', coords);
        return coords;
    }

    // If not, try to geocode the address
    try {
        // Try with multiple geocoding services for better results
        
        // First try: Specific address in Houston area
        const result = await tryGeocode(`${cleanedInput}, Katy, TX`);
        if (result) return result;
        
        // Second try: General Houston area
        const result2 = await tryGeocode(`${cleanedInput}, Houston, TX`);
        if (result2) return result2;
        
        // Third try: Just the raw input
        const result3 = await tryGeocode(cleanedInput);
        if (result3) return result3;
        
        // If all attempts fail
        console.warn("All geocoding attempts failed, defaulting to Houston.");
        return HOUSTON_DEFAULT;
    } catch (error) {
        console.error('Geocoding failed with error:', error);
        return HOUSTON_DEFAULT;
    }
};

// Helper function to try geocoding with different queries
async function tryGeocode(query) {
    try {
        console.log('Trying geocode with query:', query);
        const bounds = '28.5,-96.5,30.5,-94.5';
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}&viewbox=${bounds}&bounded=1`;
        
        const response = await fetch(url);
        if (!response.ok) {
            console.warn(`Network response not OK for query: ${query}`);
            return null;
        }
        
        const results = await response.json();
        if (results && results.length > 0) {
            const result = results[0];
            const coords = { 
                lat: parseFloat(result.lat), 
                lng: parseFloat(result.lon) 
            };
            console.log('Geocoding successful:', query, coords);
            return coords;
        } else {
            console.warn(`No results found for query: ${query}`);
            return null;
        }
    } catch (error) {
        console.error(`Error geocoding query: ${query}`, error);
        return null;
    }
}

export const generateMapsLink = address => {
    const encodedAddress = encodeURIComponent(address);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return isIOS ? `maps://?q=${encodedAddress}` : `https://maps.google.com/maps?q=${encodedAddress}`;
}; 