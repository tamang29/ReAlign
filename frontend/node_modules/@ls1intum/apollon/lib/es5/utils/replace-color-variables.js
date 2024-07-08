"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceColorVariables = void 0;
var colorVariableRegex = /var\(--apollon-[\S]+, #[0-9a-fA-F]+\)/g;
var colorRegex = /#[0-9a-fA-F]+/;
var replaceColorVariables = function (innerHTML) {
    var variablesToReplace = innerHTML.match(colorVariableRegex);
    var matchesAndColors = variablesToReplace === null || variablesToReplace === void 0 ? void 0 : variablesToReplace.map(function (match) {
        return {
            match: match,
            color: match.match(colorRegex),
        };
    });
    matchesAndColors === null || matchesAndColors === void 0 ? void 0 : matchesAndColors.forEach(function (element) {
        innerHTML = innerHTML.replace(element.match, element.color ? element.color[0] : '');
    });
    return innerHTML;
};
exports.replaceColorVariables = replaceColorVariables;
//# sourceMappingURL=replace-color-variables.js.map