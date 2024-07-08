import React from 'react';
import { withTheme } from '../../../components/theme/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ThemedRectContrast } from '../../../components/theme/themedComponents';
const enhance = compose(withTheme, connect((state, props) => ({
    interactive: state.interactive.includes(props.element.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
})));
const UMLActivityForkNodeHorizontalC = ({ element, interactive, interactable, theme }) => {
    return (React.createElement("g", null,
        React.createElement(ThemedRectContrast, { width: element.bounds.width, height: element.bounds.height, strokeColor: "none", fillColor: interactive && interactable ? theme.interactive.normal : element.fillColor, fillOpacity: 1 })));
};
export const UMLActivityForkNodeHorizontalComponent = enhance(UMLActivityForkNodeHorizontalC);
//# sourceMappingURL=uml-activity-fork-node-horizontal-component.js.map