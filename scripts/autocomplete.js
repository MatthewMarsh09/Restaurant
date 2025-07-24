// scripts/autocomplete.js
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

export const initializeAddressAutocomplete = () => {
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