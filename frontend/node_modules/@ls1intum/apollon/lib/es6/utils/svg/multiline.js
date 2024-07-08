import React, { Component } from 'react';
const defaultProps = Object.freeze({
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    angle: 0,
    width: undefined,
    height: undefined,
    lineHeight: 16,
    capHeight: 11,
    scaleToFit: false,
    textAnchor: 'middle',
    verticalAnchor: 'middle',
});
const getInitialState = (props) => {
    const words = props.children ? props.children.toString().split(/\s+/) : [];
    return { wordsByLines: [{ words, width: 0 }] };
};
export class Multiline extends Component {
    constructor() {
        super(...arguments);
        this.state = getInitialState(this.props);
        this.spaceWidth = 0;
        this.wordsWithComputedWidth = [];
        this.shouldCalculateWidth = (previousProps) => {
            return (previousProps.children !== this.props.children ||
                previousProps.style !== this.props.style ||
                previousProps.width !== this.props.width ||
                previousProps.height !== this.props.height);
        };
        this.calculateWordWidths = (props) => {
            try {
                const words = props.children ? props.children.toString().split(/\s+/) : [];
                const wordsWithComputedWidth = words.map((word) => ({ word, width: this.getStringWidth(word, props.style) }));
                const spaceWidth = this.getStringWidth('\u00A0', props.style);
                return { wordsWithComputedWidth, spaceWidth };
            }
            catch (e) {
                return null;
            }
        };
    }
    componentDidMount() {
        this.updateWordsByLines(this.props, true);
    }
    componentDidUpdate(previousProps) {
        const needCalculate = this.shouldCalculateWidth(previousProps);
        if (needCalculate) {
            this.updateWordsByLines(this.props, needCalculate);
        }
    }
    getStringWidth(str, style) {
        try {
            // Calculate length of each word to be used to determine number of words per line
            const divElem = document.createElement('div');
            divElem.innerHTML = str;
            Object.assign(divElem.style, style);
            const width = this.calculateStringWidth(divElem, (el) => {
                return el.clientWidth + 2;
            });
            return width;
        }
        catch (e) {
            return 0;
        }
    }
    calculateStringWidth(divElem, fn) {
        divElem.style.visibility = 'hidden';
        divElem.style.position = 'absolute';
        document.body.appendChild(divElem);
        const result = fn(divElem);
        divElem.parentNode.removeChild(divElem);
        return result;
    }
    updateWordsByLines(props, needCalculate) {
        // Only perform calculations if using features that require them (multiline, scaleToFit)
        if (props.width || props.scaleToFit) {
            if (needCalculate) {
                const wordWidths = this.calculateWordWidths(props);
                if (wordWidths) {
                    const { wordsWithComputedWidth, spaceWidth } = wordWidths;
                    this.wordsWithComputedWidth = wordsWithComputedWidth;
                    this.spaceWidth = spaceWidth;
                }
                else {
                    this.updateWordsWithoutCalculate(props);
                    return;
                }
            }
            const wordsByLines = this.calculateWordsByLines(this.wordsWithComputedWidth, this.spaceWidth, props.width);
            this.setState({ wordsByLines });
        }
        else {
            this.updateWordsWithoutCalculate(props);
        }
    }
    updateWordsWithoutCalculate(props) {
        const words = props.children ? props.children.toString().split(/\s+/) : [];
        this.setState({ wordsByLines: [{ words, width: 0 }] });
    }
    calculateWordsByLines(wordsWithComputedWidth, spaceWidth, lineWidth) {
        const { scaleToFit } = this.props;
        return wordsWithComputedWidth.reduce((result, { word, width }) => {
            const currentLine = result[result.length - 1];
            if (currentLine && (!lineWidth || scaleToFit || currentLine.width + width + spaceWidth < lineWidth)) {
                // Word can be added to an existing line
                currentLine.words.push(word);
                currentLine.width += width + spaceWidth;
            }
            else {
                // Add first word to line or word is too long to scaleToFit on existing line
                const newLine = { words: [word], width };
                result.push(newLine);
            }
            return result;
        }, []);
    }
    render() {
        const { x, y, dx, dy, textAnchor, verticalAnchor, scaleToFit, angle, lineHeight, capHeight, fill, ...textProps } = this.props;
        const { wordsByLines } = this.state;
        const xPosition = x + dx;
        const yPosition = y + dy;
        let startDy;
        switch (verticalAnchor) {
            case 'start':
                startDy = capHeight;
                break;
            case 'middle':
                startDy = ((wordsByLines.length - 1) / 2) * -lineHeight + capHeight / 2;
                break;
            default:
                startDy = wordsByLines.length - 1 * -lineHeight;
                break;
        }
        const transforms = [];
        if (scaleToFit && wordsByLines.length) {
            const lineWidth = wordsByLines[0].width;
            const sx = (this.props.width || 0) / lineWidth;
            const sy = sx;
            const originX = xPosition - sx * xPosition;
            const originY = yPosition - sy * yPosition;
            transforms.push(`matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`);
        }
        if (angle) {
            transforms.push(`rotate(${angle}, ${xPosition}, ${yPosition})`);
        }
        if (transforms.length) {
            textProps.transform = transforms.join(' ');
        }
        return (React.createElement("text", { style: fill ? { fill } : {}, x: xPosition, y: yPosition, textAnchor: textAnchor, ...textProps, pointerEvents: "none" }, wordsByLines.map((line, index) => (React.createElement("tspan", { x: xPosition, dy: index === 0 ? startDy : lineHeight, key: index }, line.words.join(' '))))));
    }
}
Multiline.defaultProps = defaultProps;
//# sourceMappingURL=multiline.js.map