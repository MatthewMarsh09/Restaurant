// scripts/update-restaurants.js
import { generateChainRestaurants } from './chain-restaurants.js';
import fs from 'fs/promises';
import path from 'path';

// Function to update restaurants.json with chain restaurants
async function updateRestaurantsWithChains() {
  try {
    // Read the current restaurants.json file
    const filePath = path.join(process.cwd(), 'data', 'restaurants.json');
    const data = await fs.readFile(filePath, 'utf8');
    const currentRestaurants = JSON.parse(data);
    
    console.log(`Current restaurant count: ${currentRestaurants.length}`);
    
    // Generate chain restaurants
    const chainRestaurants = generateChainRestaurants();
    console.log(`Generated ${chainRestaurants.length} chain restaurants`);
    
    // Combine current restaurants with chain restaurants
    const allRestaurants = [...currentRestaurants];
    
    // Add chain restaurants, avoiding duplicates by checking name and address
    chainRestaurants.forEach(chainRestaurant => {
      const isDuplicate = currentRestaurants.some(
        r => r.name === chainRestaurant.name && r.address === chainRestaurant.address
      );
      
      if (!isDuplicate) {
        allRestaurants.push(chainRestaurant);
      }
    });
    
    // Write the updated restaurants to the file
    await fs.writeFile(filePath, JSON.stringify(allRestaurants, null, 2), 'utf8');
    
    console.log(`Updated restaurants.json. New count: ${allRestaurants.length}`);
    return allRestaurants.length;
  } catch (error) {
    console.error('Error updating restaurants:', error);
    return -1;
  }
}

// Execute the update if this script is run directly
if (process.argv[1] === import.meta.url) {
  updateRestaurantsWithChains()
    .then(count => {
      if (count > 0) {
        console.log(`Successfully updated restaurants. Total count: ${count}`);
        process.exit(0);
      } else {
        console.error('Failed to update restaurants.');
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}

export { updateRestaurantsWithChains }; 