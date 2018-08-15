import domify from 'domify';
import _ from 'lodash';

var elementId = 0;

function View({ template, model, element }) {
  this.template = _.template(template);
  this.context = model;
  this.element = element;
  this.elementId = null;
}

View.prototype.updateContext = function(context) {
  _.assign(this.context, context);
};

View.prototype.registerEvent = function(eventName, cb, selector) {
  const el = this.element;
  let targets = [ el ];

  if (selector) {
    targets = el.querySelectorAll(selector);
  }

  if (!targets) {
    throw new Error('[View.registerEvent] 이벤트를 등록할 엘레먼트를 찾지 못했습니다.');
  }

  targets.forEach(function(targetEl) {
    targetEl.addEventListener(eventName, cb);
  });
};

View.prototype.find = function(selector) {
  return this.element.querySelector(selector);
};

View.prototype.findAll = function(selector) {
  return this.element.querySelectorAll(selector);
};

View.prototype.render = function() {
  if (!(this.element instanceof Element)) {
    throw new Error('[렌더링 오류] target 이 필요합니다.');
  }

  if (this.elementId === null) {
    this.elementId = elementId;
    elementId++;
  }

  this.element.appendChild(domify(this.template(this.context)));

  return this.element;
};

View.prototype.destroy = function() {
  if (!this.element) {
    throw new Error('[View.destroy] 지우고자 하는 엘레먼트가 존재하지 않습니다.');
  }

  this.element.remove();
};

View.prototype.setElement = function(element) {
  return this.element = element;
};

export default View;
