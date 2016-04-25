export class Route {
  constructor(path, handler) {
    this.path = path;
    this.handler = handler;
  }

  toUrl(data) {
    if (!data) {
      return this.path;
    }

    const RE_NAMED_PARAM = /:([a-z0-1_]+)/ig;
    const namedParams = this.path.match(RE_NAMED_PARAM)
                          .map(param => param.substring(1));
    const replaceWith = namedParams.map(param => data[param]);

    return this.path.replace.apply(this.path, [].concat(RE_NAMED_PARAM, replaceWith));
  }
}

export class RouteDict {
  constructor() {
    this.routes = [];
    this.routeIndices = {};
  }

  add(name, route) {
    const length = this.routes.push(route);
    this.routeIndices[name] = length - 1;
  }

  get(name) {
    return this.routes[this.routeIndices[name]];
  }

  toArray() {
    return this.routes.map(route => [route.path, route.handler]);
  }

  getUrl(name, data) {
    return this.get(name).toUrl(data);
  }
}