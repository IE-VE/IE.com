// Sidebar
document.getElementById("menu").addEventListener("click", function () {
  const navEl = document.getElementById("small-nav");
  navEl.classList.add("open");
});

document
  .getElementById("close-small-nav")
  .addEventListener("click", function () {
    const navEl = document.getElementById("small-nav");

    navEl.classList.remove("open");
  });
