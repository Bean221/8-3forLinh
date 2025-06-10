// Khởi tạo các phần tử
const letter = document.getElementById('letter');
const messageButton = document.getElementById('message-button');
const quizButton = document.getElementById('quiz-button');
const quizSection = document.getElementById('quiz-section');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.querySelectorAll('.quiz-option');
const messageModal = document.getElementById('message-modal');
const quizResultModal = document.getElementById('quiz-result-modal');
const messageText = document.getElementById('message-text');
const quizResult = document.getElementById('quiz-result');
const closeMessageModal = document.getElementById('close-message-modal');
const closeQuizModal = document.getElementById('close-quiz-modal');
const clickSound = document.getElementById('click-sound');
const backgroundMusic = document.getElementById('background-music');
const quizFeedback = document.getElementById('quiz-feedback');
const musicOff = document.getElementById('music-off');
const musicOn = document.getElementById('music-on');

// Dữ liệu câu hỏi
const questions = [
    {
        question: "Anh tỏ tình e khi nào nè ^^",
        options: { A: "14-7", B: "15-7", C: "28-7", D: "29-7" },
        correct: "B"
    },
    {
        question: "Anh thích món quà nào nhất ",
        options: { A: "Áo", B: "Vòng tay", C: "Giày", D: "Em" },
        correct: "D"
    },
    {
        question: "Nơi mà chúng ta hay đi chơi nhất là đâu?",
        options: { A: "Công viên", B: "Bãi biển", C: "Rạp chiếu phim", D: "Quán cà phê" },
        correct: "D"
    },
    {
        question: "Màu sắc yêu thích của anh là gì?",
        options: { A: "Em", B: "Đỏ", C: "Vàng", D: "Tím" },
        correct: "A"
    },
    {
        question: "Món quà đầu tiên a tặng em là gì ",
        options: { A: "Áo Quần", B: "Vòng Tay", C: "Hoa", D: "là Anhhhh" },
        correct: "D"
    }
];

// Lời nhắn ngẫu nhiên
const randomMessages = [
    "Em yêu, 8-3 anh yêu em rất rất nhiều, thật hạnh phúc bé nha, bé mauu mauu khỏe bệnh, luôn mạnh khỏe xinh đẹp nhaaa ❤️",
    "Anh luôn nghĩ đến em mọi lúc Zàng iu, a sẽ cố gắng thật nhiều, vì hạnh phúc vì tình yêu của a hihii 💕",
    "Phải thật hạnh phúc, cố gắng học tập và rèn luyện bản thân nhiều hơn nha,  😘",
    "Với anh, mình thật may mắn khi có e bên cạnh ^^ , vì thế a ko để tụi mình xảy ra chuyện gì đâuu, luôn dịu dàng vs a nhaa vk hic hic a iuu emm🌟",
    "Hãy biến giấc mơ của e thành sự thật i nhan, và có cả anh nữa nha hii 💤"
];

// Trạng thái
let currentQuestionIndex = 0;
let score = 0;
let isMusicPlaying = false;

// Mở lá thư và phát nhạc
letter.addEventListener('click', () => {
    if (!letter.classList.contains('open')) {
        letter.classList.add('open');
        letter.classList.remove('small');
        if (!isMusicPlaying) {
            backgroundMusic.play().catch(() => {});
            isMusicPlaying = true;
        }
    }
});

// Slideshow
const slides = document.querySelector('.slides');
const images = slides.querySelectorAll('img');
let currentIndex = 0;

function updateSlides() {
    const slideWidth = slides.clientWidth / images.length;
    slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    images.forEach((img, idx) => {
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        img.style.opacity = idx === currentIndex ? 1 : 0.9;
    });
}

let lastTime = 0;
const slideInterval = 3000;

function animateSlides(timestamp) {
    if (timestamp - lastTime >= slideInterval) {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlides();
        lastTime = timestamp;
    }
    requestAnimationFrame(animateSlides);
}

requestAnimationFrame(animateSlides);

// Hiển thị lời nhắn với hiệu ứng đánh máy
function typeMessage(message) {
    let index = 0;
    messageText.textContent = '';
    function type() {
        if (index < message.length) {
            messageText.textContent += message.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    type();
}

messageButton.addEventListener('click', () => {
    clickSound.play();
    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    messageModal.style.display = 'flex';
    typeMessage(randomMessage);
});

closeMessageModal.addEventListener('click', () => {
    messageModal.style.display = 'none';
    messageText.textContent = '';
});

// Bài kiểm tra
quizButton.addEventListener('click', () => {
    clickSound.play();
    quizSection.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
});

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    quizQuestion.textContent = currentQuestion.question;
    quizOptions.forEach(option => {
        const optionValue = option.getAttribute('data-option');
        option.textContent = `${optionValue}: ${currentQuestion.options[optionValue]}`;
    });
    quizFeedback.textContent = '';
    quizFeedback.classList.remove('show');
}

quizOptions.forEach(option => {
    option.addEventListener('click', () => {
        clickSound.play();
        const selectedOption = option.getAttribute('data-option');
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correct) {
            score++;
            quizFeedback.textContent = 'Đúng! ❤️';
            quizFeedback.style.color = '#ff69b4';
        } else {
            quizFeedback.textContent = 'Sai! 😢';
            quizFeedback.style.color = '#ff1493';
        }
        quizFeedback.classList.add('show');
        setTimeout(() => {
            quizFeedback.classList.remove('show');
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
            } else {
                showQuizResult();
            }
        }, 1500);
    });
});

function showQuizResult() {
    quizSection.style.display = 'none';
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) {
        quizResult.textContent = `Zàng giỏi quá ! Bà Xã đúng 100%! 🎉`;
        createFireworkBurst(10);
    } else {
        quizResult.textContent = `Bà Xã đạt ${percentage}%! Quá Giỏi ❤️`;
    }
    quizResultModal.style.display = 'flex';
}

closeQuizModal.addEventListener('click', () => {
    quizResultModal.style.display = 'none';
});

// Hiệu ứng pháo hoa đặc biệt khi 100%
function createFireworkBurst(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(createFirework, i * 200);
    }
}

// Hiệu ứng nền
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = Math.random() * 100 + 'vw';
    bubble.style.animationDuration = Math.random() * 4 + 4 + 's';
    document.querySelector('.bubble-container').appendChild(bubble);
    setTimeout(() => bubble.remove(), 8000);
}

setInterval(createBubble, 400);

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 8 + 5 + 's';
    snowflake.style.fontSize = Math.random() * 10 + 8 + 'px';
    document.querySelector('.snowflake-container').appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 13000);
}

setInterval(createSnowflake, 250);

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    document.querySelector('.sparkle-container').appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
}

setInterval(createSparkle, 150);

function createFirework() {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 80 + 'vh';
    firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.querySelector('.firework-container').appendChild(firework);
    setTimeout(() => firework.remove(), 1200);
}

setInterval(createFirework, 600);

// Điều khiển nhạc
musicOff.addEventListener('click', () => {
    backgroundMusic.pause();
    isMusicPlaying = false;
});

musicOn.addEventListener('click', () => {
    if (!isMusicPlaying) {
        backgroundMusic.play().catch(() => {});
        isMusicPlaying = true;
    }
});

window.addEventListener('load', () => {
    updateSlides();
    letter.classList.add('small');
});