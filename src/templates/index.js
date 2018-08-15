import appTemplate from './app.html';
import homeTemplate from './home.html';
import searchedVideosTemplate from './searchedVideos.html';
import videoEndTemplate from './videoEnd.html';
import videoListTemplate from './videoList.html';
import videoPlayerTemplate from './videoPlayer.html';

const templates = {
  app: appTemplate,
  home: homeTemplate,
  searchedVideos: searchedVideosTemplate,
  videoEnd: videoEndTemplate,
  videoPlayer: videoPlayerTemplate,
  videoList: videoListTemplate,
};

const getter = function(templateName) {
  return templates[templateName] || null;
};

export default {
  get: getter
}
