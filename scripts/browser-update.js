// scripts/browser-update.js
// This script can be run in the browser console to update restaurants.json

// Define price ranges for different types of restaurants
const PRICE_RANGES = {
  fastFood: '$',
  casualDining: '$$',
  upscale: '$$$',
  fineDining: '$$$$'
};

// Define chains with their cuisine type and price range
const RESTAURANT_CHAINS = [
  { name: "McDonald's", cuisine: "fast food", rating: 3.8, price: PRICE_RANGES.fastFood },
  { name: "Burger King", cuisine: "fast food", rating: 3.7, price: PRICE_RANGES.fastFood },
  { name: "Wendy's", cuisine: "fast food", rating: 3.9, price: PRICE_RANGES.fastFood },
  { name: "Taco Bell", cuisine: "fast food", rating: 3.8, price: PRICE_RANGES.fastFood },
  { name: "KFC", cuisine: "fast food", rating: 3.7, price: PRICE_RANGES.fastFood },
  { name: "Popeyes", cuisine: "fast food", rating: 4.0, price: PRICE_RANGES.fastFood },
  { name: "Chipotle", cuisine: "mexican", rating: 4.2, price: PRICE_RANGES.fastFood },
  { name: "Subway", cuisine: "fast food", rating: 3.9, price: PRICE_RANGES.fastFood },
  { name: "Chick-fil-A", cuisine: "fast food", rating: 4.5, price: PRICE_RANGES.fastFood },
  { name: "Raising Cane's", cuisine: "fast food", rating: 4.4, price: PRICE_RANGES.fastFood },
  { name: "Whataburger", cuisine: "fast food", rating: 4.2, price: PRICE_RANGES.fastFood },
  { name: "In-N-Out Burger", cuisine: "fast food", rating: 4.4, price: PRICE_RANGES.fastFood },
  { name: "Panda Express", cuisine: "chinese", rating: 3.9, price: PRICE_RANGES.fastFood },
  { name: "Sonic Drive-In", cuisine: "fast food", rating: 3.8, price: PRICE_RANGES.fastFood },
  { name: "Jack in the Box", cuisine: "fast food", rating: 3.7, price: PRICE_RANGES.fastFood },
  { name: "Arby's", cuisine: "fast food", rating: 3.8, price: PRICE_RANGES.fastFood },
  { name: "Five Guys", cuisine: "fast food", rating: 4.2, price: PRICE_RANGES.fastFood },
  { name: "Jersey Mike's", cuisine: "fast food", rating: 4.3, price: PRICE_RANGES.fastFood },
  { name: "Jimmy John's", cuisine: "fast food", rating: 4.1, price: PRICE_RANGES.fastFood },
  { name: "Firehouse Subs", cuisine: "fast food", rating: 4.2, price: PRICE_RANGES.fastFood },
  { name: "Jason's Deli", cuisine: "american", rating: 4.3, price: PRICE_RANGES.casualDining },
  { name: "Panera Bread", cuisine: "american", rating: 4.1, price: PRICE_RANGES.casualDining },
  { name: "CAVA", cuisine: "mediterranean", rating: 4.5, price: PRICE_RANGES.casualDining },
  { name: "Salata", cuisine: "salads", rating: 4.3, price: PRICE_RANGES.casualDining },
  { name: "Piada Italian Street Food", cuisine: "italian", rating: 4.3, price: PRICE_RANGES.casualDining },
  { name: "Cabo Bob's", cuisine: "mexican", rating: 4.5, price: PRICE_RANGES.casualDining },
  { name: "Jinya Ramen Bar", cuisine: "japanese", rating: 4.4, price: PRICE_RANGES.casualDining },
  { name: "Culver's", cuisine: "american", rating: 4.4, price: PRICE_RANGES.fastFood },
  { name: "Layne's Chicken Fingers", cuisine: "fast food", rating: 4.3, price: PRICE_RANGES.fastFood },
  { name: "Cracker Barrel", cuisine: "american", rating: 4.2, price: PRICE_RANGES.casualDining },
  { name: "Saltgrass Steakhouse", cuisine: "american", rating: 4.4, price: PRICE_RANGES.upscale },
  { name: "Longhorn Steakhouse", cuisine: "american", rating: 4.3, price: PRICE_RANGES.upscale },
  { name: "Whiskey Cake", cuisine: "american", rating: 4.5, price: PRICE_RANGES.upscale }
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
        address: `${streetNumber} ${streetName}, ${area.name}, TX`,
        lat: area.lat + latOffset,
        lng: area.lng + lngOffset
      };
      
      chainRestaurants.push(restaurant);
    });
  });
  
  return chainRestaurants;
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
    
    // Generate chain restaurants
    statusContainer.innerHTML += '<br>Generating chain restaurants...';
    const chainRestaurants = generateChainRestaurants();
    statusContainer.innerHTML += `<br>Generated ${chainRestaurants.length} chain restaurants`;
    
    // Combine current restaurants with chain restaurants
    statusContainer.innerHTML += '<br>Merging restaurant data...';
    const allRestaurants = [...currentRestaurants];
    
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