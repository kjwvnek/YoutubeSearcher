import { fromEvent } from "rxjs"
import Component from '../Component';
import VideoListComponent from '../Component/VideoList';
import * as GET from "../Ajax/get";

const searchedVideosUI = new Component.SearchedVideos({
  data: {
    searchText: null
  }
});

const searchedVideoListUI = new VideoListComponent({
  data: {
    videos: null
  }
});

const infinityScroll = {
  subscriber: null,
  observable: fromEvent(window, 'scroll'),
  nowPage: 1,
  perPage: 20,
  pageToken: null,
  end: false,
  event: function infinityScrollEventHandler(e) {
    if (window.pageYOffset + window.innerHeight >= document.body.scrollHeight) {
      infinityScroll.unsubscribe();

      if (!infinityScroll.end) {
        GET.VideoListBySearchText({
          searchText: searchedVideosUI.searchText,
          maxResults: infinityScroll.perPage,
          pageToken: infinityScroll.pageToken
        }, data => {
          let newVideoListUI = new VideoListComponent({ data: videoListDataToContext(data) });
          newVideoListUI.setTarget(searchedVideosUI.find('#searched-video-list')).render();

          infinityScroll.nowPage++;
          if (infinityScroll.perPage * infinityScroll.nowPage >= data.pageInfo.totalResults) {
            infinityScroll.end = true;
          }
          infinityScroll.pageToken = data.nextPageToken;
          infinityScroll.subscribe();
        });
      }
    }
  },
  subscribe: function() {
    this.subscriber = this.observable.subscribe(this.event);
  },
  unsubscribe: function() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }
};

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

function searchedVideosController(context, prevContext) {
  let containerElement = prevContext.find('#container');
  containerElement.innerHTML = '';
  searchedVideosUI.view.updateContext({ searchText: context.searchText });
  searchedVideosUI.setTarget(containerElement).render();

  GET.VideoListBySearchText({
    searchText: searchedVideosUI.searchText,
    maxResults: infinityScroll.perPage
  }, data => {
    let videoListElement = searchedVideosUI.find('#searched-video-list');
    videoListElement.innerHTML = '';
    searchedVideoListUI.view.updateContext(videoListDataToContext(data));
    searchedVideoListUI.setTarget(videoListElement).render();

    infinityScroll.nowPage = 1;
    infinityScroll.pageToken = data.nextPageToken;
    infinityScroll.subscribe();
  });
}

export default searchedVideosController;
export { infinityScroll }
