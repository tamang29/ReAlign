"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationLinkMessage = void 0;
var tslib_1 = require("tslib");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var index_1 = require("../index");
var CommunicationLinkMessage = /** @class */ (function (_super) {
    tslib_1.__extends(CommunicationLinkMessage, _super);
    function CommunicationLinkMessage(values) {
        var _this = _super.call(this, values) || this;
        _this.type = index_1.CommunicationElementType.CommunicationLinkMessage;
        _this.direction = (values === null || values === void 0 ? void 0 : values.direction) || 'target';
        return _this;
    }
    /**
     * Needs to be implemented, because it is a abstract method of {@link UMLElement}
     * Does not do anything -> CommunicationLinkMessage is aligned in parent {@link UMLCommunicationLink}
     * @param canvas
     */
    CommunicationLinkMessage.prototype.render = function (canvas) {
        return [this];
    };
    return CommunicationLinkMessage;
}(uml_element_1.UMLElement));
exports.CommunicationLinkMessage = CommunicationLinkMessage;
//# sourceMappingURL=uml-communiction-link-message.js.map