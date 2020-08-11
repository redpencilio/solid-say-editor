import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  activate(){
    this.transitionTo("editor/new-document");
  }
}
