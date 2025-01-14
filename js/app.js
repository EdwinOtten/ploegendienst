/** Utils start */

/**
 * Get the day of the week in Dutch for a given date.
 * @param {Date} date - The date to get the day for.
 * @returns {string} - The day of the week in Dutch.
 */
function getDayInDutch(date) {
    const daysInDutch = [
        "zondag", "maandag", "dinsdag", "woensdag", 
        "donderdag", "vrijdag", "zaterdag"
    ];
    return daysInDutch[date.getDay()];
}

/**
 * Format a date to YYYY-MM-DD.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Generate an array of objects containing the day of the week in Dutch and the date.
 * @returns {Array} - An array of objects with day and date properties.
 */
function generateDateCards() {
    const cards = [];
    const today = new Date();
    
    // Add past 7 days
    for (let i = -7; i <= 366; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        cards.push({
            day: getDayInDutch(currentDate),
            date: formatDate(currentDate),
            isPast: i < 0,
            isToday: i === 0
        });
    }
    
    return cards;
}

/** Utils end */

function createDateCard(cardData) {
    const card = document.createElement('div');
    card.className = `card${cardData.isPast ? ' past' : ''}${cardData.isToday ? ' today' : ''}`;
    
    const dayElement = document.createElement('h3');
    dayElement.textContent = cardData.day;
    
    const dateElement = document.createElement('p');
    dateElement.textContent = cardData.date;
    
    card.appendChild(dayElement);
    card.appendChild(dateElement);
    
    if (cardData.isToday) {
        card.id = 'today';
    }
    
    return card;
}

function initializeApp() {
    const container = document.getElementById('card-container');
    const cards = generateDateCards();
    
    cards.forEach(cardData => {
        container.appendChild(createDateCard(cardData));
    });
    
    // Scroll to today's card
    const todayCard = document.getElementById('today');
    if (todayCard) {
        setTimeout(() => {
            todayCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);