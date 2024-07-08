import React, { Component, SVGProps } from 'react';
import { ApollonMode } from '../../services/editor/editor-types';
import { IUMLRelationship } from '../../services/uml-relationship/uml-relationship';
import { UMLRelationshipRepository } from '../../services/uml-relationship/uml-relationship-repository';
import { AsyncDispatch } from '../../utils/actions/actions';
import { Point } from '../../utils/geometry/point';
import { withThemeProps } from '../theme/styles';
import { UMLElementComponentProps } from './uml-element-component-props';
import { UMLElementSelectorType } from '../../packages/uml-element-selector-type';
type OwnProps = UMLElementComponentProps & SVGProps<SVGSVGElement>;
type StateProps = {
    hovered: boolean;
    selected: boolean;
    remoteSelectors: UMLElementSelectorType[];
    interactive: boolean;
    interactable: boolean;
    reconnecting: boolean;
    disabled: boolean;
    relationship: IUMLRelationship;
    mode: ApollonMode;
    readonly: boolean;
    selectionBoxActive: boolean;
};
type DispatchProps = {
    startwaypointslayout: AsyncDispatch<typeof UMLRelationshipRepository.startWaypointsLayout>;
    endwaypointslayout: AsyncDispatch<typeof UMLRelationshipRepository.endWaypointsLayout>;
};
type Props = OwnProps & StateProps & DispatchProps & withThemeProps;
declare const initialState: {
    offset: Point;
    handlerIndex: number;
    path: {
        x: number;
        y: number;
    }[];
};
type State = typeof initialState;
export declare class CanvasRelationshipComponent extends Component<Props, State> {
    state: {
        offset: Point;
        handlerIndex: number;
        path: {
            x: number;
            y: number;
        }[];
    };
    render(): React.JSX.Element;
    onPointerDown: (event: any, handlerIndex: number, point: {
        mpX: number;
        mpY: number;
    }) => void;
    onPointerMove: (event: any) => void;
    onPointerUp: (event: any) => void;
    updateRelationshipPoints: (waypointDirection: string, handlerIndex: number, x: number, y: number) => void;
    updateXCoordinate: (startPoint: number, endPoint: number, x: number, y: number) => void;
    updateYCoordinate: (startPoint: number, endPoint: number, x: number, y: number) => void;
}
export declare const CanvasRelationship: React.ComponentClass<OwnProps, any>;
export {};
