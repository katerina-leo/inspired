import { TITLE } from "../const";
import { hero } from "../elems";
import { createElement } from "../utils/createElement";

const container = createElement("div", {
  className: "container",
});

const heroContent = createElement(
  "div",
  {
    className: "hero__content",
  },
  {
    parent: container,
  }
);

const heroTitle = createElement(
  "h2",
  {
    className: "hero__title",
  },
  {
    parent: heroContent,
  }
);

const heroLink = createElement(
  "a",
  {
    className: "hero__link",
    textContent: "Перейти",
  },
  {
    parent: heroContent,
  }
);
export const renderHero = ({ gender, render }) => {
  if (!render) {
    hero.style.display = "none";
    return;
  }

  hero.style.display = "";

  hero.className = `hero hero_${gender}`;

  hero.append(container);

  heroTitle.textContent = TITLE[gender].title;
  heroLink.href = `#/product/${TITLE[gender].id}`;
};
