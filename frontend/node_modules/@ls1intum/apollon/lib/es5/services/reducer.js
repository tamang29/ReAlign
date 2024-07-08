"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducers = void 0;
var assessment_reducer_1 = require("./assessment/assessment-reducer");
var editor_reducer_1 = require("./editor/editor-reducer");
var uml_container_reducer_1 = require("./uml-container/uml-container-reducer");
var uml_diagram_reducer_1 = require("./uml-diagram/uml-diagram-reducer");
var connectable_reducer_1 = require("./uml-element/connectable/connectable-reducer");
var hoverable_reducer_1 = require("./uml-element/hoverable/hoverable-reducer");
var interactable_reducer_1 = require("./uml-element/interactable/interactable-reducer");
var movable_reducer_1 = require("./uml-element/movable/movable-reducer");
var moving_reducer_1 = require("./uml-element/movable/moving-reducer");
var resizable_reducer_1 = require("./uml-element/resizable/resizable-reducer");
var resizing_reducer_1 = require("./uml-element/resizable/resizing-reducer");
var selectable_reducer_1 = require("./uml-element/selectable/selectable-reducer");
var uml_element_reducer_1 = require("./uml-element/uml-element-reducer");
var updatable_reducer_1 = require("./uml-element/updatable/updatable-reducer");
var reconnectable_reducer_1 = require("./uml-relationship/reconnectable/reconnectable-reducer");
var uml_relationship_reducer_1 = require("./uml-relationship/uml-relationship-reducer");
var copy_reducer_1 = require("./copypaste/copy-reducer");
var last_action_reducer_1 = require("./last-action/last-action-reducer");
var remote_selection_reducer_1 = require("./uml-element/remote-selectable/remote-selection-reducer");
var reduce = function (intial) {
    var reducerList = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        reducerList[_i - 1] = arguments[_i];
    }
    return function (state, action) {
        if (state === void 0) { state = intial; }
        return reducerList.reduce(function (newState, reducer) { return reducer(newState, action); }, state);
    };
};
exports.reducers = {
    editor: editor_reducer_1.EditorReducer,
    diagram: uml_diagram_reducer_1.UMLDiagramReducer,
    hovered: hoverable_reducer_1.HoverableReducer,
    selected: selectable_reducer_1.SelectableReducer,
    moving: movable_reducer_1.MovableReducer,
    resizing: resizable_reducer_1.ResizableReducer,
    connecting: connectable_reducer_1.ConnectableReducer,
    reconnecting: reconnectable_reducer_1.ReconnectableReducer,
    interactive: interactable_reducer_1.InteractableReducer,
    updating: updatable_reducer_1.UpdatableReducer,
    copy: copy_reducer_1.CopyReducer,
    lastAction: last_action_reducer_1.LastActionReducer,
    remoteSelection: remote_selection_reducer_1.RemoteSelectionReducer,
    elements: reduce({}, uml_container_reducer_1.UMLContainerReducer, uml_relationship_reducer_1.UMLRelationshipReducer, uml_element_reducer_1.UMLElementReducer, resizing_reducer_1.ResizingReducer, moving_reducer_1.MovingReducer),
    assessments: assessment_reducer_1.AssessmentReducer,
};
//# sourceMappingURL=reducer.js.map