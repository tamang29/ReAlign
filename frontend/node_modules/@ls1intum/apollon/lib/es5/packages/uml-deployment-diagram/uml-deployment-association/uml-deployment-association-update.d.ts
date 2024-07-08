import React from 'react';
import { UMLDeploymentAssociation } from './uml-deployment-association';
import { UMLDeploymentInterfaceRequired } from '../uml-deployment-interface-required/uml-deployment-interface-required';
import { UMLDeploymentInterfaceProvided } from '../uml-deployment-interface-provided/uml-deployment-interface-provided';
import { UMLDeploymentDependency } from '../uml-deployment-dependency/uml-deployment-dependency';
type OwnProps = {
    element: UMLDeploymentAssociation | UMLDeploymentInterfaceRequired | UMLDeploymentInterfaceProvided | UMLDeploymentDependency;
};
export declare const UMLDeploymentAssociationUpdate: React.ComponentClass<OwnProps, any>;
export {};
