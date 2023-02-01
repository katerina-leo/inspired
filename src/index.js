import './index.html';
import './index.scss';


import { API_URL, DATA } from './modules/const';
import { createCssColors } from './modules/createCssColors';
import { createElement } from './modules/utils/createElement';
import { getData } from './modules/getData';
import {  mainPageController } from './modules/controllers/mainPageController';

import { renderFooter } from './modules/render/renderFooter';
import { renderHeader } from './modules/render/renderHeader';
import { router } from './modules/utils/router';
import { categoryPageController } from './modules/controllers/categoryPageController';
import { searchPageController } from './modules/controllers/searchController';
import { main } from './modules/elems';
import { favoritePageController } from './modules/controllers/favoriteController';
import { cardController } from './modules/controllers/cardController';


const init = async () => {
  try {

    DATA.navigation = await getData(`${API_URL}/api/categories`);
    DATA.colors = await getData(`${API_URL}/api/colors`);

    router.on('*', () => {
      renderHeader();
      renderFooter();
    });

    createCssColors(DATA.colors)

    

    router.on('/', () => {
      mainPageController();
    });

    router.on('women', () => {
      mainPageController('women');
    });
    router.on('men', () => {
      mainPageController('men');
    });

    router.on('/:gender/:category', categoryPageController);

    router.on('/product/:id', cardController);

    router.on('search', searchPageController);

    router.on('favorite', favoritePageController);


      // setTimeout(() => {
    //   router.navigate('men');
    // }, 3000)

    // setTimeout(() => {
    //   router.navigate('women');
    // }, 6000)

    

  } catch(e) {
    console.warn(e)
    createElement('h2', {
      textContent: "Что-то пошло не так, поробуйте позже..."
    }, 
    {
      parent: main,
      cb(h2) {
        h2.style.textAlign = 'center';
        h2.style.color = 'red';
      }
    })

  } finally {
    router.resolve()
  }
  
  
}
init();







