import Component from "../../lib/Component";
import router from "../Router/index";
import { delegateEvent } from "../Util/index";

class VideoList extends Component {
  constructor(options) {
    options = options || {};
    options.templateName = 'videoList';
    super(options);
  }
}

export default {
  create: () => (new VideoList({
    data: {
      videos: null
    },
    events: {
      click: function onClikcVideoList(e) {
        delegateEvent('.video-item', e, function(e) {
          let videoId = e.referee.dataset.videoId;

          router.forward(['video'], {
            video: {
              videoId: videoId
            }
          });
        });
      }
    }
  }))
};
