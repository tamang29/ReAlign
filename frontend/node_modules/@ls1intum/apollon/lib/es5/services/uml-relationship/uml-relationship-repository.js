"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLRelationshipRepository = void 0;
var tslib_1 = require("tslib");
var reconnectable_repository_1 = require("./reconnectable/reconnectable-repository");
var uml_relationship_common_repository_1 = require("./uml-relationship-common-repository");
exports.UMLRelationshipRepository = tslib_1.__assign(tslib_1.__assign({}, uml_relationship_common_repository_1.UMLRelationshipCommonRepository), reconnectable_repository_1.Reconnectable);
//# sourceMappingURL=uml-relationship-repository.js.map