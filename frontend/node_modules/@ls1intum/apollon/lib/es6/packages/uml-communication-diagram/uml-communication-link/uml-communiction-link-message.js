import { UMLElement } from '../../../services/uml-element/uml-element';
import { CommunicationElementType } from '../index';
export class CommunicationLinkMessage extends UMLElement {
    constructor(values) {
        super(values);
        this.type = CommunicationElementType.CommunicationLinkMessage;
        this.direction = values?.direction || 'target';
    }
    /**
     * Needs to be implemented, because it is a abstract method of {@link UMLElement}
     * Does not do anything -> CommunicationLinkMessage is aligned in parent {@link UMLCommunicationLink}
     * @param canvas
     */
    render(canvas) {
        return [this];
    }
}
//# sourceMappingURL=uml-communiction-link-message.js.map