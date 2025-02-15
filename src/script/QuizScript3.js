// Daftar pertanyaan kuis untuk level 3
const questions = [
  {
    question: "Which sentence uses the correct past perfect continuous tense?",
    options: [
      "He had been running for an hour before he stopped.",
      "He has been running for an hour before he stopped.",
      "He have been running for an hour before he stopped.",
      "He had run for an hour before he stopped."
    ],
    answer: 0
  },
  {
    question: "Identify the sentence written in the future perfect tense.",
    options: [
      "By next year, I will have completed my degree.",
      "By next year, I complete my degree.",
      "By next year, I will completing my degree.",
      "By next year, I will be complete my degree."
    ],
    answer: 0
  },
  {
    question:
      "Choose the correct form to complete the sentence: 'By the time we arrived, the movie ______.'",
    options: ["had started", "was starting", "starts", "will start"],
    answer: 0
  },
  {
    question: "Which sentence uses the correct conditional type 2?",
    options: [
      "If I had more time, I would travel the world.",
      "If I have more time, I would travel the world.",
      "If I have more time, I will travel the world.",
      "If I had more time, I will travel the world."
    ],
    answer: 0
  },
  {
    question: "Select the sentence with correct subject-verb agreement.",
    options: [
      "Neither of the boys are going to the party.",
      "Neither of the boys is going to the party.",
      "Neither of the boys were going to the party.",
      "Neither of the boys be going to the party."
    ],
    answer: 1
  },
  {
    question: "What is the correct past participle of 'lie' (to recline)?",
    options: ["lay", "lain", "lied", "lays"],
    answer: 1
  },
  {
    question: "Which sentence uses passive voice correctly?",
    options: [
      "The cake was baked by my grandmother.",
      "The cake baked by my grandmother.",
      "The cake is baking by my grandmother.",
      "The cake was bake by my grandmother."
    ],
    answer: 0
  },
  {
    question: "Choose the correct sentence using conditional type 1.",
    options: [
      "If you study hard, you will pass the exam.",
      "If you studied hard, you will pass the exam.",
      "If you had studied hard, you will pass the exam.",
      "If you study hard, you would pass the exam."
    ],
    answer: 0
  },
  {
    question: "Which of the following contains an example of an infinitive?",
    options: [
      "She likes to swim in the ocean.",
      "Swimming in the ocean is fun.",
      "She swam in the ocean yesterday.",
      "She has swum in the ocean before."
    ],
    answer: 0
  },
  {
    question: "Identify the sentence with correct parallel structure.",
    options: [
      "He likes reading, writing, and to paint.",
      "He likes to read, writing, and painting.",
      "He likes reading, writing, and painting.",
      "He likes to read, to writing, and to painting."
    ],
    answer: 2
  }
];

let currentQuestionIndex = 0; // Indeks pertanyaan saat ini
let score = 0; // Skor pengguna
let timer; // Timer untuk countdown

// Mengambil elemen-elemen dari DOM
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const questionContainer = document.getElementById("question-container");
const countdownElement = document.getElementById("countdown");

// Fungsi untuk memuat pertanyaan
function loadQuestion() {
  // Mendapatkan pertanyaan saat ini berdasarkan indeks
  const currentQuestion = questions[currentQuestionIndex];

  // Mengatur animasi transisi untuk kontainer pertanyaan
  questionContainer.classList.remove("fade-out");
  questionContainer.classList.add("fade-in");

  // Menampilkan teks pertanyaan
  questionElement.textContent = currentQuestion.question;
  // Mengosongkan kontainer opsi jawaban
  optionsContainer.innerHTML = "";
  // Mengosongkan elemen umpan balik
  feedbackElement.textContent = "";
  // Menyembunyikan tombol "Next"
  nextButton.style.display = "none";

  // Membuat tombol untuk setiap opsi jawaban
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    // Menambahkan event listener untuk menangani pemilihan opsi
    button.addEventListener("click", () => selectOption(index));
    // Menambahkan tombol ke dalam kontainer opsi
    optionsContainer.appendChild(button);
  });

  // Memulai countdown untuk pertanyaan
  startCountdown();
}

