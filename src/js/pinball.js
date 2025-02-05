document.addEventListener("DOMContentLoaded", function () {
  const pinballs = document.querySelectorAll(".pinball");

  pinballs.forEach((pinball, index) => {
    // Mengatur posisi awal dan kecepatan setiap pinball
    let xPos = Math.random() * (window.innerWidth - pinball.offsetWidth); // Posisi horizontal acak
    let yPos = Math.random() * (window.innerHeight - pinball.offsetHeight); // Posisi vertikal acak
    let xSpeed = 2 + Math.random() * 2; // Kecepatan untuk gerakan horizontal
    let ySpeed = 2 + Math.random() * 2; // Kecepatan untuk gerakan vertikal

    // Arah awal
    let directionX = 1;
    let directionY = 1;

    // Mengatur posisi awal di layar
    pinball.style.left = `${xPos}px`;
    pinball.style.top = `${yPos}px`;

    // Menggerakkan pinball dalam loop
    function movePinball() {
      // Memeriksa tabrakan dengan tepi layar
      if (xPos + pinball.offsetWidth >= window.innerWidth || xPos <= 0) {
        directionX *= -1; // Membalik arah horizontal
      }
      if (yPos + pinball.offsetHeight >= window.innerHeight || yPos <= 0) {
        directionY *= -1; // Membalik arah vertikal
      }

      // Memeriksa tabrakan dengan pinball lainnya
      pinballs.forEach((otherPinball, otherIndex) => {
        if (index !== otherIndex) {
          const otherXPos = parseFloat(otherPinball.style.left);
          const otherYPos = parseFloat(otherPinball.style.top);
          const distance = Math.sqrt(
            Math.pow(xPos - otherXPos, 2) + Math.pow(yPos - otherYPos, 2)
          );

          if (distance < pinball.offsetWidth) {
            directionX *= -1; // Membalik arah horizontal
            directionY *= -1; // Membalik arah vertikal
          }
        }
      });

      // Memperbarui posisi berdasarkan arah
      xPos += xSpeed * directionX;
      yPos += ySpeed * directionY;

      // Mengatur posisi baru pinball
      pinball.style.left = `${xPos}px`;
      pinball.style.top = `${yPos}px`;

      // Mengulangi animasi
      requestAnimationFrame(movePinball);
    }

    // Memulai menggerakkan pinball
    movePinball();
  });
});

document.querySelectorAll(".pinball").forEach((pinball) => {
  for (let i = 1; i <= 3; i++) {
    let span = document.createElement("span");
    span.style.setProperty("--i", i);
    pinball.appendChild(span);
  }
});
