import Component from "../../lib/Component";
import router from "../Router";
import { delegateEvent } from "../Util";

class Header extends Component {
  constructor(options) {
    options = options || {};
    options.templateName = 'header';
    super(options);
  }
}

function submitSearch(headerElement) {
  let searchText = headerElement.querySelector('#youtube-search-textfield').value;
  let categoryId = headerElement.querySelector('#form-category').category.value;

  if (categoryId === 'null') {
    categoryId = null;
  }

  router.forward(['search'], {
    app: { doNotRender: true },
    search: { searchText: searchText, categoryId: categoryId }
  });
}

export default {
  create: () => new Header({
    data: {
      title: 'Youtube Searcher',
      user: 'Jaewon Kim',
      categories: null
    },
    events: {
      click: function(e) {
        delegateEvent('#header-title', e, function onClickTitle(e) {
          e.preventDefault();
          router.forward(['home']);
        });

        delegateEvent('#youtube-search-button', e, function onClickBtnSearch(e) {
          e.viewElement.querySelector('#popup-category').style.display = 'none';
          submitSearch(e.viewElement);
        });

        delegateEvent('#btn-category-select', e, function onClickBtnCategory(e) {
          let layerElement = e.viewElement.querySelector('#popup-category');
          if (layerElement.style.display === 'none') {
            layerElement.style.display = 'block';
          } else {
            layerElement.style.display = 'none';
          }
        });

        delegateEvent('#checkbox-category-all', e, function onClickCheckboxCategoryAll(e) {
          let notCheckedEvery = true;
          let checkboxElements = e.viewElement.querySelectorAll('#popup-category .checkbox-another');

          Array.prototype.forEach.call(checkboxElements, checkboxElement => {
            if (checkboxElement.checked) {
              notCheckedEvery = false;
              checkboxElement.checked = false;
            }
          });

          if (notCheckedEvery) {
            e.target.checked = true;
          }
        });

        delegateEvent('.checkbox-another', e, function onClickCheckboxCategory(e) {
          let checkboxCategoryAllElement = e.viewElement.querySelector('#checkbox-category-all');
          let checkboxElements = e.viewElement.querySelectorAll('#popup-category .checkbox-another');
          let notChecked = Array.prototype.every.call(checkboxElements, checkboxElement => !checkboxElement.checked);

          checkboxCategoryAllElement.checked = notChecked;
        });
      },
      keydown: {
        selector: '#youtube-search-textfield',
        handler: function onKeyDownSearchTextField(e) {
          if (e.keyCode === 13) {
            e.viewElement.querySelector('#popup-category').style.display = 'none';
            submitSearch(e.viewElement);
          }
        }
      },
      focus: {
        selector: '.video-search-input',
        handler: function onFocusTextField(e) {
          let searchBarElement = e.target.parentElement.parentElement;
          searchBarElement.classList.add('is_focused');
        }
      },
      blur: {
        selector: '.video-search-input',
        handler: function onBlurTextField(e) {
          let searchBarElement = e.target.parentElement.parentElement;
          searchBarElement.classList.remove('is_focused');
        }
      }
    }
  })
}