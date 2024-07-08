import React from 'react';
import { ICommunicationLinkMessage } from './uml-communiction-link-message';
type Props = {
    x: number;
    y: number;
    messages: ICommunicationLinkMessage[];
    fill?: string;
    directionIcon: string;
    textCentered?: boolean;
};
export declare const UmlCommunicationLinkTextComponent: React.FC<Props>;
export {};
