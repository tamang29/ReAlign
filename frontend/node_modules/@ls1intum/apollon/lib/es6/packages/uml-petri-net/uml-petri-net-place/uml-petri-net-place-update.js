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
import { Body } from '../../../components/controls/typography/typography';
import { InfiniteIcon } from '../../../components/controls/icon/infinite';
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
class UmlPetriNetPlaceUpdateComponent extends Component {
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
        this.changeTokenAmount = (id) => (value) => {
            this.props.update(id, { amountOfTokens: value });
        };
        this.changeCapacity = (id) => (value) => {
            this.props.update(id, { capacity: value });
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
                React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true }),
                React.createElement(Divider, null)),
            React.createElement("section", null,
                React.createElement(Flex, null,
                    React.createElement(Body, { style: { marginRight: '0.5em', minWidth: '70px' } }, this.props.translate('popup.tokens')),
                    React.createElement(Textfield, { style: { minWidth: 0 }, value: element.amountOfTokens, type: "number", onChange: this.changeTokenAmount(element.id) }))),
            React.createElement("section", null,
                React.createElement(Flex, { style: { marginTop: '0.5em', alignItems: 'center' } },
                    React.createElement(Body, { style: { marginRight: '0.5em', minWidth: '70px' } }, this.props.translate('popup.capacity')),
                    React.createElement("div", { style: { position: 'relative' } },
                        React.createElement(Textfield, { value: element.capacity, type: "number", onChange: this.changeCapacity(element.id) }),
                        !isFinite(element.capacity) && (React.createElement(InfiniteIcon, { style: { position: 'absolute', top: '25%', left: '5%' }, key: element.capacity }))),
                    React.createElement(Button, { color: "link", type: "reset", tabIndex: -1, onClick: (event) => this.changeCapacity(element.id)(Number.POSITIVE_INFINITY) },
                        React.createElement(InfiniteIcon, null))))));
    }
}
export const UMLPetriNetPlaceUpdate = enhance(UmlPetriNetPlaceUpdateComponent);
//# sourceMappingURL=uml-petri-net-place-update.js.map