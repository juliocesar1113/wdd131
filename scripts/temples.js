
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  if (nav.style.display === "block") {
    nav.style.display = "none";
    hamburger.textContent = "☰";
  } else {
    nav.style.display = "block";
    hamburger.textContent = "✕";
  }
});

// FOOTER: YEAR + LAST MODIFIED
const yearSpan = document.querySelector("#year");
const lastModifiedSpan = document.querySelector("#lastModified");

const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;
lastModifiedSpan.textContent = document.lastModified;
