import HomeComponent from '../Component/Home';
import VideoListComponent from '../Component/VideoList';
import YoutubeAPI from "../Ajax/youtube";
import { infinityScroll } from "./searchedVideos"

const homeUI = HomeComponent.create();
const jsVideoListUI = VideoListComponent.create();
const pythonVideoListUI = VideoListComponent.create();
const cPlusPlusVideoListUI = VideoListComponent.create();

function videoListDataToContext(data) {
  return {
    videos: data.items.map(item => ({
      videoId: item.id.videoId,
      channelId: item.snippet.channelId,
      src: item.snippet.thumbnails.default.url,
      title: item.snippet.title,
      description: item.snippet.description
    }))
  }
}

function homeController(context, prevContext) {
  infinityScroll.unsubscribe();

  let containerElement = prevContext.find('#container');
  containerElement.innerHTML = '';
  homeUI.setTarget(containerElement).render();

  YoutubeAPI.getPromise('videoListBySearchText', {
    searchText: 'programming javascript',
    maxResults: 20
  }).then(data => {
    let videoListElement = homeUI.find('#javascript-video-list');
    videoListElement.innerHTML = '';
    jsVideoListUI.view.updateContext(videoListDataToContext(data));
    jsVideoListUI.setTarget(videoListElement).render();
  });

  YoutubeAPI.getPromise('videoListBySearchText', {
    searchText: 'programming python',
    maxResults: 20
  }).then(data => {
    let videoListElement = homeUI.find('#python-video-list');
    videoListElement.innerHTML = '';
    pythonVideoListUI.view.updateContext(videoListDataToContext(data));
    pythonVideoListUI.setTarget(videoListElement).render();
  });

  YoutubeAPI.getPromise('videoListBySearchText', {
    searchText: 'programming c++',
    maxResults: 20
  }).then(data => {
    let videoListElement = homeUI.find('#c-plus-plus-video-list');
    videoListElement.innerHTML = '';
    cPlusPlusVideoListUI.view.updateContext(videoListDataToContext(data));
    cPlusPlusVideoListUI.setTarget(videoListElement).render();
  });
}

export default homeController;
