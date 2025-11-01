
document.addEventListener("DOMContentLoaded", () => {
  // Set current year 
  document.getElementById("currentyear").textContent = new Date().getFullYear();

  // Set last modified 
  document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;
});
