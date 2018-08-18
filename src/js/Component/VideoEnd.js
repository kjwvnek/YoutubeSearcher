import Component from "../../lib/Component";

class VideoEnd extends Component {
  constructor(options) {
    options = options || {};
    options.templateName = 'videoEnd';
    super(options);
  }
}

export default {
  create: () => (new VideoEnd({
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
  }))
}