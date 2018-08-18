import VideoEndComponent from "../Component/VideoEnd";
import VideoListComponent from '../Component/VideoList';
import VideoPlayerComponent from '../Component/VideoPlayer';
import YoutubeAPI from "../Ajax/youtube";
import async from "async";
import { infinityScroll } from "./searchedVideos";

const videoEndUI = VideoEndComponent.create();
const videoPlayerUI = VideoPlayerComponent.create();
const relatedVideoListUI = VideoListComponent.create();

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
      YoutubeAPI.getPromise('videoItemById', {
        videoId: context.videoId
      }).then(data => {
        let containerElement = prevContext.find('#container');
        containerElement.innerHTML = '';
        videoEndUI.view.updateContext(videoEndDataToContext(data));
        videoEndUI.setTarget(containerElement).render();

        videoPlayerUI.setTarget(videoEndUI.find('#video-player')).render();
        videoPlayerUI.loadVideo(context.videoId);

        let channelId = data.items[0].snippet.channelId;
        callback(null, channelId);
      })
    },
    function(channelId, callback) {
      YoutubeAPI.getPromise('videoListByActivities', {
        channelId: channelId,
        maxResults: 8
      }).then(data => {
        let videoListElement = videoEndUI.find('#related-video-list');
        videoListElement.innerHTML = '';
        relatedVideoListUI.view.updateContext(videoListDataToContext(data));
        relatedVideoListUI.setTarget(videoListElement).render();

        callback(null);
      })
    }
  ]);
}

export default videoEndController;
export { videoPlayerUI }
