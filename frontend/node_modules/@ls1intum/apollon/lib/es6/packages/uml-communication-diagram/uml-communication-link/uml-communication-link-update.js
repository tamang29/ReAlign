import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from '../../../components/controls/button/button';
import { Divider } from '../../../components/controls/divider/divider';
import { ArrowLeftIcon } from '../../../components/controls/icon/arrow-left';
import { ArrowRightIcon } from '../../../components/controls/icon/arrow-right';
import { TrashIcon } from '../../../components/controls/icon/trash';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { Header } from '../../../components/controls/typography/typography';
import { localized } from '../../../components/i18n/localized';
import { styled } from '../../../components/theme/styles';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { UMLRelationshipRepository } from '../../../services/uml-relationship/uml-relationship-repository';
import { uuid } from '../../../utils/uuid';
import { CommunicationLinkMessage } from './uml-communiction-link-message';
import { ColorButton } from '../../../components/controls/color-button/color-button';
import { StylePane } from '../../../components/style-pane/style-pane';
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
const getInitialState = () => ({
    fieldToFocus: undefined,
    colorOpen: false,
});
class CommunicationLinkUpdate extends Component {
    constructor() {
        super(...arguments);
        this.state = getInitialState();
        this.newCommunicationLinkField = createRef();
        this.messageRefs = [];
        this.toggleColor = () => {
            this.setState((state) => ({
                colorOpen: !state.colorOpen,
            }));
        };
        this.create = (value) => {
            const { element, update } = this.props;
            if (!element.messages.find((message) => message.name === value)) {
                update(element.id, {
                    messages: [...element.messages, new CommunicationLinkMessage({ id: uuid(), name: value, direction: 'source' })],
                });
            }
        };
        this.rename = (value) => (name) => {
            const { element, update } = this.props;
            const messages = [...element.messages];
            const index = messages.findIndex((message) => message.name === value.name);
            messages[index].name = name;
            update(element.id, { messages });
        };
        this.flip = (value) => () => {
            const { element, update } = this.props;
            const messages = [...element.messages];
            const index = messages.findIndex((message) => message.name === value.name);
            messages[index].direction = messages[index].direction === 'source' ? 'target' : 'source';
            update(element.id, { messages });
        };
        this.delete = (value) => () => {
            const { element, update } = this.props;
            update(element.id, {
                messages: element.messages.filter((message) => message.name !== value.name),
            });
        };
    }
    componentDidMount() {
        this.setState({ fieldToFocus: this.newCommunicationLinkField.current });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.fieldToFocus) {
            this.state.fieldToFocus.focus();
            this.setState({ fieldToFocus: undefined });
        }
    }
    render() {
        const { element, getById } = this.props;
        const source = element.source && getById(element.source.element);
        const target = element.target && getById(element.target.element);
        if (!source || !target)
            return null;
        return (React.createElement("div", null,
            React.createElement("section", null,
                React.createElement(Flex, null,
                    React.createElement(Header, { gutter: false }, this.props.translate('packages.CommunicationDiagram.CommunicationLink')),
                    React.createElement(ColorButton, { onClick: this.toggleColor }),
                    React.createElement(Button, { color: "link", onClick: () => this.props.delete(element.id) },
                        React.createElement(TrashIcon, null))),
                React.createElement(StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true }),
                React.createElement(Divider, null)),
            React.createElement("section", null,
                React.createElement(Header, null,
                    this.props.translate('popup.messages'),
                    " (",
                    React.createElement("small", null,
                        source.name,
                        " \u27F6 ",
                        target.name),
                    ")"),
                element.messages.map((message, i) => (React.createElement(Flex, { key: message.id },
                    React.createElement(Textfield, { ref: (ref) => (this.messageRefs[i] = ref), gutter: true, value: message.name, onChange: this.rename(message), onSubmitKeyUp: () => i === element.messages.length - 1
                            ? this.newCommunicationLinkField.current?.focus()
                            : this.setState({
                                fieldToFocus: this.messageRefs[i + 1],
                            }) }),
                    React.createElement(Button, { color: "link", tabIndex: -1, onClick: this.flip(message) }, message.direction === 'source' ? React.createElement(ArrowRightIcon, null) : React.createElement(ArrowLeftIcon, null)),
                    React.createElement(Button, { color: "link", tabIndex: -1, onClick: this.delete(message) },
                        React.createElement(TrashIcon, null))))),
                React.createElement(Textfield, { ref: this.newCommunicationLinkField, outline: true, value: "", onSubmit: this.create, onSubmitKeyUp: () => this.setState({
                        fieldToFocus: this.newCommunicationLinkField.current,
                    }), onKeyDown: (event) => {
                        // workaround when 'tab' key is pressed:
                        // prevent default and execute blur manually without switching to next tab index
                        // then set focus to newCommunicationLink field again (componentDidUpdate)
                        if (event.key === 'Tab' && event.currentTarget.value) {
                            event.preventDefault();
                            event.currentTarget.blur();
                            this.setState({
                                fieldToFocus: this.newCommunicationLinkField.current,
                            });
                        }
                    } }))));
    }
}
const enhance = compose(localized, connect(null, {
    update: UMLElementRepository.update,
    delete: UMLElementRepository.delete,
    flip: UMLRelationshipRepository.flip,
    getById: UMLElementRepository.getById,
}));
export const UMLCommunicationLinkUpdate = enhance(CommunicationLinkUpdate);
//# sourceMappingURL=uml-communication-link-update.js.map