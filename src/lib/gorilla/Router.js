function Router(config) {
  if (!config.path) {
    throw new Error('[Router.prototype.validateRoute] 경로 설정이 필요합니다.');
  }

  this.name = config.name || '';
  this.path = config.path;
  this.on = config.on;
  this.prevContext = null;
  this.next = [];

  if (config.next && Array.isArray(config.next)) {
    config.next.forEach(nextConfig => {
      let router = new Router(nextConfig);
      router.prev = this;
      this.next.push(router);
    });
  }
}

Router.prototype.find = function(routeName) {
  for (let i = 0; i < this.next.length; i++) {
    if (this.next[i].name === routeName) {
      return this.next[i];
    }
  }
};

Router.prototype.forward = function(routeArray, context, doNotStoreHistory) {
  if (routeArray) {
    routeArray.unshift(this.name);
  } else {
    routeArray = [ this.name ];
  }
  context = context || {};

  let path = '#';
  let router = this;

  routeArray.forEach((routeName, index) => {
    router = index === 0 ? router : router.find(routeName);

    if (router.on && typeof router.on === 'function') {
      context[routeName] = context[routeName] || {};
      let prevContext = router.on(context[routeName], router.prevContext);
      if (router.next) {
        router.next.forEach(next => {
          next.prevContext = prevContext;
        });
      }
    }

    if (typeof router.path === 'function') {
      path += router.path(context[routeName]);
    } else {
      path += router.path;
    }
  });

  if (!doNotStoreHistory) {
    window.history.pushState({
      router: routeArray
    }, routeArray[routeArray.length - 1], path);
  }

  return router;
};

export default Router;
