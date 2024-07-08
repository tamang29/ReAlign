import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Button } from '../../../components/controls/button/button';
import { ColorButton } from '../../../components/controls/color-button/color-button';
import { Divider } from '../../../components/controls/divider/divider';
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
class FlowchartFlowlineUpdateComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = { colorOpen: false };
        this.toggleColor = () => {
            this.setState((state) => ({
                colorOpen: !state.colorOpen,
            }));
        };
        this.rename = (name) => {
            this.props.update(this.props.element.id, { name });
        };
    }
    render() {
        const { element } = this.props;
        return (React.createElement("div", null,
            React.createElement("section", null,
                React.createElement(Flex, null,
                    React.createElement(Header, { gutter: false, style: { flexGrow: 1 } }, this.props.translate('packages.Flowchart.FlowchartFlowline')),
                    React.createElement(ColorButton, { onClick: this.toggleColor }),
                    React.createElement(Button, { color: "link", onClick: () => this.props.flip(element.id) },
                        React.createElement(ExchangeIcon, null)),
                    React.createElement(Button, { color: "link", onClick: () => this.props.delete(element.id) },
                        React.createElement(TrashIcon, null))),
                React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true }),
                React.createElement(Divider, null)),
            React.createElement("section", null,
                React.createElement(Textfield, { value: element.name, onChange: this.rename, autoFocus: true }))));
    }
}
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
    flip: UMLRelationshipRepository.flip,
}));
export const FlowchartFlowlineUpdate = enhance(FlowchartFlowlineUpdateComponent);
//# sourceMappingURL=flowchart-flowline-update.js.map