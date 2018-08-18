import Component from "../../lib/Component";

class App extends Component {
  constructor(options) {
    options = options || {};
    options.templateName = 'app';
    super(options);
  }
}

export default {
  create: () => (new App())
}