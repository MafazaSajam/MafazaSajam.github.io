const questions = [
  {
    question:
      "Which sentence demonstrates correct use of a reduced relative clause?",
    options: [
      "The book, which is lying on the table, belongs to Sarah.",
      "The book lying on the table belongs to Sarah.",
      "The book which lying on the table belongs to Sarah.",
      "The book is lying on the table belongs to Sarah.",
    ],
    answer: 1,
  },
  {
    question: "Identify the sentence with proper parallel structure.",
    options: [
      "The professor explained the assignment, gave examples, and answering questions.",
      "The professor explained the assignment, gave examples, and answered questions.",
      "The professor explaining the assignment, giving examples, and answered questions.",
      "The professor explained the assignment, give examples, and answered questions.",
    ],
    answer: 1,
  },
  {
    question:
      "Which of the following sentences uses correct subject-verb agreement?",
    options: [
      "Each of the students were assigned a different topic.",
      "Each of the students was assigned a different topic.",
      "Each of the student was assigned a different topic.",
      "Each of the students is assigning a different topic.",
    ],
    answer: 1,
  },
  {
    question:
      "Choose the sentence with the correct use of an inverted conditional.",
    options: [
      "Had he known about the meeting, he would attend.",
      "Had he known about the meeting, he would have attended.",
      "Had he knew about the meeting, he would have attended.",
      "Had he know about the meeting, he would attend.",
    ],
    answer: 1,
  },
  {
    question: "Which sentence uses the correct form of a phrasal verb?",
    options: [
      "She broke up the project after receiving new instructions.",
      "She broke down the project into smaller parts for better understanding.",
      "She broke out the project for further investigation.",
      "She broke through the project after receiving updates.",
    ],
    answer: 1,
  },
  {
    question: "Which sentence correctly demonstrates the use of a noun clause?",
    options: [
      "I don’t know what time the meeting starts.",
      "I don’t know the time the meeting start.",
      "I don’t know what is the time the meeting starts.",
      "I don’t know when does the meeting starts.",
    ],
    answer: 0,
  },
  {
    question: "Which sentence uses a correct advanced modal structure?",
    options: [
      "She could have been waiting for the train when we arrived.",
      "She must have been waited for the train when we arrived.",
      "She should have waited for the train when we arrive.",
      "She could been waiting for the train when we arrive.",
    ],
    answer: 0,
  },
  {
    question:
      "Identify the grammatically correct sentence with an idiomatic expression.",
    options: [
      "He hit the nail in the head with his solution.",
      "He hit the nail on the head with his solution.",
      "He hit the nail to the head with his solution.",
      "He hit the nail under the head with his solution.",
    ],
    answer: 1,
  },
  {
    question:
      "Which of the following uses correct parallelism with correlative conjunctions?",
    options: [
      "Not only did she enjoy the concert, but she also singing along.",
      "Not only did she enjoy the concert, but she also sang along.",
      "Not only did she enjoy the concert, but also sang along.",
      "Not only she enjoyed the concert, but she also sang along.",
    ],
    answer: 1,
  },
  {
    question: "Which sentence demonstrates proper use of an appositive phrase?",
    options: [
      "My brother, who is an engineer, lives in New York.",
      "My brother, an engineer, lives in New York.",
      "My brother an engineer, lives in New York.",
      "My brother, who an engineer, lives in New York.",
    ],
    answer: 1,
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
    window.location.href = "../index.html"; // Ganti "index.html" dengan halaman utama Anda
  });
  optionsContainer.appendChild(backButton); // Menampilkan tombol "Back" di bawah hasil
}

// Load soal pertama
loadQuestion();
