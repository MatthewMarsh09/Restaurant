// scripts/chatbot.js
import { mockRestaurants } from './restaurants.js';

// --- Conversational Engine ---

const foodItemToCuisineMap = {
    'burger': ['american', 'fast food'],
    'taco': ['mexican'],
    'fajita': ['mexican'],
    'quesadilla': ['mexican'],
    'arepa': ['venezuelan'],
    'sushi': ['japanese'],
    'sashimi': ['japanese'],
    'ramen': ['japanese'],
    'pho': ['vietnamese'],
    'pizza': ['pizza', 'italian', 'fast food'],
    'bbq': ['bbq'],
    'brisket': ['bbq'],
    'ribs': ['bbq'],
    'gumbo': ['cajun', 'creole'],
    'pasta': ['italian'],
    'salad': ['salads'],
    'steak': ['american'],
    'seafood': ['seafood'],
    'kabob': ['persian', 'mediterranean'],
    'curry': ['indian', 'thai'],
    'tandoori': ['indian'],
    'samosa': ['indian'],
    'pad thai': ['thai'],
    'sushi roll': ['japanese'],
    'oyster': ['seafood'],
    'crawfish': ['cajun', 'seafood']
};

// Conversation memory
let conversationContext = {
    lastMentionedItem: null,
    lastRecommendedRestaurants: [],
    userPreferences: {
        likedCuisines: [],
        dislikedCuisines: []
    },
    conversationStage: 'greeting' // greeting, recommending, follow_up
};

const greetings = [
    "Hey there! What kind of food are you in the mood for today?",
    "Hi! I'm your friendly food finder. What sounds good right now?",
    "Hello! Let's find you something delicious. What are you craving?"
];

const confirmations = {
    best: [
        "On the hunt for the best of the best, I see! Let's find a top-rated spot for you.",
        "You want the best? I can certainly help with that. Looking for top-rated places now...",
        "Excellent choice! I'll find a highly-rated restaurant for you."
    ],
    item: [
        "Aha, craving {item}! You've come to the right place. Let me see what I can find.",
        "A good {item} sounds perfect. I'll look for some spots that should have what you're looking for.",
        "One {item}, coming right up! Well, a suggestion for one, at least. Searching now..."
    ]
};

const recommendations = [
    "I found a few great options for you:",
    "Here are some spots that I think you'll really like:",
    "How do these look?"
];

const followUpQuestions = [
    "Would you like me to find something else instead?",
    "Is there a specific area of Houston you're looking in?",
    "Do you prefer casual dining or something more upscale?",
    "Are you looking for something with outdoor seating?"
];

const positiveResponses = [
    "Great choice! {restaurant} is really popular.",
    "Excellent! I've heard {restaurant} has amazing food.",
    "Nice pick! {restaurant} is definitely worth checking out."
];

