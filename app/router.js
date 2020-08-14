import config from './config/environment';
import EmberRouter from "@ember/routing/router";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('editor/new-document');
});
