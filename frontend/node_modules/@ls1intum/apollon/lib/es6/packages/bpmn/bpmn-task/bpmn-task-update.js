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
import { Switch } from '../../../components/controls/switch/switch';
import { BpmnLoopMarkerIcon } from '../common/markers/bpmn-loop-marker-icon';
import { BPMNParallelMarkerIcon } from '../common/markers/bpmn-parallel-marker-icon';
import { BPMNSequentialMarkerIcon } from '../common/markers/bpmn-sequential-marker-icon';
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
}));
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
class BPMNTaskUpdateComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = { colorOpen: false };
        this.toggleColor = () => {
            this.setState((state) => ({
                colorOpen: !state.colorOpen,
            }));
        };
        /**
         * Rename the task
         * @param id The ID of the task that should be renamed
         */
        this.rename = (id) => (value) => {
            this.props.update(id, { name: value });
        };
        /**
         * Change the type of the task
         * @param id The ID of the task whose type should be changed
         */
        this.changeTaskType = (id) => (value) => {
            this.props.update(id, { taskType: value });
        };
        /**
         * Change the marker of the task
         * @param id The ID of the task whose marker should be changed
         */
        this.changeMarker = (id) => (value) => {
            if (this.props.element.marker === value) {
                this.props.update(id, { marker: 'none' });
                return;
            }
            this.props.update(id, { marker: value });
        };
        /**
         * Delete a task
         * @param id The ID of the task that should be deleted
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
                React.createElement("section", null,
                    React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true }))),
            React.createElement("section", null,
                React.createElement(Divider, null),
                React.createElement(Dropdown, { value: element.taskType, onChange: this.changeTaskType(element.id) },
                    React.createElement(Dropdown.Item, { value: 'default' }, this.props.translate('packages.BPMN.BPMNTask')),
                    React.createElement(Dropdown.Item, { value: 'user' }, this.props.translate('packages.BPMN.BPMNUserTask')),
                    React.createElement(Dropdown.Item, { value: 'send' }, this.props.translate('packages.BPMN.BPMNSendTask')),
                    React.createElement(Dropdown.Item, { value: 'receive' }, this.props.translate('packages.BPMN.BPMNReceiveTask')),
                    React.createElement(Dropdown.Item, { value: 'manual' }, this.props.translate('packages.BPMN.BPMNManualTask')),
                    React.createElement(Dropdown.Item, { value: 'business-rule' }, this.props.translate('packages.BPMN.BPMNBusinessRuleTask')),
                    React.createElement(Dropdown.Item, { value: 'script' }, this.props.translate('packages.BPMN.BPMNScriptTask')))),
            React.createElement("section", null,
                React.createElement(Divider, null),
                React.createElement(Switch, { value: element.marker, onChange: this.changeMarker(element.id), color: "primary" },
                    React.createElement(Switch.Item, { value: 'parallel multi instance' },
                        React.createElement(BPMNParallelMarkerIcon, { stroke: "currentColor" })),
                    React.createElement(Switch.Item, { value: 'sequential multi instance' },
                        React.createElement(BPMNSequentialMarkerIcon, { stroke: "currentColor" })),
                    React.createElement(Switch.Item, { value: 'loop' },
                        React.createElement(BpmnLoopMarkerIcon, { stroke: "currentColor" }))))));
    }
}
export const BPMNTaskUpdate = enhance(BPMNTaskUpdateComponent);
//# sourceMappingURL=bpmn-task-update.js.map