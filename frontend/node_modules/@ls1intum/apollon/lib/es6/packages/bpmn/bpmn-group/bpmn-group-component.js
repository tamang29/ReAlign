import React from 'react';
import { ThemedRect } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
import { withTheme } from '../../../components/theme/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
const enhance = compose(withTheme, connect((state, props) => ({
    hovered: state.hovered.includes(props.element.id),
    interactive: state.interactive.includes(props.element.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
})));
export const BPMNGroupC = ({ element, strokeColor, textColor, children, interactive, interactable, hovered, theme, }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", strokeColor: strokeColor || element.strokeColor, fillColor: interactable && interactive
            ? theme.interactive.normal
            : interactable && hovered
                ? theme.interactive.hovered
                : 'transparent', strokeDasharray: "4" }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name),
    children));
export const BPMNGroupComponent = enhance(BPMNGroupC);
//# sourceMappingURL=bpmn-group-component.js.map