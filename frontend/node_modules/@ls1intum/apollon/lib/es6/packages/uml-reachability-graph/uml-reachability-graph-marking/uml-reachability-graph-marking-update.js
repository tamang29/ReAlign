import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from '../../../components/controls/button/button';
import { TrashIcon } from '../../../components/controls/icon/trash';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { localized } from '../../../components/i18n/localized';
import { styled } from '../../../components/theme/styles';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { Divider } from '../../../components/controls/divider/divider';
import { ColorButton } from '../../../components/controls/color-button/color-button';
import { StylePane } from '../../../components/style-pane/style-pane';
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
}));
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
class UmlReachabilityGraphMarkingUpdate extends Component {
    constructor() {
        super(...arguments);
        this.state = { colorOpen: false };
        this.toggleColor = () => {
            this.setState((state) => ({
                colorOpen: !state.colorOpen,
            }));
        };
        this.rename = (id) => (value) => {
            this.props.update(id, { name: value });
        };
        this.toggleIsInitialMarking = (id) => (event) => {
            this.props.update(id, { isInitialMarking: event.currentTarget.checked });
        };
        this.delete = (id) => () => {
            this.props.delete(id);
        };
    }
    render() {
        const { element } = this.props;
        return (React.createElement("div", null,
            React.createElement("section", null,
                React.createElement(Flex, null,
                    React.createElement(Textfield, { value: element.name, onChange: this.rename(element.id), autoFocus: true }),
                    React.createElement(ColorButton, { onClick: this.toggleColor }),
                    React.createElement(Button, { color: "link", tabIndex: -1, onClick: this.delete(element.id) },
                        React.createElement(TrashIcon, null))),
                React.createElement(Divider, null)),
            React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true }),
            React.createElement("section", null,
                React.createElement("label", { htmlFor: "toggleIsInitialMarking" },
                    React.createElement("input", { id: "toggleIsInitialMarking", type: "checkbox", checked: element.isInitialMarking, onChange: this.toggleIsInitialMarking(element.id) }),
                    this.props.translate('packages.ReachabilityGraph.ReachabilityGraphIsInitialMarking')))));
    }
}
export const UMLReachabilityGraphMarkingUpdate = enhance(UmlReachabilityGraphMarkingUpdate);
//# sourceMappingURL=uml-reachability-graph-marking-update.js.map