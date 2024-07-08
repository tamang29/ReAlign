import React from 'react';
import { ThemedPath, ThemedRect } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
import { withTheme } from '../../../components/theme/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
const enhance = compose(withTheme, connect((state, props) => ({
    hovered: state.hovered.includes(props.element.id),
    interactive: state.interactive.includes(props.element.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
})));
export const BPMNAnnotationC = ({ element, strokeColor, textColor, interactive, interactable, hovered, theme, }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { rx: 10, ry: 10, width: element.bounds.width, height: element.bounds.height, strokeColor: "transparent", fillColor: interactable && interactive
            ? theme.interactive.normal
            : interactable && hovered
                ? theme.interactive.hovered
                : 'transparent' }),
    React.createElement(ThemedPath, { d: `M20,0 L10,0 A 10 10 280 0 0 0 10 L0,${element.bounds.height - 10} A 10 10 180 0 0 10 ${element.bounds.height} L20, ${element.bounds.height}`, strokeColor: strokeColor || element.strokeColor, fillColor: "transparent" }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name)));
export const BPMNAnnotationComponent = enhance(BPMNAnnotationC);
//# sourceMappingURL=bpmn-annotation-component.js.map