const cards = document.querySelectorAll('.card');

cards.forEach((card,index) => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h2').innerText;
        alert(`You clicked on card ${index + 1}: ${title}`);
    });
});

const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const countSpan = btn.querySelector('.count');
        let count = parseInt(countSpan.innerText);
        countSpan.innerText = count + 1;

        btn.style.transform = "scale(1.2)";
        setTimeout(() => btn.style.transform = "scale(1)", 100);
    });
});
