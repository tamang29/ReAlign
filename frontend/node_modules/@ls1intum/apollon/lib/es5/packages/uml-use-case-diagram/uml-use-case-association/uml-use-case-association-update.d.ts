import React from 'react';
import { UMLUseCaseExtend } from '../uml-use-case-extend/uml-use-case-extend';
import { UMLUseCaseGeneralization } from '../uml-use-case-generalization/uml-use-case-generalization';
import { UMLUseCaseInclude } from '../uml-use-case-include/uml-use-case-include';
import { UMLUseCaseAssociation } from './uml-use-case-association';
type OwnProps = {
    element: UMLUseCaseAssociation | UMLUseCaseGeneralization | UMLUseCaseInclude | UMLUseCaseExtend;
};
export declare const UMLUseCaseAssociationUpdate: React.ComponentClass<OwnProps, any>;
export {};