// Fungsi untuk memulai countdown
function startCountdown() {
  let timeLeft = 30; // Waktu yang tersisa untuk menjawab pertanyaan (30 detik)
  countdownElement.textContent = timeLeft; // Menampilkan waktu yang tersisa di elemen countdown

  clearInterval(timer); // Menghentikan timer sebelumnya jika ada
  timer = setInterval(() => {
    timeLeft--; // Mengurangi waktu yang tersisa setiap detik
    countdownElement.textContent = timeLeft; // Memperbarui tampilan waktu yang tersisa
    if (timeLeft <= 0) {
      // Jika waktu habis
      clearInterval(timer); // Menghentikan timer
      feedbackElement.textContent =
        "Time's up! The correct answer is \"" +
        questions[currentQuestionIndex].options[
          questions[currentQuestionIndex].answer
        ] +
        '".'; // Menampilkan pesan bahwa waktu habis dan jawaban yang benar
      nextButton.style.display = "inline-block"; // Menampilkan tombol "Next" untuk melanjutkan ke pertanyaan berikutnya
    }
  }, 1000); // Mengatur interval timer setiap 1 detik
}

// Fungsi untuk memilih opsi jawaban
function selectOption(selectedIndex) {
  clearInterval(timer); // Menghentikan timer saat ini

  const currentQuestion = questions[currentQuestionIndex]; // Mendapatkan pertanyaan saat ini
  const buttons = document.querySelectorAll(".option"); // Mengambil semua tombol opsi

  // Menonaktifkan semua tombol opsi dan menambahkan kelas CSS yang sesuai
  buttons.forEach((button, index) => {
    button.disabled = true; // Menonaktifkan tombol
    if (index === currentQuestion.answer) {
      button.classList.add("correct"); // Menambahkan kelas "correct" jika opsi benar
    } else if (index === selectedIndex) {
      button.classList.add("incorrect"); // Menambahkan kelas "incorrect" jika opsi salah
    }
  });

  // Menampilkan umpan balik berdasarkan jawaban yang dipilih
  if (selectedIndex === currentQuestion.answer) {
    score += 10; // Menambah skor jika jawaban benar
    feedbackElement.textContent = "Correct! Well done."; // Menampilkan pesan umpan balik untuk jawaban benar
  } else {
    feedbackElement.textContent = `Wrong! The correct answer is "${
      currentQuestion.options[currentQuestion.answer]
    }".`; // Menampilkan pesan umpan balik untuk jawaban salah
  }

  nextButton.style.display = "inline-block"; // Menampilkan tombol "Next" untuk melanjutkan ke pertanyaan berikutnya
}
// Event listener untuk tombol "Next"
nextButton.addEventListener("click", () => {
  // Mengatur animasi transisi untuk kontainer pertanyaan
  questionContainer.classList.remove("fade-in");
  questionContainer.classList.add("fade-out");

  // Menunggu 500ms sebelum memuat pertanyaan berikutnya atau menampilkan hasil
  setTimeout(() => {
    currentQuestionIndex++; // Meningkatkan indeks pertanyaan saat ini
    if (currentQuestionIndex < questions.length) {
      loadQuestion(); // Memuat pertanyaan berikutnya jika masih ada
    } else {
      showResults(); // Menampilkan hasil kuis jika tidak ada pertanyaan lagi
    }
  }, 500);
});

// Fungsi untuk menampilkan hasil kuis
function showResults() {
  questionElement.textContent = "Quiz Complete!"; // Menampilkan pesan bahwa kuis selesai
  optionsContainer.innerHTML = ""; // Mengosongkan kontainer opsi jawaban
  feedbackElement.textContent = `Your score: ${score}/100`; // Menampilkan skor pengguna
  countdownElement.style.display = "none"; // Menyembunyikan elemen countdown
  nextButton.style.display = "none"; // Menyembunyikan tombol "Next"

  // Menentukan pesan berdasarkan skor pengguna
  const message =
    score >= 80
      ? "Excellent! Keep up the great work! 🌟"
      : score >= 50
      ? "Good job! Keep practicing and you'll get even better! 👍"
      : "Don't worry! Keep learning and never give up! 💪";
  feedbackElement.textContent += `\n${message}`; // Menambahkan pesan ke elemen umpan balik

  // Membuat tombol "Back to Homepage"
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Homepage";
  backButton.classList.add("back-button");
  backButton.addEventListener("click", () => {
    window.location.href = "../../index.html"; // Mengarahkan pengguna kembali ke halaman utama
  });
  optionsContainer.appendChild(backButton); // Menampilkan tombol "Back" di bawah hasil
}

// Memuat pertanyaan level 3
loadQuestion();
