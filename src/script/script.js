/// Mengaktifkan header sticky
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 50); // Menambahkan kelas "sticky" ke header jika scrollY lebih dari 50
});

// Mengaktifkan menu scroll
const liLink = document.querySelectorAll("header ul li a");
const section = document.querySelectorAll("section");

function activeMenu() {
  let seclength = section.length;
  // Menentukan bagian mana yang sedang terlihat di viewport
  while (--seclength && window.scrollY + 500 < section[seclength].offsetTop) {}
  liLink.forEach((sec) => sec.classList.remove("active")); // Menghapus kelas "active" dari semua link
  liLink[seclength].classList.add("active"); // Menambahkan kelas "active" ke link yang sesuai dengan bagian yang terlihat
}

activeMenu(); // Memanggil fungsi activeMenu untuk pertama kali
window.addEventListener("scroll", activeMenu); // Menambahkan event listener untuk memanggil activeMenu saat scroll

// Animasi scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items"); // Menambahkan kelas "show-items" jika elemen terlihat di viewport
    } else {
      entry.target.classList.remove("show-items"); // Menghapus kelas "show-items" jika elemen tidak terlihat di viewport
    }
  });
});

// Mengamati elemen dengan kelas "scroll-left"
const scrollLeft = document.querySelectorAll(".scroll-left");
scrollLeft.forEach((el) => observer.observe(el));

// Mengamati elemen dengan kelas "scroll-right"
const scrollRight = document.querySelectorAll(".scroll-right");
scrollRight.forEach((el) => observer.observe(el));

// Mengamati elemen dengan kelas "scroll-top"
const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => observer.observe(el));

// Mengamati elemen dengan kelas "scroll-bottom"
const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => observer.observe(el));
