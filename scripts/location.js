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

// Special case addresses that need specific handling
const SPECIAL_ADDRESSES = {
    '3313 orchard bridge': { lat: 29.7062, lng: -95.8010 },
    'orchard bridge': { lat: 29.7062, lng: -95.8010 }
};

export const geocodeLocation = async input => {
    const cleanedInput = input?.trim();
    if (!cleanedInput) return HOUSTON_DEFAULT;
    
    // Handle "current location" case
    if (cleanedInput.toLowerCase() === 'current location') 
        return currentUserGpsLocation || HOUSTON_DEFAULT;

    // Check if we already have coordinates from autocomplete
    const addressInput = document.getElementById('address');
    if (addressInput.dataset.lat && addressInput.dataset.lng) {
        return { 
            lat: parseFloat(addressInput.dataset.lat), 
            lng: parseFloat(addressInput.dataset.lng) 
        };
    }

    // Check for special case addresses
    const lowerInput = cleanedInput.toLowerCase();
    for (const [key, coords] of Object.entries(SPECIAL_ADDRESSES)) {
        if (lowerInput.includes(key)) return coords;
    }

    // Try geocoding with most likely locations first
    try {
        const bounds = '28.5,-96.5,30.5,-94.5';
        const queries = [
            `${cleanedInput}, Katy, TX`,
            `${cleanedInput}, Houston, TX`,
            cleanedInput
        ];
        
        for (const query of queries) {
            const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}&viewbox=${bounds}&bounded=1`;
            const response = await fetch(url);
            if (!response.ok) continue;
            
            const results = await response.json();
            if (results?.length > 0) {
                return { 
                    lat: parseFloat(results[0].lat), 
                    lng: parseFloat(results[0].lon) 
                };
            }
        }
    } catch (error) {
        console.error('Geocoding failed:', error);
    }

    return HOUSTON_DEFAULT;
};

// Verify restaurant coordinates against their addresses
export const verifyRestaurantCoordinates = async (restaurants) => {
    const verificationResults = {
        verified: [],
        needsReview: [],
        failed: []
    };
    
    const statusElement = document.getElementById('locationStatus');
    if (statusElement) {
        statusElement.textContent = 'Verifying restaurant coordinates...';
        statusElement.className = 'location-status loading';
    }
    
    // Process restaurants in batches to avoid rate limiting
    const batchSize = 10;
    const batches = [];
    
    for (let i = 0; i < restaurants.length; i += batchSize) {
        batches.push(restaurants.slice(i, i + batchSize));
    }
    
    for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        
        // Update status
        if (statusElement) {
            statusElement.textContent = `Verifying coordinates: batch ${i+1}/${batches.length}`;
        }
        
        // Process each restaurant in the batch
        const batchPromises = batch.map(async restaurant => {
            try {
                // Skip if missing address or coordinates
                if (!restaurant.address || !restaurant.lat || !restaurant.lng) {
                    return { ...restaurant, verificationStatus: 'missing_data' };
                }
                
                // Geocode the address
                const geocoded = await geocodeAddressForVerification(restaurant.address);
                if (!geocoded) {
                    verificationResults.failed.push(restaurant);
                    return { ...restaurant, verificationStatus: 'geocoding_failed' };
                }
                
                // Calculate distance between stored and geocoded coordinates
                const distance = calculateDistance(
                    restaurant.lat, restaurant.lng,
                    geocoded.lat, geocoded.lng
                );
                
                // If distance is more than 1 mile, flag for review
                if (distance > 1) {
                    const result = { 
                        ...restaurant, 
                        verificationStatus: 'needs_review',
                        geocodedLat: geocoded.lat,
                        geocodedLng: geocoded.lng,
                        distanceDiff: distance
                    };
                    verificationResults.needsReview.push(result);
                    return result;
                } else {
                    const result = { 
                        ...restaurant, 
                        verificationStatus: 'verified',
                        distanceDiff: distance
                    };
                    verificationResults.verified.push(result);
                    return result;
                }
            } catch (error) {
                console.error(`Error verifying ${restaurant.name}:`, error);
                verificationResults.failed.push(restaurant);
                return { ...restaurant, verificationStatus: 'error' };
            }
        });
        
        await Promise.all(batchPromises);
        
        // Add a small delay between batches to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    if (statusElement) {
        statusElement.textContent = `Verification complete: ${verificationResults.verified.length} verified, ${verificationResults.needsReview.length} need review, ${verificationResults.failed.length} failed`;
        statusElement.className = 'location-status success';
        
        // Reset after a few seconds
        setTimeout(() => {
            statusElement.textContent = 'Click to automatically use your precise GPS coordinates';
            statusElement.className = 'location-status';
        }, 5000);
    }
    
    return verificationResults;
};

// Helper function for verification
async function geocodeAddressForVerification(address) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
        const response = await fetch(url);
        if (!response.ok) return null;
        
        const results = await response.json();
        if (results?.length > 0) {
            return { 
                lat: parseFloat(results[0].lat), 
                lng: parseFloat(results[0].lon) 
            };
        }
        return null;
    } catch (error) {
        console.error('Verification geocoding failed:', error);
        return null;
    }
}

export const generateMapsLink = address => {
    const encodedAddress = encodeURIComponent(address);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return isIOS ? `maps://?q=${encodedAddress}` : `https://maps.google.com/maps?q=${encodedAddress}`;
}; 