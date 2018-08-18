import _ from 'lodash';
import View from './View';

import templateEngine from '../templates/index';

function validator(data, title) {
  if (!data) {
    throw new Error(`${title}가 존재하지 않습니다.`);
  }
}

function Component(options) {
  var that = this;

  this._events = options.events;

  Object.defineProperties(this, {
    view: {
      value: new View({
        template: templateEngine.get(options.templateName),
        model: options.data,
        element: null
      }),
      enumerable: false,
      writable: false
    }
  });

  if (options.data) {
    for (var prop in options.data) {
      if (options.data.hasOwnProperty(prop)) {
        (function(p) {
          Object.defineProperty(that, p, {
            set: function(val) {
              options.data[p] = val;
              that.view.updateContext(options.data);
              if (this.target) {
                that.view.render();
                that.resetEvents();
              }
            },
            get: function() {
              return options.data[p];
            }
          });
        })(prop);
      }
    }
  }
}

Component.prototype.resetEvents = function() {
  if (this._events) {
    for (var ev in this._events) {
      if (this._events.hasOwnProperty(ev)) {
        if (typeof this._events[ev] === 'function') {
          this.view.registerEvent(ev, this._events[ev]);
        } else {
          this.view.registerEvent(ev, this._events[ev].handler, this._events[ev].selector);
        }
      }
    }
  }
};

Component.prototype.find = function(selector) {
  validator(this.view, '해당 view');
  return this.view.find(selector);
};

Component.prototype.findAll = function(selector) {
  validator(this.view, '해당 view');
  return this.view.findAll(selector);
};

Component.prototype.render = function() {
  validator(this.view, '해당 view');
  var el = this.view.render();
  this.resetEvents();
  return el;
};

Component.prototype.destroy = function() {
  validator(this.view, '해당 view');
  this.view.destroy();
};

Component.prototype.setTarget = function(targetElement) {
  validator(this.view, '해당 view');
  this.target = this.view.setElement(targetElement);
  return this;
};

export default Component;
