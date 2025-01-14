document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const daysInDutch = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

    function generateDateCards() {
        const today = new Date();
        for (let i = 0; i <= 366; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayOfWeek = daysInDutch[date.getDay()];
            const formattedDate = date.toISOString().split('T')[0];

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<h3>${dayOfWeek}</h3><p>${formattedDate}</p>`;
            cardContainer.appendChild(card);
        }
    }

    generateDateCards();
});