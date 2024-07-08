import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Button } from '../../../components/controls/button/button';
import { TrashIcon } from '../../../components/controls/icon/trash';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { localized } from '../../../components/i18n/localized';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { UMLRelationshipRepository } from '../../../services/uml-relationship/uml-relationship-repository';
import { Header } from '../../../components/controls/typography/typography';
import { ExchangeIcon } from '../../../components/controls/icon/exchange';
import { Divider } from '../../../components/controls/divider/divider';
import { Dropdown } from '../../../components/controls/dropdown/dropdown';
import { DeploymentRelationshipType } from '../index';
import { ColorButton } from '../../../components/controls/color-button/color-button';
import { StylePane } from '../../../components/style-pane/style-pane';
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
class DeploymentAssociationUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = { colorOpen: false };
        this.toggleColor = () => {
            this.setState((state) => ({
                colorOpen: !state.colorOpen,
            }));
        };
        this.onChange = (value) => {
            const { element, update } = this.props;
            update(element.id, { type: value });
        };
        this.rename = (value) => {
            const { element, update } = this.props;
            update(element.id, { name: value });
        };
        this.onChange = this.onChange.bind(this);
    }
    render() {
        const { element } = this.props;
        return (React.createElement("div", null,
            React.createElement("section", null,
                React.createElement(Flex, null,
                    React.createElement(Header, { gutter: false, style: { flexGrow: 1 } }, this.props.translate('popup.association')),
                    React.createElement(ColorButton, { onClick: this.toggleColor }),
                    React.createElement(Button, { color: "link", onClick: () => this.props.flip(element.id) },
                        React.createElement(ExchangeIcon, null)),
                    React.createElement(Button, { color: "link", tabIndex: -1, onClick: () => this.props.delete(element.id) },
                        React.createElement(TrashIcon, null))),
                React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: element.type === DeploymentRelationshipType.DeploymentAssociation }),
                React.createElement(Divider, null)),
            React.createElement("section", null,
                React.createElement(Dropdown, { value: element.type, onChange: this.onChange },
                    React.createElement(Dropdown.Item, { value: DeploymentRelationshipType.DeploymentAssociation }, this.props.translate('packages.DeploymentDiagram.DeploymentAssociation')),
                    React.createElement(Dropdown.Item, { value: DeploymentRelationshipType.DeploymentDependency }, this.props.translate('packages.DeploymentDiagram.DeploymentDependency')),
                    React.createElement(Dropdown.Item, { value: DeploymentRelationshipType.DeploymentInterfaceProvided }, this.props.translate('packages.DeploymentDiagram.DeploymentInterfaceProvided')),
                    React.createElement(Dropdown.Item, { value: DeploymentRelationshipType.DeploymentInterfaceRequired }, this.props.translate('packages.DeploymentDiagram.DeploymentInterfaceRequired')))),
            element.type === DeploymentRelationshipType.DeploymentAssociation && (React.createElement(React.Fragment, null,
                React.createElement(Divider, null),
                React.createElement("section", null,
                    React.createElement(Flex, null,
                        React.createElement(Textfield, { value: element.name, onChange: this.rename, autoFocus: true }),
                        React.createElement(Button, { color: "link", onClick: () => this.props.delete(element.id) },
                            React.createElement(TrashIcon, null))))))));
    }
}
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
    flip: UMLRelationshipRepository.flip,
}));
export const UMLDeploymentAssociationUpdate = enhance(DeploymentAssociationUpdate);
//# sourceMappingURL=uml-deployment-association-update.js.map