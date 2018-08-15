import router from "../Router";
import Component from "../../lib/gorilla/Component";
import { delegateEvent } from "../Util";

VideoListComponent.prototype = Object.create(Component.prototype);

VideoListComponent.prototype.constructor = VideoListComponent;

function VideoListComponent(options) {
  options = options || {};
  options.templateName = 'videoList';
  options.events = {
    click: e => {
      delegateEvent('.video-item', e, e => {
        let videoId = e.referee.dataset.videoId;

        router.forward(['video'], {
          video: {
            videoId: videoId
          }
        });
      });
    }
  };
  Component.call(this, options);
}

export default VideoListComponent;
