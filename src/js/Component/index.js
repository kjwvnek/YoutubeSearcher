import Component from "../../lib/gorilla/Component";

function App(options) {
  options = options || {};
  options.templateName = 'app';
  Component.call(this, options);
}
App.prototype = Object.create(Component.prototype);
App.prototype.constructor = App;

function Home(options) {
  options = options || {};
  options.templateName = 'home';
  Component.call(this, options);
}
Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

function SearchedVideos(options) {
  options = options || {};
  options.templateName = 'searchedVideos';
  Component.call(this, options);
}
SearchedVideos.prototype = Object.create(Component.prototype);
SearchedVideos.prototype.constructor = SearchedVideos;

function VideoEnd(options) {
  options = options || {};
  options.templateName = 'videoEnd';
  Component.call(this, options);
}
VideoEnd.prototype = Object.create(Component.prototype);
VideoEnd.prototype.constructor = VideoEnd;


export default { App, Home, SearchedVideos, VideoEnd }
