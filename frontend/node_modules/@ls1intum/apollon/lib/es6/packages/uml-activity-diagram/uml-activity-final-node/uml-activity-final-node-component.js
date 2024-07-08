import React from 'react';
import { withTheme } from '../../../components/theme/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ThemedCircle, ThemedCircleContrast } from '../../../components/theme/themedComponents';
const enhance = compose(withTheme, connect((state, props) => ({
    interactive: state.interactive.includes(props.element.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
})));
export const UMLActivityFinalNodeC = ({ element, interactive, interactable, theme }) => {
    return (React.createElement("g", null,
        React.createElement(ThemedCircle, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 2.5, strokeColor: interactable && interactive ? theme.interactive.normal : element.fillColor, strokeWidth: 5 }),
        React.createElement(ThemedCircleContrast, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 7.5, strokeColor: "none", fillColor: interactive && interactable ? theme.interactive.normal : element.fillColor, fillOpacity: 1 })));
};
export const UMLActivityFinalNodeComponent = enhance(UMLActivityFinalNodeC);
//# sourceMappingURL=uml-activity-final-node-component.js.map