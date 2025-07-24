// scripts/browser-update.js
// This script can be run in the browser console to update restaurants.json

// Define price ranges for different types of restaurants
const PRICE_RANGES = {
  fastFood: { symbol: '$', range: '$5-15' },
  casualDining: { symbol: '$$', range: '$15-30' },
  upscale: { symbol: '$$$', range: '$30-60' },
  fineDining: { symbol: '$$$$', range: '$60+' }
};

// Define chains with their cuisine type and price range
const RESTAURANT_CHAINS = [
  { name: "McDonald's", cuisine: "fast food", rating: 3.8, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Burger King", cuisine: "fast food", rating: 3.7, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Wendy's", cuisine: "fast food", rating: 3.9, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Taco Bell", cuisine: "fast food", rating: 3.8, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "KFC", cuisine: "fast food", rating: 3.7, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Popeyes", cuisine: "fast food", rating: 4.0, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Chipotle", cuisine: "mexican", rating: 4.2, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Subway", cuisine: "fast food", rating: 3.9, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Chick-fil-A", cuisine: "fast food", rating: 4.5, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Raising Cane's", cuisine: "fast food", rating: 4.4, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Whataburger", cuisine: "fast food", rating: 4.2, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "In-N-Out Burger", cuisine: "fast food", rating: 4.4, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Panda Express", cuisine: "chinese", rating: 3.9, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Sonic Drive-In", cuisine: "fast food", rating: 3.8, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Jack in the Box", cuisine: "fast food", rating: 3.7, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Arby's", cuisine: "fast food", rating: 3.8, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Five Guys", cuisine: "fast food", rating: 4.2, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Jersey Mike's", cuisine: "fast food", rating: 4.3, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Jimmy John's", cuisine: "fast food", rating: 4.1, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Firehouse Subs", cuisine: "fast food", rating: 4.2, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Jason's Deli", cuisine: "american", rating: 4.3, price: PRICE_RANGES.casualDining.symbol, priceRange: PRICE_RANGES.casualDining.range },
  { name: "Panera Bread", cuisine: "american", rating: 4.1, price: PRICE_RANGES.casualDining.symbol, priceRange: PRICE_RANGES.casualDining.range },
  { name: "CAVA", cuisine: "mediterranean", rating: 4.5, price: PRICE_RANGES.casualDining.symbol, priceRange: PRICE_RANGES.casualDining.range },
  { name: "Salata", cuisine: "salads", rating: 4.3, price: PRICE_RANGES.casualDining.symbol, priceRange: PRICE_RANGES.casualDining.range },
  { name: "Piada Italian Street Food", cuisine: "italian", rating: 4.3, price: PRICE_RANGES.casualDining.symbol, priceRange: PRICE_RANGES.casualDining.range },
  { name: "Cabo Bob's", cuisine: "mexican", rating: 4.5, price: PRICE_RANGES.casualDining.symbol, priceRange: PRICE_RANGES.casualDining.range },
  { name: "Jinya Ramen Bar", cuisine: "japanese", rating: 4.4, price: PRICE_RANGES.casualDining.symbol, priceRange: PRICE_RANGES.casualDining.range },
  { name: "Culver's", cuisine: "american", rating: 4.4, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Layne's Chicken Fingers", cuisine: "fast food", rating: 4.3, price: PRICE_RANGES.fastFood.symbol, priceRange: PRICE_RANGES.fastFood.range },
  { name: "Cracker Barrel", cuisine: "american", rating: 4.2, price: PRICE_RANGES.casualDining.symbol, priceRange: PRICE_RANGES.casualDining.range },
  { name: "Saltgrass Steakhouse", cuisine: "american", rating: 4.4, price: PRICE_RANGES.upscale.symbol, priceRange: PRICE_RANGES.upscale.range },
  { name: "Longhorn Steakhouse", cuisine: "american", rating: 4.3, price: PRICE_RANGES.upscale.symbol, priceRange: PRICE_RANGES.upscale.range },
  { name: "Whiskey Cake", cuisine: "american", rating: 4.5, price: PRICE_RANGES.upscale.symbol, priceRange: PRICE_RANGES.upscale.range }
];

// Define major areas around Houston within 50 miles
const HOUSTON_AREAS = [
  { name: "Downtown Houston", lat: 29.7604, lng: -95.3698 },
  { name: "The Woodlands", lat: 30.1658, lng: -95.4611 },
  { name: "Katy", lat: 29.7858, lng: -95.8245 },
  { name: "Sugar Land", lat: 29.5994, lng: -95.6142 },
  { name: "Pearland", lat: 29.5557, lng: -95.3233 },
  { name: "League City", lat: 29.5074, lng: -95.0949 },
  { name: "Baytown", lat: 29.7355, lng: -94.9774 },
  { name: "Conroe", lat: 30.3118, lng: -95.4561 },
  { name: "Galveston", lat: 29.3013, lng: -94.7977 },
  { name: "Cypress", lat: 29.9691, lng: -95.6972 },
  { name: "Spring", lat: 30.0799, lng: -95.4173 },
  { name: "Humble", lat: 29.9988, lng: -95.2622 },
  { name: "Tomball", lat: 30.0972, lng: -95.6161 },
  { name: "Pasadena", lat: 29.6911, lng: -95.2091 },
  { name: "Missouri City", lat: 29.6185, lng: -95.5377 },
  { name: "Friendswood", lat: 29.5294, lng: -95.2010 },
  { name: "Deer Park", lat: 29.7052, lng: -95.1238 },
  { name: "La Porte", lat: 29.6658, lng: -95.0191 },
  { name: "Stafford", lat: 29.6161, lng: -95.5577 },
  { name: "Rosenberg", lat: 29.5572, lng: -95.8085 }
];

// Generate addresses for each chain in each area
function generateChainRestaurants() {
  const chainRestaurants = [];
  
  RESTAURANT_CHAINS.forEach(chain => {
    // For each chain, add locations in major areas
    HOUSTON_AREAS.forEach(area => {
      // Slightly adjust lat/lng to avoid exact same location
      const latOffset = (Math.random() - 0.5) * 0.02;
      const lngOffset = (Math.random() - 0.5) * 0.02;
      
      // Generate a plausible address
      const streetNumber = Math.floor(1000 + Math.random() * 9000);
      const streetNames = ["Main St", "Oak Dr", "Park Ave", "Center Blvd", "Washington St", "Market St"];
      const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
      
      const restaurant = {
        name: `${chain.name} (${area.name})`,
        cuisine: chain.cuisine,
        rating: chain.rating,
        price: chain.price,
        priceRange: chain.priceRange,
        address: `${streetNumber} ${streetName}, ${area.name}, TX`,
        lat: area.lat + latOffset,
        lng: area.lng + lngOffset
      };
      
      chainRestaurants.push(restaurant);
    });
  });
  
  return chainRestaurants;
}

// Function to update existing restaurants with price ranges
function addPriceRangesToExisting(restaurants) {
  return restaurants.map(restaurant => {
    // Skip if restaurant already has a priceRange
    if (restaurant.priceRange) {
      return restaurant;
    }
    
    // Add price range based on existing price symbol
    let priceRange = '$5-15'; // Default
    
    if (restaurant.price === '$') {
      priceRange = '$5-15';
    } else if (restaurant.price === '$$') {
      priceRange = '$15-30';
    } else if (restaurant.price === '$$$') {
      priceRange = '$30-60';
    } else if (restaurant.price === '$$$$') {
      priceRange = '$60+';
    }
    
    return {
      ...restaurant,
      priceRange
    };
  });
}

// Function to update restaurants.json with chain restaurants
async function updateRestaurantsWithChains() {
  try {
    // Show status
    const statusContainer = document.getElementById('statusContainer');
    statusContainer.style.display = 'block';
    statusContainer.className = 'status';
    statusContainer.innerHTML = 'Fetching current restaurant data...';
    
    // Fetch the current restaurants.json file
    const response = await fetch('data/restaurants.json');
    if (!response.ok) throw new Error('Failed to fetch restaurants.json');
    const currentRestaurants = await response.json();
    
    statusContainer.innerHTML += `<br>Current restaurant count: ${currentRestaurants.length}`;
    
    // Update existing restaurants with price ranges
    statusContainer.innerHTML += '<br>Adding price ranges to existing restaurants...';
    const updatedExistingRestaurants = addPriceRangesToExisting(currentRestaurants);
    
    // Generate chain restaurants
    statusContainer.innerHTML += '<br>Generating chain restaurants...';
    const chainRestaurants = generateChainRestaurants();
    statusContainer.innerHTML += `<br>Generated ${chainRestaurants.length} chain restaurants`;
    
    // Combine current restaurants with chain restaurants
    statusContainer.innerHTML += '<br>Merging restaurant data...';
    const allRestaurants = [...updatedExistingRestaurants];
    
    // Add chain restaurants, avoiding duplicates by checking name and address
    let addedCount = 0;
    chainRestaurants.forEach(chainRestaurant => {
      const isDuplicate = currentRestaurants.some(
        r => r.name === chainRestaurant.name && r.address === chainRestaurant.address
      );
      
      if (!isDuplicate) {
        allRestaurants.push(chainRestaurant);
        addedCount++;
      }
    });
    
    statusContainer.innerHTML += `<br>Added ${addedCount} new restaurants`;
    statusContainer.innerHTML += `<br>Updated restaurants count: ${allRestaurants.length}`;
    statusContainer.className = 'status success';
    
    // Generate a downloadable JSON file
    const dataStr = JSON.stringify(allRestaurants, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    // Create a download link
    const downloadContainer = document.getElementById('downloadContainer');
    downloadContainer.innerHTML = '';
    
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', dataUri);
    downloadLink.setAttribute('download', 'updated-restaurants.json');
    downloadLink.innerText = 'Download Updated Restaurants JSON';
    downloadLink.className = 'btn';
    
    // Add the link to the page
    downloadContainer.appendChild(downloadLink);
    
    return allRestaurants.length;
  } catch (error) {
    console.error('Error updating restaurants:', error);
    
    const statusContainer = document.getElementById('statusContainer');
    statusContainer.style.display = 'block';
    statusContainer.className = 'status error';
    statusContainer.innerHTML = `Error: ${error.message}`;
    
    return -1;
  }
}

// Set up event listener for the update button
document.addEventListener('DOMContentLoaded', () => {
  const updateBtn = document.getElementById('updateBtn');
  if (updateBtn) {
    updateBtn.addEventListener('click', () => {
      updateRestaurantsWithChains()
        .then(count => {
          if (count > 0) {
            console.log(`Successfully generated updated restaurants file. Total count: ${count}`);
          } else {
            console.error('Failed to update restaurants.');
          }
        })
        .catch(err => {
          console.error('Error:', err);
        });
    });
  }
}); 