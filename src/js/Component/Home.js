import Component from "../../lib/Component";

class Home extends Component {
  constructor(options) {
    options = options || {};
    options.templateName = 'home';
    super(options);
  }
}

export default {
  create: () => (new Home())
}