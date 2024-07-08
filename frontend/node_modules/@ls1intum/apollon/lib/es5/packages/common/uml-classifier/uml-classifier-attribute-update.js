"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var button_1 = require("../../../components/controls/button/button");
var color_button_1 = require("../../../components/controls/color-button/color-button");
var trash_1 = require("../../../components/controls/icon/trash");
var textfield_1 = require("../../../components/controls/textfield/textfield");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var Flex = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var UmlAttributeUpdate = function (_a) {
    var id = _a.id, onRefChange = _a.onRefChange, value = _a.value, onChange = _a.onChange, onSubmitKeyUp = _a.onSubmitKeyUp, onDelete = _a.onDelete, element = _a.element;
    var _b = tslib_1.__read((0, react_1.useState)(false), 2), colorOpen = _b[0], setColorOpen = _b[1];
    var toggleColor = function () {
        setColorOpen(!colorOpen);
    };
    var handleNameChange = function (newName) {
        onChange(id, { name: newName });
    };
    var handleDelete = function () {
        onDelete(id)();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Flex, null,
            react_1.default.createElement(textfield_1.Textfield, { ref: onRefChange, gutter: true, value: value, onChange: handleNameChange, onSubmitKeyUp: onSubmitKeyUp }),
            react_1.default.createElement(color_button_1.ColorButton, { onClick: toggleColor }),
            react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: handleDelete },
                react_1.default.createElement(trash_1.TrashIcon, null))),
        react_1.default.createElement(style_pane_1.StylePane, { open: colorOpen, element: element, onColorChange: onChange, fillColor: true, textColor: true })));
};
exports.default = UmlAttributeUpdate;
var templateObject_1;
//# sourceMappingURL=uml-classifier-attribute-update.js.map