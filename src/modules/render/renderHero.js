import { createElement } from "../createElement";

export const renderHero = (gender) => {
  const hero = document.querySelector('.hero');

  if(!gender) {
    hero.style.display = "none";
    return;
  }

  hero.style.display = "";

  hero.className = `hero hero_${gender}`;

  const container = createElement('div', 
    {
      className: 'container',
    },
    {
      parent: hero,
    }
  );

  const heroContent = createElement('div', 
    {
      className: 'hero__content',
    },
    {
      parent: container,
      appends: [
        createElement('h2', 
          {
            className: 'hero__title',
            textContent: `${gender === 'women' ? 'Новая коллекция Бюстгальтер-балконет' : 'Боксеры из новой коллекции'}`,
            
          },
        ),
        createElement ('a', 
          {
            className: 'hero__link',
            textContent: 'Перейти',
            href: `#/`
          }
        )
      ]
    }
  );

  


  // hero.innerHTML = `
  // <div class="container">
  //       <div class="hero__content">
  //         <h2 class="hero__title">Новая коллекция Бюстгальтер-балконет</h2>
  //         <a href="#" class="hero__link">Перейти</a>
  //       </div>
  // </div>
  // `
}