import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from '../../../components/controls/button/button';
import { ColorButton } from '../../../components/controls/color-button/color-button';
import { TrashIcon } from '../../../components/controls/icon/trash';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { localized } from '../../../components/i18n/localized';
import { StylePane } from '../../../components/style-pane/style-pane';
import { styled } from '../../../components/theme/styles';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
class ColorLegendUpdateComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = { colorOpen: false };
        this.toggleColor = () => {
            this.setState((state) => ({
                colorOpen: !state.colorOpen,
            }));
        };
        this.onUpdate = (name) => {
            const { element, update } = this.props;
            update(element.id, { name });
        };
    }
    render() {
        const { element } = this.props;
        return (React.createElement("div", null,
            React.createElement("section", null,
                React.createElement(Flex, null,
                    React.createElement(Textfield, { value: element.name, placeholder: this.props.translate('packages.SyntaxTree.SyntaxTreeNonterminal'), onChange: this.onUpdate, autoFocus: true }),
                    React.createElement(ColorButton, { onClick: this.toggleColor }),
                    React.createElement(Button, { color: "link", tabIndex: -1, onClick: () => this.props.delete(element.id) },
                        React.createElement(TrashIcon, null)))),
            React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true })));
    }
}
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
}));
export const ColorLegendUpdate = enhance(ColorLegendUpdateComponent);
//# sourceMappingURL=color-legend-update.js.map