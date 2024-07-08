import React from 'react';
import { ColorLegendElement } from '.';
import { I18nContext } from '../../../components/i18n/i18n-context';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../../utils/actions/actions';
type OwnProps = {
    element: ColorLegendElement;
};
type StateProps = {};
type DispatchProps = {
    update: typeof UMLElementRepository.update;
    delete: AsyncDispatch<typeof UMLElementRepository.delete>;
};
export type Props = OwnProps & StateProps & DispatchProps & I18nContext;
export declare const ColorLegendUpdate: React.ComponentClass<OwnProps, any>;
export {};
