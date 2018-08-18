import Component from "../../lib/Component";

class SearchedVideos extends Component {
  constructor(options) {
    options = options || {};
    options.templateName = 'searchedVideos';
    super(options);
  }
}

export default {
  create: () => (new SearchedVideos({
    data: {
      searchText: null,
      categoryId: null
    }
  }))
}