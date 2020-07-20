# solid-say-editor

Say-editor plugin that adds a connection to Solid. Currently the user is able to import his/her Solid profile in the editor. It is also possible to edit your profile in-editor and send the data back to your Solid pod. Additionally, this plugin features the option to insert links to documents on your Solid pod.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd solid-say-editor`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

## How to use this plugin

### Editor commands
This plugin enables various commands in the say-editor. When having typed-in the command, a hint-card will pop-up.

* `solid:login` this shows a hint-card providing the possibility to login to your Solid account.
* `solid:me` this shows a hint-card allowing you to import data from your profile-document. You can select which triples you want to insert.
* `solid:files` this shows a file-tree containing all your solid files and folders. Using this, you can insert a rdf:seeAlso link from your document to any file in your Solid pod.

### Editing data
It is possible to edit the objects of the triples in the editor itself. Right now it is only possible to edit literal values. When changes are made in the triples, a card will show up, prompting you to persist the changed values to your Solid pod. Right now it is only possible to edit triples, not delete or add them.

## Upcoming features
* Importing and editing all types of documents in the editor, not only the profile document.
* The possibility to add and remove triples to documents. When adding a property to a subject in a document, the user will be presented where he/she can select the predicate and if the object is a literal value (and which type) or if it is a uri of a resource.

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
