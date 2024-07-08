"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownButton = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("../../theme/styles");
var button_1 = require("../button/button");
exports.DropdownButton = (0, styles_1.styled)(button_1.Button).attrs({
    block: true,
})(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ::after {\n    border-top: 0.3em solid;\n    border-right: 0.3em solid transparent;\n    border-bottom: 0;\n    border-left: 0.3em solid transparent;\n    content: '';\n    display: inline-block;\n    height: 0;\n    margin-left: 0.255em;\n    vertical-align: 0.255em;\n    width: 0;\n  }\n"], ["\n  ::after {\n    border-top: 0.3em solid;\n    border-right: 0.3em solid transparent;\n    border-bottom: 0;\n    border-left: 0.3em solid transparent;\n    content: '';\n    display: inline-block;\n    height: 0;\n    margin-left: 0.255em;\n    vertical-align: 0.255em;\n    width: 0;\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=dropdown-button.js.map