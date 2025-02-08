const questions = [
  {
    question: "These are sentences to ask for an opinion,EXCEPT….",
    options: [
      "What do you think about hiring a taxi?",
      "OK, but let me ask my mom first.",
      "Do you mind if i ride it?",
      "So, what's your idea?.",
    ],
    answer: 1,
  },
  {
    question: "Rafi and Mafaza get new chance, ...",
    options: ["Doesn't they?", "Aren't they?", "Do they?", "Don't they?"],
    answer: 3,
  },
  {
    question: "Jakarta is still our capital, ........?",
    options: ["Is it", "Does it", "Isn,t it", "Don,t it"],
    answer: 2,
  },
  {
    question: "She could write beautiful poems, ...........?",
    options: ["Could She", "Couldn't she", "Can She", "Can't she"],
    answer: 1,
  },
  {
    question: "The bicycle is not here anymore; it must have....",
    options: ["took away", "taken away", "been taking away", "been taken away"],
    answer: 3,
  },
  {
    question:
      "Buyer : I want the toy car displayed in the window yesterday. \n Shopkeeper: I'm sorry, it ......",
    options: ["has sold", "has been sold", "had been selling", "had sold"],
    answer: 1,
  },
  {
    question:
      "Our house will................by our neighbour when we are away.",
    options: ["Kept", "Be kept", "Keeping", "Be keeping"],
    answer: 1,
  },
  {
    question:
      "Fikry: The river is very dirty. People shouldn't have thrown household rubbish into the river. \n Ahmad: That's exactly what I think. \n From the dialogue above, we know that ...",
    options: [
      "People polluted the river with rubbish.",
      "Waste material has not been collected.",
      "Fikry warned people not to throw rubbish.",
      "Fikry thinks exactly the same way.",
    ],
    answer: 0,
  },
  {
    question:
      "Ria: It's break time. ................. a cup of tea? \n Deni: That would be very nice of you.",
    options: [
      "Could you help me to get",
      "Shall I have",
      "May I offer help to get",
      "Would you like me to get you",
    ],
    answer: 3,
  },
  {
    question:
      "The heat causes deeper water to boil much more violently.\nThe heat creates jets of steam and fountains of hot water.\n----------\nThe appropriate conjunction to combine the sentences is ....",
    options: ["but", "and", "so that", "either"],
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
    window.location.href = "../index.html";
  });
  optionsContainer.appendChild(backButton); // Menampilkan tombol "Back" di bawah hasil
}

// Load soal pertama
loadQuestion();
