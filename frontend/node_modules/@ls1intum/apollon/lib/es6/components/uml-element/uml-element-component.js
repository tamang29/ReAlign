import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { UMLElements } from '../../packages/uml-elements';
import { UMLRelationshipType } from '../../packages/uml-relationship-type';
import { UMLRelationships } from '../../packages/uml-relationships';
import { ApollonMode } from '../../services/editor/editor-types';
import { assessable } from './assessable/assessable';
import { CanvasElement } from './canvas-element';
import { CanvasRelationship } from './canvas-relationship';
import { connectable } from './connectable/connectable';
import { droppable } from './droppable/droppable';
import { hoverable } from './hoverable/hoverable';
import { interactable } from './interactable/interactable';
import { movable } from './movable/movable';
import { reconnectable } from './reconnectable/reconnectable';
import { resizable } from './resizable/resizable';
import { selectable } from './selectable/selectable';
import { updatable } from './updatable/updatable';
const enhance = connect((state, props) => ({
    features: state.editor.features,
    type: state.elements[props.id].type,
    readonly: state.editor.readonly,
    view: state.editor.view,
    mode: state.editor.mode,
}));
const getInitialState = (props) => {
    const features = { ...UMLElements, ...UMLRelationships }[props.type].features;
    const component = props.type in UMLRelationshipType ? CanvasRelationship : CanvasElement;
    const decorators = [];
    if (props.mode === ApollonMode.Assessment) {
        decorators.push(assessable, updatable, selectable, hoverable);
    }
    else if (props.readonly) {
        decorators.push(selectable, hoverable);
    }
    else if (props.view === "Exporting" /* ApollonView.Exporting */ || props.view === "Highlight" /* ApollonView.Highlight */) {
        decorators.push(interactable, hoverable);
    }
    else if (props.view === "Modelling" /* ApollonView.Modelling */) {
        if (props.features.hoverable && features.hoverable) {
            decorators.push(hoverable);
        }
        if (features.reconnectable) {
            decorators.push(reconnectable);
        }
        if (props.features.selectable && features.selectable) {
            decorators.push(selectable);
        }
        if (props.features.movable && features.movable) {
            decorators.push(movable);
        }
        if (props.features.resizable && features.resizable) {
            const options = {
                preventY: features.resizable === 'WIDTH',
                preventX: features.resizable === 'HEIGHT',
            };
            decorators.push(resizable(options));
        }
        if (props.features.connectable && features.connectable) {
            decorators.push(connectable);
        }
        if (props.features.updatable && features.updatable) {
            decorators.push(updatable);
        }
        if (props.features.droppable && features.droppable) {
            decorators.push(droppable);
        }
    }
    // reverse, because compose creates one function by composing the given functions from right to left
    return {
        component: compose(...decorators.reverse())(component),
    };
};
class UMLElementComponentC extends Component {
    constructor() {
        super(...arguments);
        this.state = getInitialState(this.props);
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState(getInitialState(this.props));
        }
    }
    render() {
        const { component: ElementComponent } = this.state;
        return React.createElement(ElementComponent, { id: this.props.id, child: UMLElementComponent });
    }
}
export const UMLElementComponent = enhance(UMLElementComponentC);
//# sourceMappingURL=uml-element-component.js.map