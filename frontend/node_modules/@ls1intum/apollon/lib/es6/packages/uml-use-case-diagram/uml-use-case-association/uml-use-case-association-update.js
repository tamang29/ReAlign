import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { UseCaseRelationshipType } from '..';
import { Button } from '../../../components/controls/button/button';
import { ColorButton } from '../../../components/controls/color-button/color-button';
import { Divider } from '../../../components/controls/divider/divider';
import { Dropdown } from '../../../components/controls/dropdown/dropdown';
import { ExchangeIcon } from '../../../components/controls/icon/exchange';
import { TrashIcon } from '../../../components/controls/icon/trash';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { Header } from '../../../components/controls/typography/typography';
import { localized } from '../../../components/i18n/localized';
import { StylePane } from '../../../components/style-pane/style-pane';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { UMLRelationshipRepository } from '../../../services/uml-relationship/uml-relationship-repository';
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
class UseCaseAssociationUpdate extends Component {
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
        this.onChange = (type) => {
            const { element, update } = this.props;
            update(element.id, { type });
        };
    }
    render() {
        const { element } = this.props;
        return (React.createElement("div", null,
            React.createElement("section", null, element.type === UseCaseRelationshipType.UseCaseAssociation ? (React.createElement(Flex, null,
                React.createElement(Textfield, { value: element.name, placeholder: "...", onChange: this.rename(element.id), autoFocus: true }),
                React.createElement(ColorButton, { onClick: this.toggleColor }),
                React.createElement(Button, { color: "link", tabIndex: -1, onClick: () => this.props.delete(element.id) },
                    React.createElement(TrashIcon, null)))) : (React.createElement(Flex, null,
                React.createElement(Header, { gutter: false, style: { flexGrow: 1 } }, {
                    [UseCaseRelationshipType.UseCaseAssociation]: this.props.translate('packages.UseCaseDiagram.UseCaseAssociation'),
                    [UseCaseRelationshipType.UseCaseGeneralization]: this.props.translate('packages.UseCaseDiagram.UseCaseGeneralization'),
                    [UseCaseRelationshipType.UseCaseInclude]: this.props.translate('packages.UseCaseDiagram.UseCaseInclude'),
                    [UseCaseRelationshipType.UseCaseExtend]: this.props.translate('packages.UseCaseDiagram.UseCaseExtend'),
                }[element.type]),
                React.createElement(ColorButton, { onClick: this.toggleColor }),
                React.createElement(Button, { color: "link", tabIndex: -1, onClick: () => this.props.flip(element.id) },
                    React.createElement(ExchangeIcon, null)),
                React.createElement(Button, { color: "link", tabIndex: -1, onClick: () => this.props.delete(element.id) },
                    React.createElement(TrashIcon, null))))),
            React.createElement("section", null,
                React.createElement(Divider, null),
                React.createElement(Dropdown, { value: element.type, onChange: this.onChange },
                    React.createElement(Dropdown.Item, { value: UseCaseRelationshipType.UseCaseAssociation }, this.props.translate('packages.UseCaseDiagram.UseCaseAssociation')),
                    React.createElement(Dropdown.Item, { value: UseCaseRelationshipType.UseCaseGeneralization }, this.props.translate('packages.UseCaseDiagram.UseCaseGeneralization')),
                    React.createElement(Dropdown.Item, { value: UseCaseRelationshipType.UseCaseInclude }, this.props.translate('packages.UseCaseDiagram.UseCaseInclude')),
                    React.createElement(Dropdown.Item, { value: UseCaseRelationshipType.UseCaseExtend }, this.props.translate('packages.UseCaseDiagram.UseCaseExtend')))),
            React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: element.type !== UseCaseRelationshipType.UseCaseGeneralization })));
    }
}
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
    flip: UMLRelationshipRepository.flip,
}));
export const UMLUseCaseAssociationUpdate = enhance(UseCaseAssociationUpdate);
//# sourceMappingURL=uml-use-case-association-update.js.map