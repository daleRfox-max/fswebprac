const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
const year = document.querySelector("[data-year]");

function setNavState() {
  nav?.classList.toggle("scrolled", window.scrollY > 18);
}

function closeMenu() {
  nav?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open menu");
  if (menuToggle) menuToggle.textContent = "+";
}

setNavState();
window.addEventListener("scroll", setNavState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.textContent = open ? "-" : "+";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.addEventListener("click", (event) => {
  if (!nav?.classList.contains("open")) return;
  if (event.target instanceof Node && nav.contains(event.target)) return;
  closeMenu();
});

if (year) year.textContent = new Date().getFullYear();
