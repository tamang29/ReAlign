import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ComponentRelationshipType } from '.';
import { Button } from '../../components/controls/button/button';
import { Divider } from '../../components/controls/divider/divider';
import { Dropdown } from '../../components/controls/dropdown/dropdown';
import { ExchangeIcon } from '../../components/controls/icon/exchange';
import { TrashIcon } from '../../components/controls/icon/trash';
import { Header } from '../../components/controls/typography/typography';
import { localized } from '../../components/i18n/localized';
import { styled } from '../../components/theme/styles';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { UMLRelationshipRepository } from '../../services/uml-relationship/uml-relationship-repository';
import { ColorButton } from '../../components/controls/color-button/color-button';
import { StylePane } from '../../components/style-pane/style-pane';
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
class ComponentAssociationUpdate extends Component {
    constructor() {
        super(...arguments);
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
                React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true }),
                React.createElement(Divider, null)),
            React.createElement("section", null,
                React.createElement(Dropdown, { value: element.type, onChange: this.onChange },
                    React.createElement(Dropdown.Item, { value: ComponentRelationshipType.ComponentDependency }, this.props.translate('packages.ComponentDiagram.ComponentDependency')),
                    React.createElement(Dropdown.Item, { value: ComponentRelationshipType.ComponentInterfaceProvided }, this.props.translate('packages.ComponentDiagram.ComponentInterfaceProvided')),
                    React.createElement(Dropdown.Item, { value: ComponentRelationshipType.ComponentInterfaceRequired }, this.props.translate('packages.ComponentDiagram.ComponentInterfaceRequired'))))));
    }
}
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
    flip: UMLRelationshipRepository.flip,
}));
export const UMLComponentAssociationUpdate = enhance(ComponentAssociationUpdate);
//# sourceMappingURL=uml-component-association-update.js.map