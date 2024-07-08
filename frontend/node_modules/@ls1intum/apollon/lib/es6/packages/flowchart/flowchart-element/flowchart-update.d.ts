import React, { Component } from 'react';
import { I18nContext } from '../../../components/i18n/i18n-context';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../../utils/actions/actions';
import { FlowchartElement } from '../index';
type State = {
    colorOpen: boolean;
};
export declare class FlowchartUpdateComponent extends Component<Props, State> {
    state: {
        colorOpen: boolean;
    };
    private toggleColor;
    render(): React.JSX.Element;
    private onUpdate;
}
type OwnProps = {
    element: FlowchartElement;
};
type StateProps = {};
type DispatchProps = {
    update: typeof UMLElementRepository.update;
    delete: AsyncDispatch<typeof UMLElementRepository.delete>;
};
export type Props = OwnProps & GeneralProps;
export type GeneralProps = StateProps & DispatchProps & I18nContext;
export declare const enhance: (...args: any[]) => React.ComponentClass<OwnProps, any>;
export {};
