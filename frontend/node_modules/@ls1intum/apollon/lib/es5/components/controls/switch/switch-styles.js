"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledSwitchItem = exports.StyledSwitch = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("../../theme/styles");
var button_1 = require("../button/button");
exports.StyledSwitch = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  min-height: 1.9rem;\n"], ["\n  display: flex;\n  min-height: 1.9rem;\n"])));
exports.StyledSwitchItem = (0, styles_1.styled)(button_1.Button).attrs(function (props) { return ({
    outline: !props.selected,
}); })(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  flex: 1 1 auto;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  :not(:first-child) {\n    margin-left: -1px;\n  }\n\n  :first-child {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n  :last-child {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  :not(:first-child):not(:last-child) {\n    border-radius: 0;\n  }\n"], ["\n  flex: 1 1 auto;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  :not(:first-child) {\n    margin-left: -1px;\n  }\n\n  :first-child {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n  :last-child {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  :not(:first-child):not(:last-child) {\n    border-radius: 0;\n  }\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=switch-styles.js.map