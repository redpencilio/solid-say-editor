import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { addDocfyRoutes } from '@docfy/ember';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('editor/new-document');
  addDocfyRoutes(this);
});
