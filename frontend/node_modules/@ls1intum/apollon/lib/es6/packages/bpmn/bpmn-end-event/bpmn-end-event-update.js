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
class BPMNEndEventUpdateComponent extends Component {
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
                    React.createElement(Dropdown.Item, { value: 'default' }, this.props.translate('packages.BPMN.BPMNEndEvent')),
                    React.createElement(Dropdown.Item, { value: 'message' }, this.props.translate('packages.BPMN.BPMNMessageEndEvent')),
                    React.createElement(Dropdown.Item, { value: 'escalation' }, this.props.translate('packages.BPMN.BPMNEscalationEndEvent')),
                    React.createElement(Dropdown.Item, { value: 'error' }, this.props.translate('packages.BPMN.BPMNErrorEndEvent')),
                    React.createElement(Dropdown.Item, { value: 'compensation' }, this.props.translate('packages.BPMN.BPMNCompensationEndEvent')),
                    React.createElement(Dropdown.Item, { value: 'signal' }, this.props.translate('packages.BPMN.BPMNSignalEndEvent')),
                    React.createElement(Dropdown.Item, { value: 'terminate' }, this.props.translate('packages.BPMN.BPMNTerminateEndEvent'))))));
    }
}
export const BPMNEndEventUpdate = enhance(BPMNEndEventUpdateComponent);
//# sourceMappingURL=bpmn-end-event-update.js.map