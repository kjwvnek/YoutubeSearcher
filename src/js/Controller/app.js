import Component from '../Component';
import router from "../Router";
import { delegateEvent } from "../Util";

const rootElement = document.getElementById('root');

const appUI = new Component.App({
  data: {
    title: null,
    user: null
  },
  events: {
    click: e => {
      e.preventDefault();

      delegateEvent('.header .title', e, e => {
        router.forward(['home']);
      });

      delegateEvent('#youtube-search-button', e, e => {
        let searchText = e.referee.previousElementSibling.value;
        router.forward(['search'], {
          app: {
            doNotRender: true
          },
          search: {
            searchText: searchText
          }
        });
      });
    },
    keydown: e => {
      delegateEvent('#youtube-search-textfield', e, e => {
        if (e.keyCode === 13) {
          router.forward(['search'], {
            app: {
              doNotRender: true
            },
            search: {
              searchText: e.referee.value
            }
          });
        }
      });
    }
  }
});

function appController(context, prevContext) {
  if (!context.doNotRender) {
    appUI.view.updateContext({
      title: 'VanillaTube',
      user: 'Jaewon Kim'
    });
    rootElement.innerHTML = '';
    appUI.setTarget(rootElement).render();
  }

  return appUI;
}

export default appController;
