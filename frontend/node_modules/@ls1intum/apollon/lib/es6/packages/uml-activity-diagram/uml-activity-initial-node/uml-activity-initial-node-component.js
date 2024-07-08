import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTheme } from '../../../components/theme/styles';
import { ThemedCircleContrast } from '../../../components/theme/themedComponents';
const enhance = compose(withTheme, connect((state, props) => ({
    interactive: state.interactive.includes(props.element.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
})));
const UMLActivityInitialNodeC = ({ element, interactive, interactable, theme }) => {
    return (React.createElement("g", null,
        React.createElement(ThemedCircleContrast, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2, strokeColor: "none", fillColor: interactive && interactable ? theme.interactive.normal : element.fillColor, fillOpacity: 1 })));
};
export const UMLActivityInitialNodeComponent = enhance(UMLActivityInitialNodeC);
//# sourceMappingURL=uml-activity-initial-node-component.js.map