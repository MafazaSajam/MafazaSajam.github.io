// Daftar pertanyaan kuis untuk level 4
const questions = [
  {
    question:
      "Which sentence demonstrates correct use of a reduced relative clause?",
    options: [
      "The book, which is lying on the table, belongs to Sarah.",
      "The book lying on the table belongs to Sarah.",
      "The book which lying on the table belongs to Sarah.",
      "The book is lying on the table belongs to Sarah."
    ],
    answer: 1
  },
  {
    question: "Identify the sentence with proper parallel structure.",
    options: [
      "The professor explained the assignment, gave examples, and answering questions.",
      "The professor explained the assignment, gave examples, and answered questions.",
      "The professor explaining the assignment, giving examples, and answered questions.",
      "The professor explained the assignment, give examples, and answered questions."
    ],
    answer: 1
  },
  {
    question:
      "Which of the following sentences uses correct subject-verb agreement?",
    options: [
      "Each of the students were assigned a different topic.",
      "Each of the students was assigned a different topic.",
      "Each of the student was assigned a different topic.",
      "Each of the students is assigning a different topic."
    ],
    answer: 1
  },
  {
    question:
      "Choose the sentence with the correct use of an inverted conditional.",
    options: [
      "Had he known about the meeting, he would attend.",
      "Had he known about the meeting, he would have attended.",
      "Had he knew about the meeting, he would have attended.",
      "Had he know about the meeting, he would attend."
    ],
    answer: 1
  },
  {
    question: "Which sentence uses the correct form of a phrasal verb?",
    options: [
      "She broke up the project after receiving new instructions.",
      "She broke down the project into smaller parts for better understanding.",
      "She broke out the project for further investigation.",
      "She broke through the project after receiving updates."
    ],
    answer: 1
  },
  {
    question: "Which sentence correctly demonstrates the use of a noun clause?",
    options: [
      "I don’t know what time the meeting starts.",
      "I don’t know the time the meeting start.",
      "I don’t know what is the time the meeting starts.",
      "I don’t know when does the meeting starts."
    ],
    answer: 0
  },
  {
    question: "Which sentence uses a correct advanced modal structure?",
    options: [
      "She could have been waiting for the train when we arrived.",
      "She must have been waited for the train when we arrived.",
      "She should have waited for the train when we arrive.",
      "She could been waiting for the train when we arrive."
    ],
    answer: 0
  },
  {
    question:
      "Identify the grammatically correct sentence with an idiomatic expression.",
    options: [
      "He hit the nail in the head with his solution.",
      "He hit the nail on the head with his solution.",
      "He hit the nail to the head with his solution.",
      "He hit the nail under the head with his solution."
    ],
    answer: 1
  },
  {
    question:
      "Which of the following uses correct parallelism with correlative conjunctions?",
    options: [
      "Not only did she enjoy the concert, but she also singing along.",
      "Not only did she enjoy the concert, but she also sang along.",
      "Not only did she enjoy the concert, but also sang along.",
      "Not only she enjoyed the concert, but she also sang along."
    ],
    answer: 1
  },
  {
    question: "Which sentence demonstrates proper use of an appositive phrase?",
    options: [
      "My brother, who is an engineer, lives in New York.",
      "My brother, an engineer, lives in New York.",
      "My brother an engineer, lives in New York.",
      "My brother, who an engineer, lives in New York."
    ],
    answer: 1
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

// Memuat pertanyaan level 4
loadQuestion();
