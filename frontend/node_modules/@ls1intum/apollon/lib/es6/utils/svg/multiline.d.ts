import React, { Component, CSSProperties, SVGProps } from 'react';
declare const defaultProps: Readonly<{
    x: number;
    y: number;
    dx: number;
    dy: number;
    angle: number;
    width: number | undefined;
    height: number | undefined;
    lineHeight: number;
    capHeight: number;
    scaleToFit: false;
    textAnchor: "end" | "start" | "middle" | "inherit";
    verticalAnchor: "end" | "start" | "middle";
}>;
declare const getInitialState: (props: Props) => {
    wordsByLines: {
        words: string[];
        width: number;
    }[];
};
type Props = {
    children: string;
} & SVGProps<SVGTextElement> & typeof defaultProps;
type State = typeof getInitialState;
export declare class Multiline extends Component<Props, State> {
    static defaultProps: Readonly<{
        x: number;
        y: number;
        dx: number;
        dy: number;
        angle: number;
        width: number | undefined;
        height: number | undefined;
        lineHeight: number;
        capHeight: number;
        scaleToFit: false;
        textAnchor: "end" | "start" | "middle" | "inherit";
        verticalAnchor: "end" | "start" | "middle";
    }>;
    state: {
        wordsByLines: {
            words: string[];
            width: number;
        }[];
    };
    spaceWidth: number;
    wordsWithComputedWidth: {
        word: string;
        width: number;
    }[];
    componentDidMount(): void;
    componentDidUpdate(previousProps: Readonly<Props>): void;
    shouldCalculateWidth: (previousProps: Readonly<Props>) => boolean;
    calculateWordWidths: (props: Readonly<Props>) => {
        wordsWithComputedWidth: {
            word: string;
            width: number;
        }[];
        spaceWidth: number;
    } | null;
    getStringWidth(str: string, style?: CSSProperties): number;
    calculateStringWidth(divElem: any, fn: any): any;
    updateWordsByLines(props: Readonly<Props>, needCalculate: boolean): void;
    updateWordsWithoutCalculate(props: Readonly<Props>): void;
    calculateWordsByLines(wordsWithComputedWidth: {
        word: string;
        width: number;
    }[], spaceWidth: number, lineWidth?: number): {
        words: string[];
        width: number;
    }[];
    render(): React.JSX.Element;
}
export {};
