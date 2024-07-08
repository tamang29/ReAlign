"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLCommunicationLink = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var assign_1 = require("../../../utils/fx/assign");
var uml_communiction_link_message_1 = require("./uml-communiction-link-message");
var boundary_1 = require("../../../utils/geometry/boundary");
var point_1 = require("../../../utils/geometry/point");
var uml_element_port_1 = require("../../../services/uml-element/uml-element-port");
var text_1 = require("../../../utils/svg/text");
var UMLCommunicationLink = /** @class */ (function (_super) {
    tslib_1.__extends(UMLCommunicationLink, _super);
    function UMLCommunicationLink(values) {
        var _this = _super.call(this) || this;
        _this.type = __1.CommunicationRelationshipType.CommunicationLink;
        _this.messages = [];
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLCommunicationLink.prototype.serialize = function () {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { messages: this.messages.reduce(function (acc, message) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[message.id] = message, _a)));
            }, {}) });
    };
    UMLCommunicationLink.prototype.deserialize = function (values, children) {
        var assert = function (v) {
            return v.type === __1.CommunicationRelationshipType.CommunicationLink;
        };
        if (!assert(values)) {
            return;
        }
        _super.prototype.deserialize.call(this, values, children);
        this.messages = Object.values(values.messages).map(function (message) { return new uml_communiction_link_message_1.CommunicationLinkMessage(message); });
    };
    UMLCommunicationLink.prototype.render = function (canvas, source, target) {
        // computes bounds for path only
        _super.prototype.render.call(this, canvas, source, target);
        // only bounds for path - used for calculate the translation
        var pathBounds = this.bounds;
        // compute point of messages
        // maps element.path to Point to get methods
        // element.path contains start and end point + direction change points
        var path = this.path.map(function (point) { return new point_1.Point(point.x, point.y); });
        // half distance of total connection
        var distance = path.reduce(function (length, point, i, points) { return (i + 1 < points.length ? length + points[i + 1].subtract(point).length : length); }, 0) / 2;
        // direction in which the arrow is pointing
        var sourceArrowDirection;
        var messagePosition;
        // finds the connection between two points of path where half distance of total connection is reached
        // and determines the direction of the path there
        for (var index = 0; index < path.length - 1; index++) {
            // distance between two path points
            var vector = path[index + 1].subtract(path[index]);
            if (vector.length > distance) {
                var norm = vector.normalize();
                sourceArrowDirection =
                    Math.abs(norm.x) > Math.abs(norm.y)
                        ? norm.x > 0
                            ? uml_element_port_1.Direction.Left
                            : uml_element_port_1.Direction.Right
                        : norm.y > 0
                            ? uml_element_port_1.Direction.Up
                            : uml_element_port_1.Direction.Down;
                messagePosition = path[index].add(norm.scale(distance));
                break;
            }
            distance -= vector.length;
        }
        if (!sourceArrowDirection || !messagePosition) {
            throw Error("Could not determine direction or messagePosition for CommunicationLink. \n MessagePosition: ".concat(messagePosition, " \n Direction: ").concat(sourceArrowDirection));
        }
        // add this to make the messagePosition absolute and not relative to path origin
        messagePosition = messagePosition.add(pathBounds.x, pathBounds.y);
        // compute position of message
        var sourceElements = this.messages.filter(function (message) { return message.direction === 'source'; });
        var targetElements = this.messages.filter(function (message) { return message.direction === 'target'; });
        var elementsForBoundingBoxCalculation = [{ bounds: pathBounds }];
        if (sourceElements && sourceElements.length > 0) {
            var sourceMessagesBoundingBox = this.computeBoundingBoxForMessages(canvas, messagePosition, sourceElements, sourceArrowDirection);
            elementsForBoundingBoxCalculation.push({ bounds: sourceMessagesBoundingBox });
        }
        // arrow of targets are in the opposite direction
        var targetArrowDirection = (0, uml_element_port_1.getOppositeDirection)(sourceArrowDirection);
        if (targetElements && targetElements.length > 0) {
            var targetMessagesBoundingBox = this.computeBoundingBoxForMessages(canvas, messagePosition, targetElements, targetArrowDirection);
            elementsForBoundingBoxCalculation.push({ bounds: targetMessagesBoundingBox });
        }
        // merge bounding box of path with bounding box of messages
        this.bounds = (0, boundary_1.computeBoundingBoxForElements)(elementsForBoundingBoxCalculation);
        var horizontalTranslation = pathBounds.x - this.bounds.x;
        var verticalTranslation = pathBounds.y - this.bounds.y;
        // translation of path points, because they are relative to their own bounding box
        // the bounding may be different now -> translation to correct this
        this.path.forEach(function (point) {
            point.x += horizontalTranslation;
            point.y += verticalTranslation;
        });
        // depiction in UMLCommunicationLinkComponent is relative to path origin -> subtract pathBounds to make it relative again
        this.messages.forEach(function (message) {
            message.bounds.x += horizontalTranslation - pathBounds.x;
            message.bounds.y += verticalTranslation - pathBounds.y;
        });
        return [this];
    };
    UMLCommunicationLink.prototype.computeBoundingBoxForMessages = function (canvas, messagePosition, messages, arrowDirection) {
        var e_1, _a;
        var arrowSize = text_1.Text.size(canvas, '⟶', { fontWeight: 'bold', fontSize: '120%' });
        var y = arrowDirection === uml_element_port_1.Direction.Left
            ? messagePosition.y - arrowSize.height
            : arrowDirection === uml_element_port_1.Direction.Right
                ? messagePosition.y + text_1.Text.size(canvas, messages[0].name).height + arrowSize.height
                : messagePosition.y;
        var x = arrowDirection === uml_element_port_1.Direction.Up
            ? messagePosition.x + arrowSize.width
            : arrowDirection === uml_element_port_1.Direction.Down
                ? messagePosition.x - arrowSize.width
                : messagePosition.x;
        try {
            for (var messages_1 = tslib_1.__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                var message = messages_1_1.value;
                var messageSize = text_1.Text.size(canvas, message.name);
                if (arrowDirection === uml_element_port_1.Direction.Right) {
                    // ⟵ messages with this displayed arrow
                    // center message
                    message.bounds.x = x - messageSize.width / 2;
                    message.bounds.y = y;
                    message.bounds.width = messageSize.width;
                    message.bounds.height = messageSize.height;
                    y += messageSize.height;
                }
                else if (arrowDirection === uml_element_port_1.Direction.Down) {
                    // ↑ messages with this displayed arrow
                    // drawing from left to right
                    message.bounds.x = x - messageSize.width;
                    message.bounds.y = y;
                    message.bounds.width = messageSize.width;
                    message.bounds.height = messageSize.height;
                    y += messageSize.height;
                }
                else if (arrowDirection === uml_element_port_1.Direction.Up) {
                    // ↓ messages with this displayed arrow
                    message.bounds.x = x;
                    message.bounds.y = y;
                    message.bounds.width = messageSize.width;
                    message.bounds.height = messageSize.height;
                    y += messageSize.height;
                }
                else if (arrowDirection === uml_element_port_1.Direction.Left) {
                    // ⟶ messages with this displayed arrow
                    // center message
                    message.bounds.x = x - messageSize.width / 2;
                    message.bounds.y = y;
                    message.bounds.width = messageSize.width;
                    message.bounds.height = messageSize.height;
                    // drawing from top to bottom
                    y -= messageSize.height;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return (0, boundary_1.computeBoundingBoxForElements)(messages);
    };
    return UMLCommunicationLink;
}(uml_relationship_1.UMLRelationship));
exports.UMLCommunicationLink = UMLCommunicationLink;
//# sourceMappingURL=uml-communication-link.js.map