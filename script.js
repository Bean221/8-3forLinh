// Slideshow
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
let currentIndex = 0;
const slideshowImage = document.getElementById('slideshow-image');

function updateImage() {
    slideshowImage.classList.remove('active');
    setTimeout(() => {
        slideshowImage.src = images[currentIndex];
        slideshowImage.classList.add('active');
    }, 500);
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}, 5000);

// Modal lời nhắn
const messages = [
    "Em là ngôi sao sáng nhất trong bầu trời đêm của anh, dẫn lối cho anh qua mọi ngày dài.",
    "Với anh, mỗi giây phút bên em là một bản tình ca không bao giờ dứt, ngọt ngào và sâu lắng.",
    "Anh không hứa sẽ cho em cả thế giới, nhưng anh hứa sẽ dành cả thế giới của anh để yêu thương và che chở cho em.",
    "Trái tim anh đã thuộc về em từ cái nhìn đầu tiên, và nó sẽ mãi đập vì em, dù thời gian có trôi qua bao lâu."
];

const modal = document.getElementById('modal');
const messageText = document.getElementById('message-text');
const loveButton = document.getElementById('love-button');
const closeModal = document.getElementById('close-modal');

function typeMessage(text) {
    messageText.textContent = ''; // Xóa nội dung cũ
    let i = 0;
    const speed = 50; // Tốc độ gõ chữ (ms)
    function type() {
        if (i < text.length) {
            messageText.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

loveButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const selectedMessage = messages[randomIndex];
    modal.style.display = 'flex';
    typeMessage(selectedMessage); // Gõ chữ từng ký tự
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Hoa rơi
function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.innerHTML = '🌸';
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDuration = Math.random() * 4 + 3 + 's';
    document.querySelector('.flower-container').appendChild(flower);
    setTimeout(() => flower.remove(), 7000);
}

setInterval(createFlower, 500);

// Ánh sáng lấp lánh
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    document.querySelector('.sparkle-container').appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
}

setInterval(createSparkle, 300);

// Pháo hoa
function createFirework() {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 80 + 'vh';
    firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.querySelector('.firework-container').appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
}

setInterval(createFirework, 1500);

// Khởi tạo ảnh đầu tiên
slideshowImage.classList.add('active');

// Điều khiển nhạc
const audio = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

audio.volume = 0.5;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicToggle.textContent = '🎵 Bật Nhạc';
    } else {
        audio.play();
        musicToggle.textContent = '🎵 Tắt Nhạc';
    }
    isPlaying = !isPlaying;
});

window.addEventListener('load', () => {
    audio.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = '🎵 Tắt Nhạc';
    }).catch(() => {
        musicToggle.textContent = '🎵 Bật Nhạc';
    });
});