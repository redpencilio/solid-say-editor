import Route from '@ember/routing/route';

export default class NewDocumentRoute extends Route {

    model(){
        return `<h1>Solid Say Editor<h1>`;
    }
}
