import Component from "../../lib/gorilla/Component";

const playerData = {
  playerIframe: null,
  videoId: null,
  width: 600,
  height: 600,
  memo: JSON.parse(sessionStorage.getItem('playData')) || {},
  memoInterval: null
};

let player;
let isCreated = false;

function VideoPlayerComponent(options) {
  options = options || {};
  options.templateName = 'videoPlayer';

  Component.call(this, options);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: playerData.width,
    height: playerData.height,
    videoId: playerData.videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

  playerData.playerIframe = player.getIframe();
}

function onPlayerReady(event) {
  player.seekTo(playerData.memo[playerData.videoId]);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING && playerData.memoInterval === null) {
    playerData.memoInterval = setInterval(() => {
      if (player.hasOwnProperty('getCurrentTime')) {
        playerData.memo[playerData.videoId] = player.getCurrentTime();
        sessionStorage.setItem('playData', JSON.stringify(playerData.memo));
      }
    }, 1000);
  } else if (event.data !== YT.PlayerState.PLAYING && playerData.memoInterval !== null) {
    clearInterval(playerData.memoInterval);
    playerData.memoInterval = null;
  }
}

VideoPlayerComponent.prototype = Object.create(Component.prototype);

VideoPlayerComponent.prototype.constructor = VideoPlayerComponent;

VideoPlayerComponent.prototype.loadVideo = function(videoId) {
  playerData.videoId = videoId;

  if (!isCreated) {
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    let apiScriptTag = document.createElement('script');
    apiScriptTag.src = "https://www.youtube.com/iframe_api";
    apiScriptTag.id = 'youtube-api-iframe';
    document.body.appendChild(apiScriptTag);

    isCreated = true;
  } else {
    onYouTubeIframeAPIReady()
  }
};

export default VideoPlayerComponent;
