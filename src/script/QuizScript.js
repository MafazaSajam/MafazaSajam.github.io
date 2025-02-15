// Daftar pertanyaan kuis untuk level 1
const questions = [
  {
    question:
      "The Purpose of narrative text is ....... the reader with a story",
    options: ["to amuse", "to inform", "to disrupt", "to advise"],
    answer: 0
  },
  {
    question: "Fairy tales is story which relates much with ....things.",
    options: ["place", "belief", "magic", "nature"],
    answer: 2
  },
  {
    question:
      "Complete the dialog below by selecting the correct answer! \n \nFerdi: Next week, we're on holiday. So, Rosa, what are you going to do on your holiday? \n Rosa:..",
    options: [
      "I don't know where I'm going.",
      "This is not your business.",
      "I have nothing to do.",
      "I'm thinking of going to Bali."
    ],
    answer: 3
  },
  {
    question:
      "Select the most appropriate answer to complete the sentence! \n .....it's so important to teach children from an early age to be independent and responsible!",
    options: [
      "He totally understands",
      "Do you think that",
      "In my opinion",
      "You can't believe"
    ],
    answer: 2
  },
  {
    question: "My Brother lives .....Bandung",
    options: ["At", "In", "On", "Within"],
    answer: 1
  },
  {
    question: "The party will be held .......Sunday, June 18, at 08.00 pm.",
    options: ["At", "To", "On", "In"],
    answer: 2
  },
  {
    question:
      "Nadia told ....that you would like to have more pen pals from Japan.",
    options: ["Me", "I", "My", "Mine"],
    answer: 0
  },
  {
    question:
      "Manaan has several pen pals from India. He writes to ..... via email every week.",
    options: ["Them", "They", "Their", "Theirs"],
    answer: 0
  },
  {
    question:
      "My friends and I often spend long vacations in our hometowns. .... through email and Whatsapp.",
    options: [
      "I keep in touch",
      "They keep in touch",
      "She keep in touch",
      "We keep in touch"
    ],
    answer: 3
  },
  {
    question:
      "Yafa often tells Yafi about her rehearsal. .....joins a choir club in her school.?",
    options: ["She", "He", "His", "Her"],
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

// Memuat pertanyaan pertama
loadQuestion();
