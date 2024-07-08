import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Components } from '../../packages/components';
import { UMLContainer } from '../../services/uml-container/uml-container';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { withTheme } from '../theme/styles';
const STROKE = 5;
const enhance = compose(withTheme, connect((state, props) => ({
    hovered: state.hovered[0] === props.id,
    selected: state.selected.includes(props.id),
    remoteSelectors: state.remoteSelection[props.id] || [],
    moving: state.moving.includes(props.id),
    interactive: state.interactive.includes(props.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
    element: state.elements[props.id],
    zoomFactor: state.editor.zoomFactor,
    selectionBoxActive: state.editor.selectionBoxActive,
}), {}));
class CanvasElementComponent extends Component {
    render() {
        const { hovered, selected, remoteSelectors, moving, interactive, interactable, element, child: ChildComponent, children, theme, zoomFactor: _zoomFactor, selectionBoxActive: _selectionBoxActive, ...props } = this.props;
        let elements = null;
        if (UMLContainer.isUMLContainer(element) && ChildComponent) {
            elements = element.ownedElements.map((id) => React.createElement(ChildComponent, { key: id, id: id }));
        }
        const ElementComponent = Components[element.type];
        const highlight = interactable && interactive
            ? theme.interactive.normal
            : interactable && hovered
                ? theme.interactive.hovered
                : element.highlight
                    ? element.highlight
                    : element.fillColor
                        ? element.fillColor
                        : theme.color.background;
        return (React.createElement("svg", { ...props, ...element.bounds, pointerEvents: moving ? 'none' : undefined, fillOpacity: moving ? 0.7 : undefined, fill: highlight },
            React.createElement(ElementComponent, { fillColor: highlight, element: UMLElementRepository.get(element) }, elements),
            children,
            !interactable && (hovered || selected) && (React.createElement("rect", { x: -STROKE / 2, y: -STROKE / 2, width: element.bounds.width + STROKE, height: element.bounds.height + STROKE, fill: "none", stroke: "#0064ff", strokeOpacity: "0.2", strokeWidth: STROKE, pointerEvents: "none" })),
            remoteSelectors.length > 0 && (React.createElement("g", null, remoteSelectors.map((selectedBy, index) => {
                const indicatorPosition = 'translate(' + (element.bounds.width + STROKE) + ' ' + index * 32 + ')';
                return (React.createElement("g", { key: selectedBy.name + '_' + selectedBy.color, id: selectedBy.name + '_' + selectedBy.color },
                    React.createElement("rect", { x: -STROKE / 2, y: -STROKE / 2, width: element.bounds.width + STROKE, height: element.bounds.height + STROKE, fill: "none", stroke: selectedBy.color, strokeOpacity: "0.2", strokeWidth: STROKE, pointerEvents: "none" }),
                    React.createElement("g", { transform: indicatorPosition, pointerEvents: "none" },
                        React.createElement("rect", { fillOpacity: "0.2", rx: "10", x: "-40", y: "-20", width: "85px", height: "30px", fill: selectedBy.color }),
                        React.createElement("text", null,
                            React.createElement("tspan", { textAnchor: "middle" }, selectedBy.name.length < 8 ? selectedBy.name : selectedBy.name.substring(0, 6) + '..')))));
            })))));
    }
}
export const CanvasElement = enhance(CanvasElementComponent);
//# sourceMappingURL=canvas-element.js.map