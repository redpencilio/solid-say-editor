import Route from '@ember/routing/route';

export default class NewDocumentRoute extends Route {

    model(){
        return `<h1>Hello World!<h1>`;
    }
}
