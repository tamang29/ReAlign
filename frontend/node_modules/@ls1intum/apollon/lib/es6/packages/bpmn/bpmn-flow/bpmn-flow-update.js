import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from '../../../components/controls/button/button';
import { TrashIcon } from '../../../components/controls/icon/trash';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { localized } from '../../../components/i18n/localized';
import { styled } from '../../../components/theme/styles';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { ExchangeIcon } from '../../../components/controls/icon/exchange';
import { UMLRelationshipRepository } from '../../../services/uml-relationship/uml-relationship-repository';
import { ColorButton } from '../../../components/controls/color-button/color-button';
import { StylePane } from '../../../components/style-pane/style-pane';
import { Dropdown } from '../../../components/controls/dropdown/dropdown';
import { Divider } from '../../../components/controls/divider/divider';
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
    flip: UMLRelationshipRepository.flip,
}));
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
class BPMNFlowUpdateComponent extends Component {
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
        /**
         * Change the type of the gateway
         * @param id The ID of the gateway whose type should be changed
         */
        this.changeFlowType = (id) => (value) => {
            this.props.update(id, { flowType: value });
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
                    React.createElement(Button, { color: "link", onClick: () => this.props.flip(element.id) },
                        React.createElement(ExchangeIcon, null)),
                    React.createElement(Button, { color: "link", tabIndex: -1, onClick: this.delete(element.id) },
                        React.createElement(TrashIcon, null)))),
            React.createElement(Divider, null),
            React.createElement("section", null,
                React.createElement(Dropdown, { value: element.flowType, onChange: this.changeFlowType(element.id) },
                    React.createElement(Dropdown.Item, { value: 'sequence' }, this.props.translate('packages.BPMN.BPMNSequenceFlow')),
                    React.createElement(Dropdown.Item, { value: 'message' }, this.props.translate('packages.BPMN.BPMNMessageFlow')),
                    React.createElement(Dropdown.Item, { value: 'association' }, this.props.translate('packages.BPMN.BPMNAssociationFlow')),
                    React.createElement(Dropdown.Item, { value: 'data association' }, this.props.translate('packages.BPMN.BPMNDataAssociationFlow')))),
            React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true })));
    }
}
export const BPMNFlowUpdate = enhance(BPMNFlowUpdateComponent);
//# sourceMappingURL=bpmn-flow-update.js.map