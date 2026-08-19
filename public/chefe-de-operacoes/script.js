/* global document, window, IntersectionObserver, HTMLInputElement, HTMLTextAreaElement */

(() => {
  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".progress-dot")];
  const deck = document.querySelector("#deck");
  let activeIndex = 0;

  const setActive = (index) => {
    activeIndex = Math.max(0, Math.min(index, slides.length - 1));
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const goTo = (index, shouldFocus = false) => {
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    slides[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(nextIndex);
    if (shouldFocus) {
      window.setTimeout(() => slides[nextIndex].focus({ preventScroll: true }), 450);
    }
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => goTo(Number(dot.dataset.slide), true));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActive(Number(visible.target.dataset.slideIndex));
      }
    },
    { threshold: [0.55, 0.8] },
  );

  slides.forEach((slide) => observer.observe(slide));

  document.addEventListener("keydown", (event) => {
    const navigationKeys = ["ArrowDown", "ArrowRight", "PageDown", "ArrowUp", "ArrowLeft", "PageUp", "Home", "End"];
    if (!navigationKeys.includes(event.key)) return;
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

    event.preventDefault();

    if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) {
      goTo(activeIndex + 1, true);
    } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
      goTo(activeIndex - 1, true);
    } else if (event.key === "Home") {
      goTo(0, true);
    } else if (event.key === "End") {
      goTo(slides.length - 1, true);
    }
  });

  deck.addEventListener("click", (event) => {
    if (event.target === deck) deck.focus({ preventScroll: true });
  });

  setActive(0);
})();
