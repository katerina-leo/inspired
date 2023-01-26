import { API_URL, COUNT_PAGINATION, DATA } from "../const";
import { createElement } from "../createElement";

import { getData } from "../getData";
import { renderPagination } from "./renderPagination";

export const renderProducts = async (title, params) => {
  
  const products = document.querySelector('.goods');
  products.textContent = "";

  const data = await getData(`${API_URL}/api/goods`, params);

  const goods = Array.isArray(data)?data : data.goods;

  const container = createElement('div', 
    {
      className: 'container',
    },
    {
      parent: products,
    }
  );

  createElement('h2', {
    className: 'goods__title',
    textContent: title,
  },
  {
    parent: container,
  }
  );

  const listCard = goods.map((product) => {
    
    const li = createElement('li',
      {
        className: 'goods__item',        
      });

      const article = createElement('article', 
      {
        className: "product",
        innerHTML: 
          `
                <a class="product__link" href="#/product/${product.id}">
                  <img src="${API_URL}/${product.pic}" alt="${product.title}" class="product__image">
                  <h3 class="product__title">${product.title}</h3>
                </a>
                <div class="product__row">
                  <p class="product__price">руб ${product.price}</p>
                  <button class="product__btn-favorite" 
                    aria-label="добавить в избранное" 
                    data-id=${product.id}>
                  </button>
                </div>
            
          `
      },
      {
        parent: li,
      });

      createElement('ul', 
        {
          className: 'product__color-list',
        },
        {
          parent: article,
          appends: product.colors.map((colorID, i) => {
            
            const color = DATA.colors.find(item => item.id == colorID);

            return createElement('li', {
              className: `color color_${color.title} ${ i ? '' : 'color_check' }`,
            })
          })
        }
      )


    return li;
  })

  createElement('ul', 
    {
      className: 'goods__list',
    },
    {
      parent: container,
      appends: listCard,
    }
  )

    if(data.pages && data.pages > 1) {
      const pagination = createElement('div', 
        {
          className: 'goods__pagination pagination'
        },
        {
          parent: container,
        }
      )
      renderPagination(pagination, data.page, data.pages, COUNT_PAGINATION);

    }
}