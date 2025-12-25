// LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// TYPING EFFECT
document.addEventListener("DOMContentLoaded", () => {
  const text = "Halo, Saya Cardi";
  const typing = document.getElementById("typing");
  let i = 0;

  function type() {
    if (typing && i < text.length) {
      typing.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 120);
    }
  }
  type();
});

// DARK / LIGHT MODE
const modeBtn = document.getElementById("mode");
if (modeBtn) {
  modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    modeBtn.textContent = document.body.classList.contains("light")
      ? "☀️"
      : "🌙";
  });
}
