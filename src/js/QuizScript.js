const questions = [
  {
    question:
      "The Purpose of narrative text is ....... the reader with a story",
    options: ["to amuse", "to inform", "to disrupt", "to advise"],
    answer: 0,
  },
  {
    question: "Fairy tales is story which relates much with ....things.",
    options: ["place", "belief", "magic", "nature"],
    answer: 2,
  },
  {
    question:
      "Complete the dialog below by selecting the correct answer! \n \nFerdi: Next week, we're on holiday. So, Rosa, what are you going to do on your holiday? \n Rosa:..",
    options: [
      "I don't know where I'm going.",
      "This is not your business.",
      "I have nothing to do.",
      "I'm thinking of going to Bali.",
    ],
    answer: 3,
  },
  {
    question:
      "Select the most appropriate answer to complete the sentence! \n .....it's so important to teach children from an early age to be independent and responsible!",
    options: [
      "He totally understands",
      "Do you think that",
      "In my opinion",
      "You can't believe",
    ],
    answer: 2,
  },
  {
    question: "My Brother lives .....Bandung",
    options: ["At", "In", "On", "Within"],
    answer: 1,
  },
  {
    question: "The party will be held .......Sunday, June 18, at 08.00 pm.",
    options: ["At", "To", "On", "In"],
    answer: 2,
  },
  {
    question:
      "Nadia told ....that you would like to have more pen pals from Japan.",
    options: ["Me", "I", "My", "Mine"],
    answer: 0,
  },
  {
    question:
      "Manaan has several pen pals from India. He writes to ..... via email every week.",
    options: ["Them", "They", "Their", "Theirs"],
    answer: 0,
  },
  {
    question:
      "My friends and I often spend long vacations in our hometowns. .... through email and Whatsapp.",
    options: [
      "I keep in touch",
      "They keep in touch",
      "She keep in touch",
      "We keep in touch",
    ],
    answer: 3,
  },
  {
    question:
      "Yafa often tells Yafi about her rehearsal. .....joins a choir club in her school.?",
    options: ["She", "He", "His", "Her"],
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

// Load soal
loadQuestion();
