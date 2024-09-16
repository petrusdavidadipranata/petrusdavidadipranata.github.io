// Function to create a love heart using Font Awesome
function createLove() {
    const love = document.createElement('i');
    love.classList.add('fas', 'fa-heart', 'love');

    // Random size for hearts
    const size = Math.random() * 30 + 10 + 'px';
    love.style.fontSize = size;

    // Random horizontal position
    love.style.left = Math.random() * window.innerWidth + 'px';

    // Set heart's animation duration and speed
    const fallDuration = Math.random() * 5 + 3 + 's';
    const fallDelay = Math.random() * 2 + 's';
    love.style.animation = `fall ${fallDuration} linear ${fallDelay} infinite`;

    document.querySelector('.love-container').appendChild(love);

    // Remove heart after it falls
    setTimeout(() => {
        love.remove();
    }, parseFloat(fallDuration) * 1000);
}

// Create multiple hearts
setInterval(createLove, 150);

// Heart fall animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fall {
    0% {
        transform: translateY(-50px);
        opacity: 1;
    }
    100% {
        transform: translateY(${window.innerHeight}px);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