const fallbacks = [
    "I'm sorry, I'm not familiar with that. Could you try asking for a type of food, like 'pizza', 'tacos', or 'sushi'?",
    "Hmm, I'm not sure about that one. Try asking for a specific cuisine or a popular dish, and I'll do my best to help!",
    "I'm still learning about all the delicious food in Houston! Can you try another search term for me?"
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// --- Main Chatbot Logic ---

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

const detectIntent = (input) => {
    const lowerInput = input.toLowerCase().trim();
    
    // Check for specific food items
    for (const item in foodItemToCuisineMap) {
        if (lowerInput.includes(item)) {
            return { type: 'food_item', value: item };
        }
    }
    
    // Check for quality keywords
    if (['best', 'top', 'great', 'good'].some(kw => lowerInput.includes(kw))) {
        return { type: 'quality' };
    }
    
    // Check for location mentions
    if (lowerInput.includes('downtown') || lowerInput.includes('midtown') || 
        lowerInput.includes('uptown') || lowerInput.includes('heights') || 
        lowerInput.includes('montrose') || lowerInput.includes('katy')) {
        const locations = ['downtown', 'midtown', 'uptown', 'heights', 'montrose', 'katy'];
        const found = locations.find(loc => lowerInput.includes(loc));
        return { type: 'location', value: found };
    }
    
    // Check for yes/no responses
    if (['yes', 'yeah', 'yep', 'sure', 'okay', 'ok'].some(kw => lowerInput === kw || lowerInput.startsWith(kw + ' '))) {
        return { type: 'affirmative' };
    }
    
    if (['no', 'nope', 'nah', 'not'].some(kw => lowerInput === kw || lowerInput.startsWith(kw + ' '))) {
        return { type: 'negative' };
    }
    
    // Check for thanks
    if (['thanks', 'thank you', 'thx'].some(kw => lowerInput.includes(kw))) {
        return { type: 'gratitude' };
    }
    
    return { type: 'unknown' };
};

const getBotResponse = (userInput) => {
    const intent = detectIntent(userInput);
    
    // Handle based on intent and conversation stage
    switch (intent.type) {
        case 'food_item':
            handleFoodItemIntent(intent.value);
            break;
            
        case 'quality':
            handleQualityIntent();
            break;
            
        case 'location':
            handleLocationIntent(intent.value);
            break;
            
        case 'affirmative':
            if (conversationContext.conversationStage === 'follow_up') {
                addMessage("Great! What kind of food are you interested in?", 'bot');
                conversationContext.conversationStage = 'greeting';
            } else {
                addMessage(getRandomItem(followUpQuestions), 'bot');
                conversationContext.conversationStage = 'follow_up';
            }
            break;
            
        case 'negative':
            addMessage("No problem! Let me know if you need any other food suggestions.", 'bot');
            conversationContext.conversationStage = 'greeting';
            break;
            
        case 'gratitude':
            addMessage("You're welcome! Enjoy your meal. Let me know if you need anything else!", 'bot');
            conversationContext.conversationStage = 'greeting';
            break;
            
        default:
            // If we're in a follow-up stage, try to be helpful
            if (conversationContext.conversationStage === 'follow_up') {
                addMessage("I'm not quite sure what you're looking for. Would you like me to suggest some of our top-rated restaurants?", 'bot');
            } else {
                addMessage(getRandomItem(fallbacks), 'bot');
            }
    }
};

const handleFoodItemIntent = (item) => {
    const potentialCuisines = foodItemToCuisineMap[item];
    const confirmation = getRandomItem(confirmations.item).replace('{item}', item);
    addMessage(confirmation, 'bot');
    
    // Update conversation context
    conversationContext.lastMentionedItem = item;
    conversationContext.conversationStage = 'recommending';
    
    setTimeout(() => {
        const results = mockRestaurants
            .filter(r => potentialCuisines.includes(r.cuisine.toLowerCase()))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
        
        conversationContext.lastRecommendedRestaurants = results;
        
        if (results.length > 0) {
            let response = `${getRandomItem(recommendations)}\n\n`;
            results.forEach(r => {
                response += `• ${r.name} (${r.cuisine}) - ⭐${r.rating}\n`;
            });
            addMessage(response, 'bot');
            
            // Add a follow-up question after recommendations
            setTimeout(() => {
                addMessage("Do any of these sound good to you?", 'bot');
                conversationContext.conversationStage = 'follow_up';
            }, 1000);
        } else {
            addMessage(`I'm sorry, I couldn't find any spots known for ${item}. Maybe try another dish?`, 'bot');
            conversationContext.conversationStage = 'greeting';
        }
    }, 800);
};

const handleQualityIntent = () => {
    addMessage(getRandomItem(confirmations.best), 'bot');
    conversationContext.conversationStage = 'recommending';
    
    setTimeout(() => {
        const results = [...mockRestaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);
        conversationContext.lastRecommendedRestaurants = results;
        
        let response = `Here are some of the highest-rated restaurants overall:\n\n`;
        results.forEach(r => {
            response += `• ${r.name} (${r.cuisine}) - ⭐${r.rating}\n`;
        });
        addMessage(response, 'bot');
        
        // Add a follow-up question after recommendations
        setTimeout(() => {
            addMessage("Do any of these catch your eye?", 'bot');
            conversationContext.conversationStage = 'follow_up';
        }, 1000);
    }, 800);
};

const handleLocationIntent = (location) => {
    addMessage(`Looking for places in ${location}! Let me find some great options in that area.`, 'bot');
    conversationContext.conversationStage = 'recommending';
    
    // This is a simplified version - in reality you'd filter by location
    // For now we'll just return some random restaurants
    setTimeout(() => {
        const results = [...mockRestaurants]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        
        conversationContext.lastRecommendedRestaurants = results;
        
        let response = `Here are some great spots in the ${location} area:\n\n`;
        results.forEach(r => {
            response += `• ${r.name} (${r.cuisine}) - ⭐${r.rating}\n`;
        });
        addMessage(response, 'bot');
        
        // Add a follow-up question
        setTimeout(() => {
            addMessage("Would you like more specific cuisine recommendations for this area?", 'bot');
            conversationContext.conversationStage = 'follow_up';
        }, 1000);
    }, 800);
};

export const initializeChatbot = () => {
    const toggleBtn = document.getElementById('chatbotToggleBtn');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeBtn = document.getElementById('chatbotCloseBtn');
    const form = document.getElementById('chatbotInputForm');
    const input = document.getElementById('chatbotInput');

    toggleBtn.addEventListener('click', () => {
        const isOpening = chatbotContainer.style.transform === 'scale(0)';
        chatbotContainer.style.transform = isOpening ? 'scale(1)' : 'scale(0)';
        toggleBtn.style.transform = isOpening ? 'scale(0.9)' : 'scale(1)';
        if (isOpening) {
            // Reset conversation context when opening
            conversationContext = {
                lastMentionedItem: null,
                lastRecommendedRestaurants: [],
                userPreferences: {
                    likedCuisines: [],
                    dislikedCuisines: []
                },
                conversationStage: 'greeting'
            };
            setTimeout(() => addMessage(getRandomItem(greetings), 'bot'), 400);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatbotContainer.style.transform = 'scale(0)';
        toggleBtn.style.transform = 'scale(1)';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = input.value.trim();
        if (!userInput) return;

        addMessage(userInput, 'user');
        input.value = '';

        setTimeout(() => getBotResponse(userInput), 500);
    });
    
    // Initial state
    if (chatbotContainer) {
        chatbotContainer.style.transformOrigin = 'bottom right';
        chatbotContainer.style.transform = 'scale(0)';
        chatbotContainer.style.transition = 'transform 0.3s ease-in-out';
    }
}; 