import { ILayer } from '../../services/layouter/layer';
export declare class Text {
    static size: (layer: ILayer, value: string, styles?: Partial<CSSStyleDeclaration>) => {
        width: number;
        height: number;
    };
}
