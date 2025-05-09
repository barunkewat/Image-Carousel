const slider = document.querySelector(".slider");
const cards = document.querySelectorAll(".card");
const ease = 0.1;

let currentX = 0;
let targetX = 0;

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const getScaleFactor = (position, viewportWidth) => {
  const quarterWidth = viewportWidth / 4;

  if (position < 0 || position > viewportWidth) {
    return 0;
  } else if (position < quarterWidth) {
    return lerp(0, 0.45, position / quarterWidth);
  } else if (position < 2 * quarterWidth) {
    return lerp(0.45, 1.5, (position - quarterWidth) / quarterWidth);
  } else if (position < 3 * quarterWidth) {
    return lerp(1.5, 0.45, (position - 2 * quarterWidth) / quarterWidth);
  } else {
    return lerp(0.45, 0, (position - 3 * quarterWidth) / quarterWidth);
  }
};

const updateScales = () => {
  const viewportWidth = window.innerWidth;
  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const scaleFactor = getScaleFactor(cardCenter, viewportWidth);
    const imgScaleFactor = scaleFactor * 1.1;
    const img = card.querySelector("img");

    card.style.transform = `scale(${scaleFactor})`;
    if (img) img.style.transform = `scale(${imgScaleFactor})`;
  });
};

const update = () => {
  currentX = lerp(currentX, targetX, ease);
  slider.style.transform = `translateX(${currentX}px)`;
  updateScales();
  requestAnimationFrame(update);
};

window.addEventListener("scroll", () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollProgress = window.scrollY / maxScroll;

  const sliderWidth = slider.scrollWidth;
  const windowWidth = window.innerWidth;
  const maxTranslateX = sliderWidth - windowWidth;

  targetX = -scrollProgress * maxTranslateX;
});

update();
