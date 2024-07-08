import React from 'react';
import { Textfield } from '../../../components/controls/textfield/textfield';
import { IUMLElement } from '../../../services/uml-element/uml-element';
type Props = {
    id: string;
    onRefChange: (instance: Textfield<any>) => void;
    value: string;
    onChange: (id: string, values: {
        name?: string;
        fillColor?: string;
        textColor?: string;
        lineColor?: string;
    }) => void;
    onSubmitKeyUp: () => void;
    onDelete: (id: string) => () => void;
    element: IUMLElement;
};
declare const UmlAttributeUpdate: ({ id, onRefChange, value, onChange, onSubmitKeyUp, onDelete, element }: Props) => React.JSX.Element;
export default UmlAttributeUpdate;
