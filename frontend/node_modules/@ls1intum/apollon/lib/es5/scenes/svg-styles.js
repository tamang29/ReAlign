"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = void 0;
var styles_1 = require("../components/theme/styles");
exports.Style = (0, styles_1.css)(function (props) { return "\n  text {\n    fill: ".concat(props.theme.font.color, ";\n    font-family: ").concat(props.theme.font.family, ";\n    font-size: ").concat(props.theme.font.size, "px;\n  }\n\n  marker, text {\n    fill-opacity: 1;\n  }\n\n  * {\n    overflow: visible;\n  }\n"); });
//# sourceMappingURL=svg-styles.js.map