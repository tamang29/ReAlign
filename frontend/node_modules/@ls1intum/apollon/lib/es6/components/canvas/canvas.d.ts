import React, { Component, ComponentType, LegacyRef, RefObject } from 'react';
import { ConnectedComponent } from 'react-redux';
import { ILayer } from '../../services/layouter/layer';
import { IUMLDiagram } from '../../services/uml-diagram/uml-diagram';
import { Point } from '../../utils/geometry/point';
import { UMLElementState } from '../../services/uml-element/uml-element-types';
type OwnProps = {};
type StateProps = {
    diagram: IUMLDiagram;
    isStatic: boolean;
    elements: UMLElementState;
};
type DispatchProps = {};
type Props = OwnProps & StateProps & DispatchProps;
export declare class CanvasComponent extends Component<Props> implements Omit<ILayer, 'layer'> {
    layer: RefObject<SVGSVGElement>;
    origin: () => Point;
    snap: (point: Point) => Point;
    render(): React.JSX.Element;
}
export declare const Canvas: ConnectedComponent<ComponentType<Props>, OwnProps & {
    ref: LegacyRef<CanvasComponent>;
}>;
export {};
