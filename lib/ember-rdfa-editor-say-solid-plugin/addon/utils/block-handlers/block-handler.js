import normalizeLocation from "../../utils/normalize-location";
import EmberObject from '@ember/object';

export default class SolidBlockHandler extends EmberObject{

    

    get scope() {
        return undefined;
    }

    get card() {
        return undefined;
    }

    

    handleClose(info, html){
        info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, this.scope);
        const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
        const selection = info.editor.selectHighlight( mappedLocation );
        info.editor.update( selection, {
            set: { innerHTML: html }
        });
    }
}