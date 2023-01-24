import { DATA } from "../const.js";
import { createElement } from "../createElement.js";


export const renderNavigation = (gender) => {
  const navigation = document.querySelector('.navigation');

  navigation.textContent = "";

  const container = createElement('div', {
      className: 'container'
    },
    {
      parent: navigation,
    }
  );

  const genderList = createElement ('ul', 
    {
      className: 'navigation__gender gender',
    },
    {
      parent: container,
    }
  )

  for (const genderName in DATA.navigation) {
    createElement('a', 
      {
        className: `gender__link ${gender === genderName ? 'gender__link_active' : ''}`,
        href: `#/${genderName}`,
        textContent: DATA.navigation[genderName].title,
      },
      {
        parent: createElement('li', 
        {
          className: 'gender__item',
        },
        {
          parent: genderList,
        })
      })
  };

  const categoryElements = DATA.navigation[gender].list.map((item) =>
    createElement(
      'li', 
      {
        className: 'category__item',
      },
      {
        append: createElement(
          'a', 
          {
            className: 'category__link',
            textContent: item.title,
            href: `#/${gender}/${item.slug}`,
          },
          {
            cb(elem) {
              
              
              elem.addEventListener('click', () => {
                document.querySelector('.category__link_active')?.classList.remove('category__link_active');

                elem.classList.add('category__link_active');
              })
            }
          }
        )
      }    
    )
  );
    
  createElement('ul', 
    {
      className: 'navigation__category category',
    },
    {
      parent: container,
      appends: categoryElements
    },
  );
};