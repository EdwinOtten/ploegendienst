// utils.js

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
    
    for (let i = 0; i <= 366; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        cards.push({
            day: getDayInDutch(currentDate),
            date: formatDate(currentDate)
        });
    }
    
    return cards;
}

// Export the utility functions
export { getDayInDutch, formatDate, generateDateCards };