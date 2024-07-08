import React, { Component } from 'react';
import { Button } from '../controls/button/button';
import { LinkIcon } from '../controls/icon/link';
import { TrashIcon } from '../controls/icon/trash';
import ReactTooltip from 'react-tooltip';
import { AssessmentRepository } from '../../services/assessment/assessment-repository';
import { compose } from 'redux';
import { localized } from '../i18n/localized';
import { connect } from 'react-redux';
const enhance = compose(localized, connect(null, { assess: AssessmentRepository.assess }));
const initialState = Object.freeze({
    showLinkIcon: true,
});
class AssessmentDropInfoTooltipComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = initialState;
        this.toggle = () => {
            this.setState({ showLinkIcon: !this.state.showLinkIcon });
        };
        this.removeLink = () => {
            const { element, assessment } = this.props;
            this.props.assess(element.id, { ...assessment }, 'MANUAL');
        };
    }
    render() {
        const { assessment, readonly } = this.props;
        const message = assessment?.dropInfo.tooltipMessage;
        return (React.createElement("div", null,
            readonly ? (React.createElement(Button, { color: "link", tabIndex: -1, "data-tip": true, "data-for": "tooltip" },
                React.createElement(LinkIcon, null))) : this.state.showLinkIcon ? (React.createElement(Button, { color: "link", tabIndex: -1, "data-tip": true, "data-for": "tooltip", onClick: this.toggle },
                React.createElement(LinkIcon, null))) : (React.createElement(Button, { color: "link", tabIndex: -1, "data-tip": true, "data-for": "tooltip", onClick: this.removeLink, onMouseLeave: this.toggle },
                React.createElement(TrashIcon, null))),
            React.createElement(ReactTooltip, { id: "tooltip", place: "right", effect: "solid" }, this.state.showLinkIcon ? message : assessment?.dropInfo.removeMessage)));
    }
}
export const AssessmentDropInfoTooltip = enhance(AssessmentDropInfoTooltipComponent);
//# sourceMappingURL=assessment-dropInfo-tooltip.js.map