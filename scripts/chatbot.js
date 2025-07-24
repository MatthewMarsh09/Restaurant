// scripts/chatbot.js
import { mockRestaurants } from './restaurants.js';

// --- Conversational Phrases ---
const greetings = [
    "Hello! What kind of food are you craving today?",
    "Hi there! I'm your Houston Food Finder assistant. What can I help you find?",
    "Hey! Looking for a great place to eat? Tell me what's on your mind."
];

const confirmations = {
    best: [
        "On the hunt for the best of the best, I see! Let's find a top-rated spot for you.",
        "You want the best? I can certainly help with that. Looking for top-rated places now...",
        "Excellent choice! I'll find a highly-rated restaurant for you."
    ],
    cuisine: [
        "Great, you're looking for {cuisine}! I can definitely find some options for you.",
        "I know some fantastic {cuisine} places. Let me see...",
        "Craving {cuisine}? You've come to the right place. Let's find the perfect restaurant."
    ]
};

const recommendations = [
    "I'd recommend checking out {name}. It's a {quality}{cuisine} restaurant with a {rating}-star rating, located at {address}.",
    "How about {name}? People say it's a great {quality}{cuisine} spot. You can find it at {address} and it's rated {rating}/5.",
    "You might really like {name}. It's a fantastic {quality}{cuisine} place with a rating of {rating}, located at {address}."
];

const apologies = [
    "I'm sorry, I couldn't find any restaurants that match your request. Could you try asking in a different way?",
    "Hmm, I'm not finding anything for that. Maybe we could try a different type of food or a broader search?",
    "My apologies, I'm coming up empty on that one. Is there anything else I can look for?"
];

// --- Helper Functions ---
const getRandomResponse = (arr) => arr[Math.floor(Math.random() * arr.length)];
const formatResponse = (template, data) => template.replace(/{(\w+)}/g, (match, key) => data[key] || '');

// --- Core Chatbot Logic ---

const addMessage = (message, sender) => {
    const chatbotMessages = document.getElementById('chatbotMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `${sender}-message`;
    const p = document.createElement('p');
    p.textContent = message;
    messageElement.appendChild(p);
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

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
    
    let initialResponse = "";

    if (findKeyword(keywords.random) && !foundCuisine) {
        const randomRest = mockRestaurants[Math.floor(Math.random() * mockRestaurants.length)];
        return `How about trying something random? I suggest ${randomRest.name}. It's a ${randomRest.cuisine} place at ${randomRest.address}. Enjoy!`;
    }

    let results = [...mockRestaurants];
    
    if (foundCuisine) {
        initialResponse = getRandomResponse(confirmations.cuisine).replace('{cuisine}', foundCuisine);
        results = results.filter(r => r.cuisine.toLowerCase() === foundCuisine);
    }
    
    if (wantsBest) {
        if (!initialResponse) initialResponse = getRandomResponse(confirmations.best);
        results.sort((a, b) => b.rating - a.rating);
    } else if (wantsCheap) {
        results = results.slice().sort((a, b) => a.rating - b.rating).slice(0, Math.ceil(results.length / 2));
    }

    if (results.length === 0 || !mockRestaurants.some(r => results.includes(r))) {
        return getRandomResponse(apologies);
    }

    const restaurant = wantsBest ? results[0] : results[Math.floor(Math.random() * results.length)];
    if (!restaurant) {
        return getRandomResponse(apologies);
    }
    
    const recommendationTemplate = getRandomResponse(recommendations);
    const recommendationText = formatResponse(recommendationTemplate, {
        name: restaurant.name,
        quality: wantsBest ? 'highly-rated ' : '',
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        address: restaurant.address
    });
    
    return initialResponse ? `${initialResponse}\n\n${recommendationText}` : recommendationText;
};

export const initializeChatbot = () => {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
    const closeChatbotBtn = document.getElementById('closeChatbotBtn');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');

    chatbotToggleBtn.addEventListener('click', () => {
        chatbotContainer.classList.toggle('open');
        const messages = document.getElementById('chatbotMessages');
        if (chatbotContainer.classList.contains('open') && messages.children.length === 0) {
            addMessage(getRandomResponse(greetings), 'bot');
        }
    });

    closeChatbotBtn.addEventListener('click', () => chatbotContainer.classList.remove('open'));

    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = chatbotInput.value.trim();
        if (!userInput) return;
        addMessage(userInput, 'user');
        chatbotInput.value = '';
        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            addMessage(botResponse, 'bot');
        }, 500); // Slightly longer delay for a more natural feel
    });
}; 