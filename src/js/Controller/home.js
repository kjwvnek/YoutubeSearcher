import Component from '../Component';
import VideoListComponent from '../Component/VideoList';
import * as GET from "../Ajax/get";
import { infinityScroll } from "./searchedVideos"

const homeUI = new Component.Home();

const jsVideoListUI = new VideoListComponent({
  data: {
    videos: null
  }
});

const pythonVideoListUI = new VideoListComponent({
  data: {
    videos: null
  }
});

const cPlusPlusVideoListUI = new VideoListComponent({
  data: {
    videos: null
  }
});

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

  GET.VideoListBySearchText({
    searchText: 'programming javascript',
    maxResults: 10
  }, data => {
    let videoListElement = homeUI.find('#javascript-video-list');
    videoListElement.innerHTML = '';
    jsVideoListUI.view.updateContext(videoListDataToContext(data));
    jsVideoListUI.setTarget(videoListElement).render();
  });

  GET.VideoListBySearchText({
    searchText: 'programming python',
    maxResults: 10
  }, data => {
    let videoListElement = homeUI.find('#python-video-list');
    videoListElement.innerHTML = '';
    pythonVideoListUI.view.updateContext(videoListDataToContext(data));
    pythonVideoListUI.setTarget(videoListElement).render();
  });

  GET.VideoListBySearchText({
    searchText: 'programming c++',
    maxResults: 10
  }, data => {
    let videoListElement = homeUI.find('#c-plus-plus-video-list');
    videoListElement.innerHTML = '';
    cPlusPlusVideoListUI.view.updateContext(videoListDataToContext(data));
    cPlusPlusVideoListUI.setTarget(videoListElement).render();
  });
}

export default homeController;
