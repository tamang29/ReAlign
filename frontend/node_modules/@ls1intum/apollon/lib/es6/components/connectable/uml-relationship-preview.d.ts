import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { Direction, IUMLElementPort } from '../../services/uml-element/uml-element-port';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../utils/actions/actions';
import { Point } from '../../utils/geometry/point';
type OwnProps = {
    port: IUMLElementPort;
    target: Point;
};
type StateProps = {
    ports: {
        [key in Direction]: Point;
    };
};
type DispatchProps = {
    end: AsyncDispatch<typeof UMLElementRepository.endConnecting>;
    getAbsolutePosition: AsyncDispatch<typeof UMLElementRepository.getAbsolutePosition>;
};
type Props = OwnProps & StateProps & DispatchProps;
export declare const UMLRelationshipPreview: ConnectedComponent<ComponentType<Props>, OwnProps>;
export {};
