// scripts/dropdown.js
import { mockRestaurants } from './restaurants.js';

let updateTimeout;

const debouncedUpdateResultsCount = () => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
        const selected = getSelectedCuisines();
        const counter = document.getElementById('totalRestaurants');
        if (selected.length === 0) {
            counter.textContent = `${mockRestaurants.length}`;
        } else {
            let count = 0;
            for (let i = 0; i < mockRestaurants.length; i++) {
                if (selected.includes(mockRestaurants[i].cuisine)) {
                    count++;
                }
            }
            counter.textContent = `${count} of ${mockRestaurants.length}`;
        }
    }, 150);
};

const getSelectedCuisines = () => Array.from(document.querySelectorAll('.dropdown-option input[type="checkbox"]:checked'))
    .map(cb => cb.value).filter(v => v !== '');

const updateDropdownText = () => {
    const selected = getSelectedCuisines();
    const text = document.querySelector('.selected-text');
    text.textContent = selected.length === 0 ? 'All Cuisines' :
        selected.length === 1 ? selected[0].charAt(0).toUpperCase() + selected[0].slice(1) :
        `${selected.length} Cuisines Selected`;
};

export const initializeDropdown = () => {
    const dropdown = document.querySelector('.custom-dropdown');
    const selected = document.getElementById('dropdownSelected');
    const options = document.getElementById('dropdownOptions');
    const checkboxes = document.querySelectorAll('.dropdown-option input[type="checkbox"]');
    const allCuisinesCheckbox = document.querySelector('.dropdown-option input[value=""]');

    selected.addEventListener('click', (event) => {
        event.stopPropagation();
        options.classList.toggle('open');
        selected.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            options.classList.remove('open');
            selected.classList.remove('open');
        }
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox === allCuisinesCheckbox && checkbox.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== allCuisinesCheckbox) cb.checked = false;
                });
            } else if (checkbox !== allCuisinesCheckbox && checkbox.checked) {
                allCuisinesCheckbox.checked = false;
            }
            
            const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
            if (!anyChecked) {
                allCuisinesCheckbox.checked = true;
            }

            updateDropdownText();
            debouncedUpdateResultsCount();
        });
    });

    options.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}; 