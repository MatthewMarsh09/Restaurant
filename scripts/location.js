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

export const generateMapsLink = address => {
    const encodedAddress = encodeURIComponent(address);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return isIOS ? `maps://?q=${encodedAddress}` : `https://maps.google.com/maps?q=${encodedAddress}`;
}; 