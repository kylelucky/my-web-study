const cards = document.querySelectorAll('.card');

cards.forEach((card,index) => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h2').innerText;
        alert(`You clicked on card ${index + 1}: ${title}`);
    });
});
