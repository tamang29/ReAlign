"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledDropdownItem = exports.StyledDropdown = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("../../theme/styles");
var button_1 = require("../button/button");
exports.StyledDropdown = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])));
exports.StyledDropdownItem = (0, styles_1.styled)(button_1.Button).attrs({
    block: true,
    color: 'link',
})(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  padding-right: 1.5em;\n  padding-left: 1.5em;\n  text-align: left;\n\n  :hover {\n    text-decoration: none;\n    background-color: ", ";\n  }\n"], ["\n  color: ", ";\n  padding-right: 1.5em;\n  padding-left: 1.5em;\n  text-align: left;\n\n  :hover {\n    text-decoration: none;\n    background-color: ", ";\n  }\n"])), function (props) { return props.theme.font.color; }, function (props) { return props.theme.color.gray; });
var templateObject_1, templateObject_2;
//# sourceMappingURL=dropdown-styles.js.map