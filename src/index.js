import './index.html';
import './index.scss';
import { API_URL, DATA } from './modules/const';
import { createCssColors } from './modules/createCssColors';
import { createElement } from './modules/createElement';
import { getData } from './modules/getData';
import { mainPage } from './modules/mainPage/mainPage';
import { menMainPage } from './modules/mainPage/menMainPage';
import { womenMainPage } from './modules/mainPage/womenMainPage';
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
      womenMainPage();
    });
    router.on('men', () => {
      menMainPage();
    });

      // setTimeout(() => {
    //   router.navigate('men');
    // }, 3000)

    // setTimeout(() => {
    //   router.navigate('women');
    // }, 6000)

    

  } catch(e) {
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







