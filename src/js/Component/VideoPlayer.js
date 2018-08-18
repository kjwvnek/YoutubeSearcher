import Component from "../../lib/Component";

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

class VideoPlayer extends Component {
  constructor(options) {
    options = options || {};
    options.templateName = 'videoPlayer';
    super(options);
  }

  loadVideo(videoId) {
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
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: playerData.width,
    height: playerData.height,
    videoId: playerData.videoId,
    events: {
      onReady: function(event) {
        player.seekTo(playerData.memo[playerData.videoId]);
      },
      onStateChange: function(event) {
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
    }
  });

  playerData.playerIframe = player.getIframe();
}

export default {
  create: () => (new VideoPlayer())
}
