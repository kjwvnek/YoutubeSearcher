import AppComponent from '../Component/App'
import HeaderComponent from '../Component/Header'
import YoutubeAPI from '../Ajax/youtube'

const rootElement = document.getElementById('root');
const appUI = AppComponent.create();
const headerUI = HeaderComponent.create();


function appController(context, prevContext) {
  if (!context.doNotRender) {
    rootElement.innerHTML = '';
    appUI.setTarget(rootElement).render();

    YoutubeAPI.getPromise('category').then(data => {
      let headerElement = appUI.find('#header');
      headerElement.innerHTML = '';
      headerUI.view.updateContext({
        categories: data
      });
      headerUI.setTarget(headerElement).render();
    });
  }
  return appUI;
}

export default appController;
