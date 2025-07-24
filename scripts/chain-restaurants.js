// scripts/chain-restaurants.js

// This script helps with adding chain restaurants to our database
// It generates entries for major fast food and chain restaurants across the Houston area

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
  { name: "Rosenberg", lat: 29.5572, lng: -95.8085 },
  { name: "Alvin", lat: 29.4241, lng: -95.2441 },
  { name: "Texas City", lat: 29.3839, lng: -94.9027 },
  { name: "Kingwood", lat: 30.0519, lng: -95.1894 },
  { name: "Richmond", lat: 29.5822, lng: -95.7607 },
  { name: "Channelview", lat: 29.7758, lng: -95.1144 },
  { name: "Magnolia", lat: 30.2099, lng: -95.7513 },
  { name: "Crosby", lat: 29.9105, lng: -95.0616 },
  { name: "Seabrook", lat: 29.5641, lng: -95.0255 },
  { name: "Kemah", lat: 29.5438, lng: -95.0202 },
  { name: "Fulshear", lat: 29.6938, lng: -95.9078 },
  { name: "Brenham", lat: 30.1669, lng: -96.3977 },
  { name: "Hempstead", lat: 30.0974, lng: -96.0786 },
  { name: "Beaumont", lat: 30.0802, lng: -94.1266 },
  { name: "Port Arthur", lat: 29.8850, lng: -93.9399 },
  { name: "Angleton", lat: 29.1692, lng: -95.4344 },
  { name: "Lake Jackson", lat: 29.0339, lng: -95.4344 }
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

// Export the function to generate chain restaurants
export { generateChainRestaurants }; 