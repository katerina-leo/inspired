import './index.html';
import './index.scss';
import { categoryPage } from './modules/categoryPage';

import { API_URL, DATA } from './modules/const';
import { createCssColors } from './modules/createCssColors';
import { createElement } from './modules/createElement';
import { getData } from './modules/getData';
import { mainPage } from './modules/mainPage/mainPage';

import { renderFooter } from './modules/render/renderFooter';
import { renderHeader } from './modules/render/renderHeader';
import { router } from './modules/router';


const init = async () => {
  try {
    router.on('*', () => {
      renderHeader();
      renderFooter();
    });

    DATA.navigation = await getData(`${API_URL}/api/categories`);
    DATA.colors = await getData(`${API_URL}/api/colors`);

    createCssColors(DATA.colors)

    

    router.on('/', () => {
      mainPage();
    });

    router.on('women', () => {
      mainPage('women');
    });
    router.on('men', () => {
      mainPage('men');
    });

    router.on('/:gender/:category', categoryPage);

    router.on('search', (data) => {
      console.log(data.params.value)
    });

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
      parent: 'main'
    })

  } finally {
    router.resolve()
  }
  
  
}
init();







