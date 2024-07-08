"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Svg = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var styles_1 = require("../components/theme/styles");
var components_1 = require("../packages/components");
var uml_elements_1 = require("../packages/uml-elements");
var uml_relationships_1 = require("../packages/uml-relationships");
var uml_container_1 = require("../services/uml-container/uml-container");
var uml_relationship_1 = require("../services/uml-relationship/uml-relationship");
var boundary_1 = require("../utils/geometry/boundary");
var point_1 = require("../utils/geometry/point");
var update_1 = require("../utils/update");
var svg_styles_1 = require("./svg-styles");
var model_store_1 = require("../components/store/model-store");
var model_state_1 = require("../components/store/model-state");
var styled_components_1 = require("styled-components");
var uml_classifier_component_1 = require("../packages/common/uml-classifier/uml-classifier-component");
var uml_classifier_member_component_1 = require("../packages/common/uml-classifier/uml-classifier-member-component");
var includeChildren = function (elements, ids, include) {
    var e_1, _a;
    var result = new Set();
    try {
        for (var ids_1 = tslib_1.__values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
            var id = ids_1_1.value;
            var element = elements[id];
            if (!element)
                continue;
            var children = new Set(uml_container_1.UMLContainer.isUMLContainer(element) ? element.ownedElements : []);
            if (include.has(id)) {
                result.add(id);
                include = new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(include), false), tslib_1.__read(children), false));
            }
            includeChildren(elements, children, include).forEach(result.add, result);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
};
var excludeChildren = function (elements, ids, exclude) {
    var e_2, _a;
    var result = new Set();
    try {
        for (var ids_2 = tslib_1.__values(ids), ids_2_1 = ids_2.next(); !ids_2_1.done; ids_2_1 = ids_2.next()) {
            var id = ids_2_1.value;
            var element = elements[id];
            if (!element)
                continue;
            var children = new Set(uml_container_1.UMLContainer.isUMLContainer(element) ? element.ownedElements : []);
            if (!exclude.has(id)) {
                result.add(id);
            }
            else {
                exclude = new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(exclude), false), tslib_1.__read(children), false));
            }
            excludeChildren(elements, children, exclude).forEach(result.add, result);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (ids_2_1 && !ids_2_1.done && (_a = ids_2.return)) _a.call(ids_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return result;
};
var getInitialState = function (_a) {
    var model = _a.model, options = _a.options;
    var layer = {
        layer: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
        origin: function () { return new point_1.Point(); },
    };
    var apollonElements = model.elements;
    var apollonRelationships = model.relationships;
    var deserialize = function (apollonElement) {
        var element = new uml_elements_1.UMLElements[apollonElement.type]();
        var apollonChildren = uml_container_1.UMLContainer.isUMLContainer(element)
            ? Object.values(apollonElements).filter(function (child) { return child.owner === apollonElement.id; })
            : [];
        element.deserialize(apollonElement, apollonChildren);
        var children = apollonChildren.reduce(function (acc, val) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(acc), false), tslib_1.__read(deserialize(val)), false); }, []);
        var _a = tslib_1.__read(element.render(layer, children, true)), root = _a[0], updates = _a.slice(1);
        updates.map(function (x) {
            var original = apollonChildren.find(function (y) { return y.id === x.id; });
            if (!original) {
                return x;
            }
            x.bounds.x = original.bounds.x;
            x.bounds.y = original.bounds.y;
            return x;
        });
        return tslib_1.__spreadArray([root], tslib_1.__read(updates), false);
    };
    var elements = Object.values(apollonElements)
        .filter(function (element) { return !element.owner; })
        .reduce(function (acc, val) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(acc), false), tslib_1.__read(deserialize(val)), false); }, []);
    var relationships = Object.values(apollonRelationships).map(function (apollonRelationship) {
        var relationship = new uml_relationships_1.UMLRelationships[apollonRelationship.type]();
        relationship.deserialize(apollonRelationship);
        return relationship;
    });
    var elementState = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(elements), false), tslib_1.__read(relationships), false).reduce(function (acc, val) {
        var _a;
        return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val.id] = val, _a)));
    }, {});
    var roots = Object.values(elementState).filter(function (element) { return !element.owner; });
    var layout = new Set(Object.values(elementState).map(function (x) { return x.id; }));
    if (options && options.include) {
        layout = includeChildren(elementState, new Set(roots.map(function (element) { return element.id; })), new Set(options.include));
    }
    if (options && options.exclude) {
        layout = excludeChildren(elementState, new Set(roots.map(function (element) { return element.id; })), new Set(options.exclude));
    }
    var keepOriginalSize = (options && options.keepOriginalSize) || false;
    var bounds = (0, boundary_1.computeBoundingBoxForElements)(Object.values(elementState).filter(function (element) { return keepOriginalSize || layout.has(element.id); }));
    var margin = getMargin(options === null || options === void 0 ? void 0 : options.margin);
    bounds.x -= margin.left;
    bounds.y -= margin.top;
    bounds.width += margin.left + margin.right;
    bounds.height += margin.top + margin.bottom;
    var state = Object.values(elementState)
        .filter(function (element) { return layout.has(element.id); })
        .map(function (element) {
        element.bounds.x -= bounds.x;
        element.bounds.y -= bounds.y;
        return element;
    });
    return {
        elements: state,
        bounds: bounds,
    };
};
var getMargin = function (margin) {
    if (margin === void 0) { margin = 15; }
    if (typeof margin === 'number') {
        return { top: margin, right: margin, bottom: margin, left: margin };
    }
    var result = { top: 0, right: 0, bottom: 0, left: 0 };
    return Object.assign(result, margin);
};
var Svg = /** @class */ (function (_super) {
    tslib_1.__extends(Svg, _super);
    function Svg() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState(_this.props);
        return _this;
    }
    Svg.prototype.render = function () {
        var _a = this.state, bounds = _a.bounds, elements = _a.elements;
        var theme = (0, update_1.update)((0, styles_1.defaults)(), this.props.styles || {});
        // connect exported svg to redux state, so that connected components can retrieve properties from state
        var state = model_state_1.ModelState.fromModel(this.props.model);
        var translationFactor = function () {
            var e_3, _a, e_4, _b;
            var minX = 0;
            var minY = 0;
            try {
                for (var elements_1 = tslib_1.__values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                    var element = elements_1_1.value;
                    if (uml_relationship_1.UMLRelationship.isUMLRelationship(element)) {
                        try {
                            for (var _c = (e_4 = void 0, tslib_1.__values(element.path)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var p = _d.value;
                                if (p.x < minX)
                                    minX = p.x + element.bounds.x - 15;
                                if (p.y < minY)
                                    minY = p.y + element.bounds.y - 15;
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return { minX: Math.min(minX, 0), minY: Math.min(minY, 0) };
        };
        var svgElementDetails = function (element, x, y) {
            return {
                x: x,
                y: y,
                width: element.bounds.width,
                height: element.bounds.height,
                className: element.name ? element.name.replace(/[<>]/g, '') : '',
                fill: element.fillColor || theme.color.background,
            };
        };
        var tfact = translationFactor();
        return (react_1.default.createElement(model_store_1.StoreProvider, { initialState: state },
            react_1.default.createElement(styled_components_1.ThemeProvider, { theme: theme },
                react_1.default.createElement("svg", { width: bounds.width - tfact.minX + 1, height: bounds.height - tfact.minY + 1, xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", fill: theme.color.background },
                    react_1.default.createElement("defs", null,
                        react_1.default.createElement("style", null, svg_styles_1.Style[0]({ theme: theme }))),
                    elements.map(function (element, index) {
                        var ElementComponent = components_1.Components[element.type];
                        switch (ElementComponent) {
                            case uml_classifier_component_1.UMLClassifierComponent:
                                // If the ElementComponent is of type UMLClassifierComponent, create an array of all members (attributes and methods) for that component.
                                // Unlike other components, the UMLClassifierComponent needs its members to be children within the component to avoid border rendering issues.
                                var members = elements.filter(function (member) { return member.owner === element.id; });
                                return (react_1.default.createElement("svg", tslib_1.__assign({ key: element.id }, svgElementDetails(element, element.bounds.x - tfact.minX, element.bounds.y - tfact.minY)),
                                    react_1.default.createElement(ElementComponent, { key: index, element: element }, members.map(function (memberElement, memberIndex) {
                                        // Nest the members within the UMLClassifierComponent so the border rectangle and path get rendered afterward.
                                        var MemberElementComponent = components_1.Components[memberElement.type];
                                        return (react_1.default.createElement("svg", tslib_1.__assign({ key: memberElement.id }, svgElementDetails(memberElement, 0, memberElement.bounds.y - element.bounds.y)),
                                            react_1.default.createElement(MemberElementComponent, { key: memberIndex, element: memberElement })));
                                    }))));
                            case uml_classifier_member_component_1.UMLClassifierMemberComponent:
                                // If the ElementComponent is of type UMLClassifierMemberComponent, we break out of the switch, as they have been rendered within the UMLClassifierComponent.
                                break;
                            default:
                                // Render all other UMLElements and UMLRelationships normally, as they don't have issues when rendering to SVG.
                                return (react_1.default.createElement("svg", tslib_1.__assign({ key: element.id }, svgElementDetails(element, element.bounds.x - tfact.minX, element.bounds.y - tfact.minY)),
                                    react_1.default.createElement(ElementComponent, { key: index, element: element })));
                        }
                    })))));
    };
    return Svg;
}(react_1.Component));
exports.Svg = Svg;
//# sourceMappingURL=svg.js.map