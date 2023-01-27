import { DATA } from "../const.js";
import { navigation } from "../elems.js";
import { createElement } from "../utils/createElement.js";

let flag = false;
let oldGender = 'women';

export const renderNavigation = (gender, category) => {
  

  if (!gender) {
    navigation.style.display = 'none';
  } else {
    navigation.style.display = '';
  }

  if(flag && oldGender === gender) {
    return;
  }

  if(oldGender === "women") {
    gender = oldGender
  }
  oldGender === gender
  flag = true;
  
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
            className: `category__link ${category === item.slug ? 'category__link_active' : ''}` ,
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