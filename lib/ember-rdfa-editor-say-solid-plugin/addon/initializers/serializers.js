import RDFaSerializer, { RDFA_SERIALIZER } from '../utils/serializers/rdfa-serializer';


export function initialize(application) {
  application.register(RDFA_SERIALIZER, RDFaSerializer); 
}

export default {
  before:"block-handler",
  initialize
};
