"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLPetriNetPlaceComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var uml_petri_net_place_1 = require("./uml-petri-net-place");
var point_1 = require("../../../utils/geometry/point");
var text_1 = require("../../../components/controls/text/text");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var maxAmountCircles = 5;
var tokenToBoundaryDistance = 5;
var tokenToTokenDistance = 2.5;
var calculateTokenRadius = function (amountOfTokens, outerRadius) {
    if (amountOfTokens <= 2) {
        return outerRadius / 2;
    }
    else {
        // only works for 3 - 9 circles !!
        return outerRadius / (1 + 1 / Math.sin(Math.PI / amountOfTokens));
    }
};
var calculatePositions = function (amountOfTokens, outerRadius) {
    var positions = [];
    if (amountOfTokens === 1) {
        positions.push(new point_1.Point(0, 0));
    }
    else {
        var degreeFraction = (2 * Math.PI) / amountOfTokens;
        var tokenRadius = calculateTokenRadius(maxAmountCircles, outerRadius);
        var tokenCenterCircleRadius = outerRadius + (tokenToTokenDistance * amountOfTokens) / maxAmountCircles - tokenRadius;
        for (var i = 0; i < amountOfTokens; i++) {
            var degree = i * degreeFraction + (1 / 2) * Math.PI;
            positions.push(new point_1.Point(Math.cos(degree) * tokenCenterCircleRadius, Math.sin(degree) * tokenCenterCircleRadius));
        }
    }
    return positions;
};
var UMLPetriNetPlaceComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    // radius of the outer circle
    var radius = Math.min(element.bounds.width, element.bounds.height) / 2;
    var displayTokenAsNumber = element.amountOfTokens > 0 && element.amountOfTokens > maxAmountCircles;
    var displayCapacity = element.capacity !== uml_petri_net_place_1.UMLPetriNetPlace.defaultCapacity;
    // positions of tokens in UI
    var tokenPositions = [];
    var tokenRadius;
    // calculate token props
    if (element.amountOfTokens > 0) {
        if (!displayTokenAsNumber) {
            var radiusWithPadding = radius - tokenToBoundaryDistance;
            tokenPositions = calculatePositions(element.amountOfTokens, radiusWithPadding);
            tokenRadius = calculateTokenRadius(maxAmountCircles, radiusWithPadding);
        }
    }
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: "50%", cy: "50%", r: radius, strokeColor: element.strokeColor, strokeWidth: 1, fillColor: fillColor || element.fillColor, fillOpacity: 1 }),
        !displayTokenAsNumber &&
            tokenPositions.map(function (position, index) { return (react_1.default.createElement(themedComponents_1.ThemedCircleContrast, { key: index, cx: radius + position.x, cy: radius + position.y, r: tokenRadius, strokeColor: "none", fillColor: element.strokeColor, fillOpacity: 1 })); }),
        displayTokenAsNumber && react_1.default.createElement(text_1.Text, { fill: element.strokeColor }, element.amountOfTokens),
        displayCapacity && (react_1.default.createElement("text", { x: "95%", y: 5, pointerEvents: "none", style: element.textColor ? { fill: element.textColor } : {} },
            "C=",
            element.capacity)),
        react_1.default.createElement(text_1.Text, { fill: element.textColor, y: element.bounds.height + 15 }, element.name)));
};
exports.UMLPetriNetPlaceComponent = UMLPetriNetPlaceComponent;
//# sourceMappingURL=uml-petri-net-place-component.js.map