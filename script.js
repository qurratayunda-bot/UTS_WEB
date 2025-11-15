// data pertanyaan game
const questions = [
    {
        question: "Apa fungsi utama paru-paru?",
        options: [
            "Untuk mencerna makanan",
            "Untuk bernapas",
            "Untuk memompa darah",
            "Untuk melihat"
        ],
        correct: 1,
        explanation: "Betul! 🎉 Paru-paru berfungsi untuk bernapas. Mereka mengambil oksigen dari udara dan mengeluarkan karbon dioksida."
    },
    {
        question: "Apa yang harus kita lakukan untuk menjaga paru-paru sehat?",
        options: [
            "Merokok",
            "Makan banyak permen",
            "Olahraga teratur",
            "Tidur sepanjang hari"
        ],
        correct: 2,
        explanation: "Benar! 💪 Olahraga teratur membantu paru-paru kita tetap kuat dan sehat."
    },
    {
        question: "Apa gejala bronkopneumonia?",
        options: [
            "Sering tertawa",
            "Batuk terus-menerus dan demam",
            "Rambut rontok",
            "Kuku panjang"
        ],
        correct: 1,
        explanation: "Tepat! 🤒 Batuk terus-menerus dan demam adalah gejala bronkopneumonia. Jika mengalami ini, segera beri tahu orang tua!"
    },
    {
        question: "Makanan apa yang baik untuk paru-paru?",
        options: [
            "Permen dan cokelat saja",
            "Buah dan sayuran",
            "Keripik dan minuman soda",
            "Makanan cepat saji"
        ],
        correct: 1,
        explanation: "Hebat! 🥦 Buah dan sayuran mengandung vitamin yang baik untuk kesehatan paru-paru."
    },
    {
        question: "Apa yang harus kita hindari untuk menjaga paru-paru sehat?",
        options: [
            "Asap rokok",
            "Air putih",
            "Olahraga",
            "Makan sayur"
        ],
        correct: 0,
        explanation: "Benar! 🚭 Asap rokok sangat berbahaya untuk paru-paru kita. Jauhi asap rokok ya!"
    },
    {
        question: "Apa yang terjadi jika paru-paru kita sakit?",
        options: [
            "Kita bisa bernapas lebih baik",
            "Kita sulit bernapas dan badan lemas",
            "Kita menjadi lebih kuat",
            "Kita bisa berlari lebih cepat"
        ],
        correct: 1,
        explanation: "Tepat! 😫 Ketika paru-paru sakit, kita akan sulit bernapas dan badan terasa lemas. Itu sebabnya kita harus menjaganya!"
    },
    {
        question: "Apa yang harus kita lakukan jika merasa gejala bronkopneumonia?",
        options: [
            "Diam saja",
            "Bermain terus",
            "Beri tahu orang tua atau guru",
            "Minum es banyak-banyak"
        ],
        correct: 2,
        explanation: "Pintar! 👨‍⚕️ Jika merasa gejala bronkopneumonia, segera beri tahu orang tua atau guru agar bisa dibawa ke dokter."
    }
];

// variabel game
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// mendapatkan elemen screen utama game
const gameStartScreen = document.getElementById('game-start');
const gameQuizScreen = document.getElementById('game-quiz');
const gameResultScreen = document.getElementById('game-result');

// mendapatkan tombol-tombol aksi
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

// mendapatkan elemen untuk menampilkan pertanyaan
const questionText = document.getElementById('question-text');

// container untuk pilihan jawaban
const optionsContainer = document.querySelector('.options-container');

// elemen untuk menampilkan progress pertanyaan
const currentQuestionElement = document.getElementById('current-question');

// elemen untuk menampilkan hasil akhir
const finalScoreElement = document.getElementById('final-score');
const scoreMessageElement = document.getElementById('score-message');

// container untuk review jawaban
const answersReviewElement = document.querySelector('.answers-review');

// elemen gambar karakter quro
const quroImage = document.getElementById('quroImage');

// elemen untuk animasi hasil
const resultAnimation = document.getElementById('resultAnimation');

// event listener untuk tombol mulai
startBtn.addEventListener('click', startGame);

// event listener untuk tombol lanjut
nextBtn.addEventListener('click', nextQuestion);

// event listener untuk tombol ulangi
restartBtn.addEventListener('click', restartGame);

