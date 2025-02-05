//active header sticky
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 50);
});

// active scroll menu

const liLink = document.querySelectorAll(" header ul li a");
const section = document.querySelectorAll("section");

function activeMenu() {
  let seclength = section.length;
  while (--seclength && window.scrollY + 500 < section[seclength].offsetTop) {}
  liLink.forEach((sec) => sec.classList.remove("active"));
  liLink[seclength].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

// scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
});

const scrollLeft = document.querySelectorAll(".scroll-left");
scrollLeft.forEach((el) => observer.observe(el));

const scrollRight = document.querySelectorAll(".scroll-right");
scrollRight.forEach((el) => observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => observer.observe(el));
