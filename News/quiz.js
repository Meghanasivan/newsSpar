let currentQuestion;
let score = 0;
let quizType, age, totalQuestions = 5, answeredQuestions = 0;
let timer;
let timeLeft = 10;
let questions = [];
let userAnswers = new Array(totalQuestions).fill(null);
let correctAnswers = [];

let categoryMap = {
    "general": 9,   
    "politics": 24, 
    "sports": 21,   
    "science": 17   
};

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    age = urlParams.get('age');
    quizType = urlParams.get('quizType');

    fetchQuizQuestions();
};

async function fetchQuizQuestions() {
    let category = categoryMap[quizType] || 9;

    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&type=multiple`);
        const data = await response.json();
        questions = data.results;
        loadQuestion();
    } catch (error) {
        document.getElementById("question").innerText = "Error fetching questions.";
    }
}

function loadQuestion() {
    if (answeredQuestions >= totalQuestions) {
        endQuiz();
        return;
    }

    currentQuestion = questions[answeredQuestions];
    correctAnswers[answeredQuestions] = currentQuestion.correct_answer;
    
    document.getElementById("question").innerText = currentQuestion.question;

    let options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    shuffleArray(options); // Fisher-Yates shuffle for better randomness

    let optionsHTML = "";
    options.forEach(option => {
        const isChecked = userAnswers[answeredQuestions] === option ? "checked" : "";
        optionsHTML += `<label class="option">
            <input type="radio" name="option" value="${option}" ${isChecked} onclick="selectAnswer('${option}')"> ${option}
        </label><br>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;

    document.getElementById("prev-btn").disabled = answeredQuestions === 0;
    document.getElementById("submit-btn").style.display = answeredQuestions === totalQuestions - 1 ? "inline-block" : "none";

    resetTimer();
    startTimer();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function selectAnswer(selected) {
    userAnswers[answeredQuestions] = selected;
}

function nextQuestion() {
    if (answeredQuestions < totalQuestions - 1) {
        answeredQuestions++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (answeredQuestions > 0) {
        answeredQuestions--;
        loadQuestion();
    }
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById("timer").innerText = "Time left: 10s";
}

function endQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("scorecard").style.display = "block";

    score = 0; // Reset score before calculating
    let reviewHTML = "";

    for (let i = 0; i < totalQuestions; i++) {
        let isCorrect = userAnswers[i] === correctAnswers[i];
        if (isCorrect) score++;

        reviewHTML += `<li>
            <strong>Q:</strong> ${questions[i].question} <br>
            <strong>Your Answer:</strong> <span class="${isCorrect ? 'correct' : 'wrong'}">${userAnswers[i] || "No answer"}</span> <br>
            <strong>Correct Answer:</strong> <span class="correct">${correctAnswers[i]}</span>
        </li><br>`;
    }

    document.getElementById("final-score").innerText = `Your Final Score: ${score}/${totalQuestions}`;
    document.getElementById("review-answers").innerHTML = reviewHTML;
}

function restartQuiz() {
    answeredQuestions = 0;
    score = 0;
    userAnswers.fill(null);
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("scorecard").style.display = "none";
    fetchQuizQuestions();
}

function startNewQuiz() {
    window.location.href = "quiz_selection.html";
}

function returnToHome() {
    window.location.href = "index.html";
}

