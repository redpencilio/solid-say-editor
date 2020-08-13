import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';


export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('editor/new-document');
  docsRoute(this, function () {
    this.route('user-guide'),
      this.route('command-reference')
  })
});
