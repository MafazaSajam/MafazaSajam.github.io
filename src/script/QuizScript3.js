const questions = [
  {
    question: "Which sentence uses the correct past perfect continuous tense?",
    options: [
      "He had been running for an hour before he stopped.",
      "He has been running for an hour before he stopped.",
      "He have been running for an hour before he stopped.",
      "He had run for an hour before he stopped.",
    ],
    answer: 0,
  },
  {
    question: "Identify the sentence written in the future perfect tense.",
    options: [
      "By next year, I will have completed my degree.",
      "By next year, I complete my degree.",
      "By next year, I will completing my degree.",
      "By next year, I will be complete my degree.",
    ],
    answer: 0,
  },
  {
    question:
      "Choose the correct form to complete the sentence: 'By the time we arrived, the movie ______.'",
    options: ["had started", "was starting", "starts", "will start"],
    answer: 0,
  },
  {
    question: "Which sentence uses the correct conditional type 2?",
    options: [
      "If I had more time, I would travel the world.",
      "If I have more time, I would travel the world.",
      "If I have more time, I will travel the world.",
      "If I had more time, I will travel the world.",
    ],
    answer: 0,
  },
  {
    question: "Select the sentence with correct subject-verb agreement.",
    options: [
      "Neither of the boys are going to the party.",
      "Neither of the boys is going to the party.",
      "Neither of the boys were going to the party.",
      "Neither of the boys be going to the party.",
    ],
    answer: 1,
  },
  {
    question: "What is the correct past participle of 'lie' (to recline)?",
    options: ["lay", "lain", "lied", "lays"],
    answer: 1,
  },
  {
    question: "Which sentence uses passive voice correctly?",
    options: [
      "The cake was baked by my grandmother.",
      "The cake baked by my grandmother.",
      "The cake is baking by my grandmother.",
      "The cake was bake by my grandmother.",
    ],
    answer: 0,
  },
  {
    question: "Choose the correct sentence using conditional type 1.",
    options: [
      "If you study hard, you will pass the exam.",
      "If you studied hard, you will pass the exam.",
      "If you had studied hard, you will pass the exam.",
      "If you study hard, you would pass the exam.",
    ],
    answer: 0,
  },
  {
    question: "Which of the following contains an example of an infinitive?",
    options: [
      "She likes to swim in the ocean.",
      "Swimming in the ocean is fun.",
      "She swam in the ocean yesterday.",
      "She has swum in the ocean before.",
    ],
    answer: 0,
  },
  {
    question: "Identify the sentence with correct parallel structure.",
    options: [
      "He likes reading, writing, and to paint.",
      "He likes to read, writing, and painting.",
      "He likes reading, writing, and painting.",
      "He likes to read, to writing, and to painting.",
    ],
    answer: 2,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const questionContainer = document.getElementById("question-container");
const countdownElement = document.getElementById("countdown");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionContainer.classList.remove("fade-out");
  questionContainer.classList.add("fade-in");

  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  feedbackElement.textContent = "";
  nextButton.style.display = "none";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(button);
  });

  startCountdown();
}

function startCountdown() {
  let timeLeft = 30;
  countdownElement.textContent = timeLeft;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackElement.textContent =
        "Time's up! The correct answer is \"" +
        questions[currentQuestionIndex].options[
          questions[currentQuestionIndex].answer
        ] +
        '".';
      nextButton.style.display = "inline-block";
    }
  }, 1000);
}

function selectOption(selectedIndex) {
  clearInterval(timer);

  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".option");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === currentQuestion.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === currentQuestion.answer) {
    score += 10;
    feedbackElement.textContent = "Correct! Well done.";
  } else {
    feedbackElement.textContent = `Wrong! The correct answer is "${
      currentQuestion.options[currentQuestion.answer]
    }".`;
  }

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  questionContainer.classList.remove("fade-in");
  questionContainer.classList.add("fade-out");

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 500);
});

function showResults() {
  questionElement.textContent = "Quiz Complete!";
  optionsContainer.innerHTML = "";
  feedbackElement.textContent = `Your score: ${score}/100`;
  countdownElement.style.display = "none";
  nextButton.style.display = "none";

  const message =
    score >= 80
      ? "Excellent! Keep up the great work! 🌟"
      : score >= 50
      ? "Good job! Keep practicing and you'll get even better! 👍"
      : "Don't worry! Keep learning and never give up! 💪";
  feedbackElement.textContent += `\n${message}`;

  const backButton = document.createElement("button");
  backButton.textContent = "Back to Homepage";
  backButton.classList.add("back-button");
  backButton.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
  optionsContainer.appendChild(backButton); // Menampilkan tombol "Back" di bawah hasil
}

// Load soal pertama
loadQuestion();
