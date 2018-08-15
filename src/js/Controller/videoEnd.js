import Component from "../Component";
import VideoListComponent from '../Component/VideoList';
import VideoPlayerComponent from '../Component/VideoPlayer';
import * as GET from "../Ajax/get";
import async from "async";
import { infinityScroll } from "./searchedVideos";

const videoEndUI = new Component.VideoEnd({
  data: {
    videoFrame: null,
    duration: null,
    title: null,
    channel: null,
    description: null,
    tags: null,
    viewCount: null,
    likeCount: null,
    dislikeCount: null
  }
});

const videoPlayerUI = new VideoPlayerComponent();

const relatedVideoListUI = new VideoListComponent({
  data: {
    videos: null
  }
});

function videoEndDataToContext(data) {
  let videoItem = data.items[0];
  return {
    videoFrame: videoItem.player.embedHtml,
    duration: videoItem.contentDetails.duration,
    title: videoItem.snippet.title,
    channel: videoItem.snippet.channelTitle,
    description: videoItem.snippet.description,
    tags: videoItem.snippet.tags,
    viewCount: videoItem.statistics.viewCount,
    likeCount: videoItem.statistics.likeCount,
    dislikeCount: videoItem.statistics.dislikeCount
  };
}

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

function videoEndController(context, prevContext) {
  infinityScroll.unsubscribe();

  async.waterfall([
    function(callback) {
      GET.VideoItemById({
        videoId: context.videoId
      }, data => {
        let containerElement = prevContext.find('#container');
        containerElement.innerHTML = '';
        videoEndUI.view.updateContext(videoEndDataToContext(data));
        videoEndUI.setTarget(containerElement).render();

        videoPlayerUI.setTarget(videoEndUI.find('#video-player')).render();
        videoPlayerUI.loadVideo(context.videoId);

        let channelId = data.items[0].snippet.channelId;
        callback(null, channelId);
      });
    },
    function(channelId, callback) {
      GET.VideoListByActivities({
        channelId: channelId,
        maxResults: 8
      }, data => {
        let videoListElement = videoEndUI.find('#related-video-list');
        videoListElement.innerHTML = '';
        relatedVideoListUI.view.updateContext(videoListDataToContext(data));
        relatedVideoListUI.setTarget(videoListElement).render();

        callback(null);
      });
    }
  ]);
}

export default videoEndController;
export { videoPlayerUI }
