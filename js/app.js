/** Utils start */

/**
 * Get the day of the week in Dutch for a given date.
 * @param {Date} date - The date to get the day for.
 * @returns {string} - The day of the week in Dutch.
 */
function getDayInDutch(date) {
    const daysInDutch = [
        "zo.", "ma.", "di.", "wo.", 
        "do.", "vr.", "za."
    ];
    return daysInDutch[date.getDay()];
}

const dateFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
}

/**
 * Format a date to a string in Dutch format.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
function formatDate(date) {
    return date.toLocaleDateString('nl-NL', dateFormatOptions);
}

/**
 * Get the title and description based on the recurring pattern.
 * @param {number} daysSinceStart - The number of days since March 4th, 2022.
 * @returns {Object} - An object containing the title and description.
 */
function getTitleAndDescription(daysSinceStart) {
    const pattern = [
        { title: "dag", description: "08:00 - 16:00" },
        { title: "dag", description: "08:00 - 16:00" },
        { title: "avond", description: "16:00 - 00:00" },
        { title: "avond", description: "16:00 - 00:00" },
        { title: "uitslapen", description: "" },
        { title: "nacht", description: "00:00 - 08:00" },
        { title: "nacht", description: "00:00 - 08:00" },
        { title: "weekend", description: "" },
        { title: "weekend", description: "" },
        { title: "weekend", description: "" }
    ];
    return pattern[daysSinceStart % pattern.length];
}

/**
 * Generate an array of objects containing the day of the week in Dutch, the date, title, and description.
 * @returns {Array} - An array of objects with day, date, title, and description properties.
 */
function generateDateCards() {
    const cards = [];
    const today = new Date();
    const startDate = new Date('2022-03-04');
    const msInDay = 24 * 60 * 60 * 1000;
    
    // Calculate the number of days to show before today to start on a Monday
    const daysSinceMonday = (today.getDay() + 6) % 7;
    const showDaysAgo = daysSinceMonday + 7;
    
    for (let i = -showDaysAgo; i <= 366; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        const daysSinceStart = Math.floor((currentDate - startDate) / msInDay);
        const { title, description } = getTitleAndDescription(daysSinceStart);
        
        cards.push({
            day: getDayInDutch(currentDate),
            formattedDate: formatDate(currentDate),
            date: currentDate,
            title,
            description,
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
    
    const dateElement = document.createElement('h5');
    dateElement.textContent = cardData.formattedDate;
    
    const titleElement = document.createElement('h3');
    titleElement.textContent = cardData.title;
    
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = cardData.description;
    
    card.appendChild(dateElement);
    card.appendChild(titleElement);
    card.appendChild(descriptionElement);
    
    if (cardData.isToday) {
        card.id = 'today';
    }
    
    return card;
}

function scrollToCard(date) {
    Array.from(document.querySelectorAll('.highlight')).forEach(card => card.classList.remove('highlight'));

    const card = document.querySelector(`.card[data-date="${date.toDateString()}"]`);
    if (card) {
        card.classList.add('highlight');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function initializeApp() {
    const container = document.getElementById('card-container');
    const datepicker = document.getElementById('datepicker');
    const cards = generateDateCards();
    
    cards.forEach(cardData => {
        const card = createDateCard(cardData);
        card.setAttribute('data-date', cardData.date.toDateString());
        container.appendChild(card);
    });
    
    // Scroll to today's card
    const todayCard = document.getElementById('today');
    if (todayCard) {
        setTimeout(() => {
            todayCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    // Add event listener to datepicker
    datepicker.addEventListener('change', (event) => {
        const selectedDate = new Date(event.target.value);
        scrollToCard(selectedDate);
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);