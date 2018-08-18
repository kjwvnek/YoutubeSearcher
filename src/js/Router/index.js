import Router from "../../lib/Router";
import appController from "../Controller/app";
import homeController from "../Controller/home";
import searchedVideosController from "../Controller/searchedVideos";
import videoEndController from "../Controller/videoEnd";

const router = new Router({
  name: 'app',
  path: '/',
  on: appController,
  next: [
    {
      name: 'home',
      path: 'home',
      on: homeController
    },
    {
      name: 'search',
      path: data => `search/${encodeURIComponent(data.searchText)}`,
      on: searchedVideosController
    },
    {
      name: 'video',
      path: data => `video/${encodeURIComponent(data.videoId)}`,
      on: videoEndController
    }
  ]
});

function displayByHashValue(hashValue) {
  let routes = hashValue.split('/')

  if (routes.length === 2 && routes[1] === 'home') {
    router.forward(['home'], null, true);
  } else if (routes.length === 3 && routes[1] === 'search') {
    router.forward(['search'], {
      search: {
        searchText: routes[2],
        redirect: true,
      }
    }, true);
  } else if (routes.length === 3 && routes[1] === 'video') {
    router.forward(['video'], {
      video: {
        videoId: routes[2],
        redirect: true
      }
    }, true);
  }
}

window.addEventListener('hashchange', function(e) {
  let hashValue = e.newURL.substr(e.newURL.indexOf('#') + 1);
  displayByHashValue(hashValue);
});

export default router;
export { displayByHashValue };
