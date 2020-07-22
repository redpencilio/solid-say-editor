import Service from '@ember/service';
import ForkableStore from 'solid-addon/utils/forking-store';
export default class RdfaCommunicatorService extends Service {
    store = null;
    privateTypeIndex = null;
    publicTypeIndex = null;

    constructor(){
        super(...arguments);
        this.store = new ForkableStore();
    }

    fromRDFa(){

    }

    toRDFa(){

    }
}
