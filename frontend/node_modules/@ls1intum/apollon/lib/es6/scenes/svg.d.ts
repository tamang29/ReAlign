import React, { Component } from 'react';
import { DeepPartial } from 'redux';
import { Styles } from '../components/theme/styles';
import { UMLElement } from '../services/uml-element/uml-element';
import * as Apollon from '../typings';
import { IBoundary } from '../utils/geometry/boundary';
type Props = {
    model: Apollon.UMLModel;
    options?: Apollon.ExportOptions;
    styles?: DeepPartial<Styles>;
};
type State = {
    bounds: IBoundary;
    elements: UMLElement[];
};
export declare class Svg extends Component<Props, State> {
    state: State;
    render(): React.JSX.Element;
}
export {};
