import { fromEvent } from "rxjs"
import SearchedVideosComponent from '../Component/SearchedVideos';
import VideoListComponent from '../Component/VideoList';
import YoutubeAPI from "../Ajax/youtube";

const searchedVideosUI = SearchedVideosComponent.create();
const searchedVideoListUI = VideoListComponent.create();

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
        YoutubeAPI.getPromise('videoListBySearchText', {
          searchText: searchedVideosUI.searchText,
          maxResults: infinityScroll.perPage,
          pageToken: infinityScroll.pageToken
        }).then(data => {
          let newVideoListUI = VideoListComponent.create();
          newVideoListUI.view.updateContext(videoListDataToContext(data));
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
  searchedVideosUI.view.updateContext({
    searchText: context.searchText,
    categoryId: context.categoryId
  });
  searchedVideosUI.setTarget(containerElement).render();

  YoutubeAPI.getPromise('videoListBySearchText', {
    searchText: searchedVideosUI.searchText,
    categoryId: searchedVideosUI.categoryId,
    maxResults: infinityScroll.perPage
  }).then(data => {
    if (data.items.length === 0) {
      searchedVideosUI.find('#msg-empty').style.display = 'block';
    }

    let videoListElement = searchedVideosUI.find('#searched-video-list');
    videoListElement.innerHTML = '';
    searchedVideoListUI.view.updateContext(videoListDataToContext(data));
    searchedVideoListUI.setTarget(videoListElement).render();

    infinityScroll.nowPage = 1;
    infinityScroll.pageToken = data.nextPageToken;
    infinityScroll.subscribe();
  })
}

export default searchedVideosController;
export { infinityScroll }
