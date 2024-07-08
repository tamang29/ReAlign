"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UmlCommunicationLinkTextComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var UmlCommunicationLinkTextComponent = function (_a) {
    var x = _a.x, y = _a.y, fill = _a.fill, _b = _a.textCentered, textCentered = _b === void 0 ? false : _b, messages = _a.messages, directionIcon = _a.directionIcon;
    var tspanProps = textCentered ? { textAnchor: 'middle' } : {};
    return (react_1.default.createElement(text_1.Text, { x: x, y: y, fontSize: "85%", textAnchor: "start", dominantBaseline: "auto", fontWeight: "normal", fill: fill },
        react_1.default.createElement("tspan", tslib_1.__assign({ fontWeight: "bold", fontSize: "120%" }, tspanProps), messages.length ? directionIcon : ''),
        messages.map(function (message, i) { return (react_1.default.createElement("tspan", { key: i, x: message.bounds.x, y: message.bounds.y }, message.name)); })));
};
exports.UmlCommunicationLinkTextComponent = UmlCommunicationLinkTextComponent;
//# sourceMappingURL=uml-communication-link-text-component.js.map