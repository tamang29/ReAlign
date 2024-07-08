"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLElementRepository = void 0;
var tslib_1 = require("tslib");
var connectable_repository_1 = require("./connectable/connectable-repository");
var hoverable_repository_1 = require("./hoverable/hoverable-repository");
var interactable_repository_1 = require("./interactable/interactable-repository");
var movable_repository_1 = require("./movable/movable-repository");
var resizable_repository_1 = require("./resizable/resizable-repository");
var selectable_repository_1 = require("./selectable/selectable-repository");
var remote_selection_repository_1 = require("./remote-selectable/remote-selection-repository");
var uml_element_common_repository_1 = require("./uml-element-common-repository");
var updatable_repository_1 = require("./updatable/updatable-repository");
exports.UMLElementRepository = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, uml_element_common_repository_1.UMLElementCommonRepository), hoverable_repository_1.Hoverable), selectable_repository_1.Selectable), remote_selection_repository_1.RemoteSelectable), movable_repository_1.Movable), resizable_repository_1.Resizable), connectable_repository_1.Connectable), interactable_repository_1.Interactable), updatable_repository_1.Updatable);
//# sourceMappingURL=uml-element-repository.js.map