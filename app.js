const burger = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.position = "absolute";
    navLinks.style.top = "100%";
    navLinks.style.left = "0";
    navLinks.style.right = "0";
    navLinks.style.background = "rgba(255,255,255,0.96)";
    navLinks.style.backdropFilter = "blur(12px)";
    navLinks.style.padding = "24px";
    navLinks.style.gap = "16px";
    navLinks.style.borderBottom = "1px solid rgba(0,0,0,0.04)";
    navLinks.style.boxShadow = "0 20px 40px -12px rgba(0,0,0,0.08)";
  }
});

document.querySelectorAll(".nav__lists a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.style.display = "none";
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "row";
    navLinks.style.position = "static";
    navLinks.style.background = "transparent";
    navLinks.style.backdropFilter = "none";
    navLinks.style.padding = "0";
    navLinks.style.gap = "28px";
    navLinks.style.borderBottom = "none";
    navLinks.style.boxShadow = "none";
  } else {
    navLinks.style.display = "none";
  }
});


document.querySelectorAll("[data-slider][data-direction]").forEach((button) => {
  button.addEventListener("click", () => {
    const slider = document.querySelector(`.${button.dataset.slider}`);
    const card = slider?.firstElementChild;
    if (!slider || !card) return;

    const gap = parseFloat(getComputedStyle(slider).columnGap) || 20;
    slider.scrollBy({
      left: (card.getBoundingClientRect().width + gap) * Number(button.dataset.direction),
      behavior: "smooth",
    });
  });
});

const groupSlider = document.querySelector(".group-track");
if (groupSlider) {
  const groupCards = [...groupSlider.children];
  const currentLabel = document.querySelector(".group-current");
  const progress = document.querySelector(".group-progress i");

  const updateGroupSlider = () => {
    const firstCard = groupCards[0];
    const gap = parseFloat(getComputedStyle(groupSlider).columnGap) || 24;
    const step = firstCard.getBoundingClientRect().width + gap;
    const index = Math.min(groupCards.length - 1, Math.max(0, Math.round(groupSlider.scrollLeft / step)));
    groupCards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === index));
    currentLabel.textContent = String(index + 1).padStart(2, "0");
    progress.style.width = `${((index + 1) / groupCards.length) * 100}%`;
  };

  groupSlider.addEventListener("scroll", updateGroupSlider, { passive: true });
  window.addEventListener("resize", updateGroupSlider);
  groupSlider.scrollLeft = 0;
  updateGroupSlider();
}
