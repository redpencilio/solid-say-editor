import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';


export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('editor/new-document');
  docsRoute(this, function(){ 
    this.route('user-guide')
  })
});
