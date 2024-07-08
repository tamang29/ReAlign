import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from '../../../components/controls/button/button';
import { Divider } from '../../../components/controls/divider/divider';
import { TrashIcon } from '../../../components/controls/icon/trash';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { localized } from '../../../components/i18n/localized';
import { styled } from '../../../components/theme/styles';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { Dropdown } from '../../../components/controls/dropdown/dropdown';
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
class BPMNGatewayUpdateComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = { colorOpen: false };
        this.toggleColor = () => {
            this.setState((state) => ({
                colorOpen: !state.colorOpen,
            }));
        };
        /**
         * Rename the gateway
         * @param id The ID of the gateway that should be renamed
         */
        this.rename = (id) => (value) => {
            this.props.update(id, { name: value });
        };
        /**
         * Change the type of the gateway
         * @param id The ID of the gateway whose type should be changed
         */
        this.changeGatewayType = (id) => (value) => {
            this.props.update(id, { gatewayType: value });
        };
        /**
         * Delete a gateway
         * @param id The ID of the gateway that should be deleted
         */
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
            React.createElement("section", null,
                React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true })),
            React.createElement("section", null,
                React.createElement(Dropdown, { value: element.gatewayType, onChange: this.changeGatewayType(element.id) },
                    React.createElement(Dropdown.Item, { value: 'exclusive' }, this.props.translate('packages.BPMN.BPMNExclusiveGateway')),
                    React.createElement(Dropdown.Item, { value: 'parallel' }, this.props.translate('packages.BPMN.BPMNParallelGateway')),
                    React.createElement(Dropdown.Item, { value: 'inclusive' }, this.props.translate('packages.BPMN.BPMNInclusiveGateway')),
                    React.createElement(Dropdown.Item, { value: 'event-based' }, this.props.translate('packages.BPMN.BPMNEventBasedGateway')),
                    React.createElement(Dropdown.Item, { value: 'complex' }, this.props.translate('packages.BPMN.BPMNComplexGateway'))))));
    }
}
export const BPMNGatewayUpdate = enhance(BPMNGatewayUpdateComponent);
//# sourceMappingURL=bpmn-gateway-update.js.map