import appTemplate from './app.html';
import headerTemplate from './header.html';
import homeTemplate from './home.html';
import searchedVideosTemplate from './searchedVideos.html';
import videoEndTemplate from './videoEnd.html';
import videoListTemplate from './videoList.html';
import videoPlayerTemplate from './videoPlayer.html';

const templates = {
  app: appTemplate,
  header: headerTemplate,
  home: homeTemplate,
  searchedVideos: searchedVideosTemplate,
  videoEnd: videoEndTemplate,
  videoPlayer: videoPlayerTemplate,
  videoList: videoListTemplate,
};

export default {
  get: function(templateName) {
    return templates[templateName] || null;
  }
}