// fungsi untuk memainkan animasi
function playAnimation(type) {
    // hapus semua kelas animasi sebelumnya
    quroImage.classList.remove('wave', 'jump', 'dance');
    
    // trigger reflow
    void quroImage.offsetWidth;
    
    // tambahkan kelas animasi baru
    quroImage.classList.add(type);
    
    // hapus kelas animasi setelah selesai
    setTimeout(() => {
        quroImage.classList.remove(type);
    }, 2000);
}

// memulai game
function startGame() {
    gameStartScreen.classList.remove('active');
    gameQuizScreen.classList.add('active');
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    loadQuestion();
}

// memuat pertanyaan
function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionElement.textContent = currentQuestion + 1;
    
    // kosongkan container opsi
    optionsContainer.innerHTML = '';
    
    // buat opsi jawaban
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // reset tombol lanjut
    nextBtn.disabled = true;
}

//  memilih opsi
function selectOption(selectedIndex) {
    // hapus kelas selected dari semua opsi
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // tambahkan kelas selected ke opsi yang dipilih
    options[selectedIndex].classList.add('selected');
    
    // simpan jawaban user
    userAnswers[currentQuestion] = selectedIndex;
    
    // aktifkan tombol lanjut
    nextBtn.disabled = false;
}

// pindah ke pertanyaan berikutnya
function nextQuestion() {
    // cek jawaban
    const correctAnswer = questions[currentQuestion].correct;
    if (userAnswers[currentQuestion] === correctAnswer) {
        score++;
    }
    
    // pindah ke pertanyaan berikutnya atau tampilkan hasil
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// menampilkan hasil
function showResult() {
    gameQuizScreen.classList.remove('active');
    gameResultScreen.classList.add('active');
    
    // tampilkan skor
    finalScoreElement.textContent = score;
    
    // update animasi hasil berdasarkan skor
    updateResultAnimation();
    
    // tampilkan pesan berdasarkan skor
    let message = '';
    let messageClass = '';
    
    // percabangan kondisional
    if (score === questions.length) {
        message = 'Luar biasa! 🎊 Kamu benar semua! Kamu sudah menjadi ahli paru sehat!';
        messageClass = 'excellent';
    } else if (score >= questions.length * 0.7) {
        message = 'Hebat! 👍 Pengetahuanmu tentang paru-paru sudah baik sekali!';
        messageClass = 'good';
    } else if (score >= questions.length * 0.5) {
        message = 'Bagus! 😊 Kamu sudah memahami beberapa hal tentang paru-paru. Yuk, belajar lagi!';
        messageClass = 'average';
    } else {
        message = 'Jangan menyerah! 💪 Yuk, pelajari lagi tentang paru-paru dan coba lagi!';
        messageClass = 'poor';
    }
    
    scoreMessageElement.textContent = message;
    scoreMessageElement.className = `score-message ${messageClass}`;
    
    // tampilkan review jawaban
    showAnswersReview();
}

// update animasi hasil
function updateResultAnimation() {
    if (score >= questions.length * 0.7) {
        resultAnimation.src = "https://i.imgur.com/K9fL3j2.gif"; // Animasi senang
    } else if (score >= questions.length * 0.5) {
        resultAnimation.src = "https://i.imgur.com/M8Zk7L2.gif"; // Animasi biasa
    } else {
        resultAnimation.src = "https://i.imgur.com/pL6Q2h3.gif"; // Animasi sedih
    }
}

// menampilkan review jawaban
function showAnswersReview() {
    answersReviewElement.innerHTML = '';
    
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        const questionElement = document.createElement('div');
        questionElement.classList.add('review-question');
        questionElement.textContent = `Pertanyaan ${index + 1}: ${question.question}`;
        
        const answerElement = document.createElement('div');
        answerElement.classList.add('review-answer');
        
        if (isCorrect) {
            answerElement.innerHTML = `Jawaban kamu: <strong>${question.options[userAnswer]}</strong> ✅`;
        } else {
            answerElement.innerHTML = `Jawaban kamu: <strong>${question.options[userAnswer]}</strong> ❌<br>
                                      Jawaban benar: <strong>${question.options[question.correct]}</strong> ✅`;
        }
        
        const explanationElement = document.createElement('div');
        explanationElement.classList.add('review-explanation');
        explanationElement.textContent = question.explanation;
        
        reviewItem.appendChild(questionElement);
        reviewItem.appendChild(answerElement);
        reviewItem.appendChild(explanationElement);
        
        answersReviewElement.appendChild(reviewItem);
    });
}

// mengulang game
function restartGame() {
    gameResultScreen.classList.remove('active');
    gameStartScreen.classList.add('active');
}

// smooth scroll untuk navigasi
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});