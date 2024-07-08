"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ghost = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("../theme/styles");
exports.Ghost = styles_1.styled.div.attrs(function (_a) {
    var position = _a.position;
    return ({
        style: { transform: "translate(".concat(position.x, "px, ").concat(position.y, "px)") },
    });
})(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  will-change: transform;\n  pointer-events: none;\n  margin: -5px;\n  font-family: ", ", sans-serif;\n  font-size: ", "px;\n\n  svg {\n    fill-opacity: 0.7;\n  }\n  text {\n    fill: black;\n    fill-opacity: 0.7;\n  }\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  will-change: transform;\n  pointer-events: none;\n  margin: -5px;\n  font-family: ", ", sans-serif;\n  font-size: ", "px;\n\n  svg {\n    fill-opacity: 0.7;\n  }\n  text {\n    fill: black;\n    fill-opacity: 0.7;\n  }\n"])), function (props) { return props.theme.font.family; }, function (props) { return props.theme.font.size; });
var templateObject_1;
//# sourceMappingURL=ghost.js.map