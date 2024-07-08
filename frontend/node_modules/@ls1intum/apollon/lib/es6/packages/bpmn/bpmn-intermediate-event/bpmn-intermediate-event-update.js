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
import { StylePane } from '../../../components/style-pane/style-pane';
import { ColorButton } from '../../../components/controls/color-button/color-button';
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
}));
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
class BPMNIntermediateEventUpdateComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = { colorOpen: false };
        this.toggleColor = () => {
            this.setState((state) => ({
                colorOpen: !state.colorOpen,
            }));
        };
        /**
         * Rename the event
         * @param id The ID of the event that should be renamed
         */
        this.rename = (id) => (value) => {
            this.props.update(id, { name: value });
        };
        /**
         * Change the type of the event
         * @param id The ID of the event whose type should be changed
         */
        this.changeEventType = (id) => (value) => {
            this.props.update(id, { eventType: value });
        };
        /**
         * Delete an event
         * @param id The ID of the event that should be deleted
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
                        React.createElement(TrashIcon, null)))),
            React.createElement("section", null,
                React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true })),
            React.createElement("section", null,
                React.createElement(Divider, null),
                React.createElement(Dropdown, { value: element.eventType, onChange: this.changeEventType(element.id) },
                    React.createElement(Dropdown.Item, { value: 'default' }, this.props.translate('packages.BPMN.BPMNIntermediateEvent')),
                    React.createElement(Dropdown.Item, { value: 'message-catch' }, this.props.translate('packages.BPMN.BPMNMessageIntermediateCatchEvent')),
                    React.createElement(Dropdown.Item, { value: 'message-throw' }, this.props.translate('packages.BPMN.BPMNMessageIntermediateThrowEvent')),
                    React.createElement(Dropdown.Item, { value: 'timer-catch' }, this.props.translate('packages.BPMN.BPMNTimerIntermediateCatchEvent')),
                    React.createElement(Dropdown.Item, { value: 'escalation-throw' }, this.props.translate('packages.BPMN.BPMNEscalationIntermediateThrowEvent')),
                    React.createElement(Dropdown.Item, { value: 'conditional-catch' }, this.props.translate('packages.BPMN.BPMNConditionalIntermediateCatchEvent')),
                    React.createElement(Dropdown.Item, { value: 'link-catch' }, this.props.translate('packages.BPMN.BPMNLinkIntermediateCatchEvent')),
                    React.createElement(Dropdown.Item, { value: 'link-throw' }, this.props.translate('packages.BPMN.BPMNLinkIntermediateThrowEvent')),
                    React.createElement(Dropdown.Item, { value: 'compensation-throw' }, this.props.translate('packages.BPMN.BPMNCompensationIntermediateThrowEvent')),
                    React.createElement(Dropdown.Item, { value: 'signal-catch' }, this.props.translate('packages.BPMN.BPMNSignalIntermediateCatchEvent')),
                    React.createElement(Dropdown.Item, { value: 'signal-throw' }, this.props.translate('packages.BPMN.BPMNSignalIntermediateThrowEvent'))))));
    }
}
export const BPMNIntermediateEventUpdate = enhance(BPMNIntermediateEventUpdateComponent);
//# sourceMappingURL=bpmn-intermediate-event-update.js.map