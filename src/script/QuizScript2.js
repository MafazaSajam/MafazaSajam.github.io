// Daftar pertanyaan kuis untuk level 2
const questions = [
  {
    question: "These are sentences to ask for an opinion,EXCEPT….",
    options: [
      "What do you think about hiring a taxi?",
      "OK, but let me ask my mom first.",
      "Do you mind if i ride it?",
      "So, what's your idea?."
    ],
    answer: 1
  },
  {
    question: "Rafi and Mafaza get new chance, ...",
    options: ["Doesn't they?", "Aren't they?", "Do they?", "Don't they?"],
    answer: 3
  },
  {
    question: "Jakarta is still our capital, ........?",
    options: ["Is it", "Does it", "Isn,t it", "Don,t it"],
    answer: 2
  },
  {
    question: "She could write beautiful poems, ...........?",
    options: ["Could She", "Couldn't she", "Can She", "Can't she"],
    answer: 1
  },
  {
    question: "The bicycle is not here anymore; it must have....",
    options: ["took away", "taken away", "been taking away", "been taken away"],
    answer: 3
  },
  {
    question:
      "Buyer : I want the toy car displayed in the window yesterday. \n Shopkeeper: I'm sorry, it ......",
    options: ["has sold", "has been sold", "had been selling", "had sold"],
    answer: 1
  },
  {
    question:
      "Our house will................by our neighbour when we are away.",
    options: ["Kept", "Be kept", "Keeping", "Be keeping"],
    answer: 1
  },
  {
    question:
      "Fikry: The river is very dirty. People shouldn't have thrown household rubbish into the river. \n Ahmad: That's exactly what I think. \n From the dialogue above, we know that ...",
    options: [
      "People polluted the river with rubbish.",
      "Waste material has not been collected.",
      "Fikry warned people not to throw rubbish.",
      "Fikry thinks exactly the same way."
    ],
    answer: 0
  },
  {
    question:
      "Ria: It's break time. ................. a cup of tea? \n Deni: That would be very nice of you.",
    options: [
      "Could you help me to get",
      "Shall I have",
      "May I offer help to get",
      "Would you like me to get you"
    ],
    answer: 3
  },
  {
    question:
      "The heat causes deeper water to boil much more violently.\nThe heat creates jets of steam and fountains of hot water.\n----------\nThe appropriate conjunction to combine the sentences is ....",
    options: ["but", "and", "so that", "either"],
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

// Memuat pertanyaan level 2
loadQuestion();
