"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multiline = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var defaultProps = Object.freeze({
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
var getInitialState = function (props) {
    var words = props.children ? props.children.toString().split(/\s+/) : [];
    return { wordsByLines: [{ words: words, width: 0 }] };
};
var Multiline = /** @class */ (function (_super) {
    tslib_1.__extends(Multiline, _super);
    function Multiline() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState(_this.props);
        _this.spaceWidth = 0;
        _this.wordsWithComputedWidth = [];
        _this.shouldCalculateWidth = function (previousProps) {
            return (previousProps.children !== _this.props.children ||
                previousProps.style !== _this.props.style ||
                previousProps.width !== _this.props.width ||
                previousProps.height !== _this.props.height);
        };
        _this.calculateWordWidths = function (props) {
            try {
                var words = props.children ? props.children.toString().split(/\s+/) : [];
                var wordsWithComputedWidth = words.map(function (word) { return ({ word: word, width: _this.getStringWidth(word, props.style) }); });
                var spaceWidth = _this.getStringWidth('\u00A0', props.style);
                return { wordsWithComputedWidth: wordsWithComputedWidth, spaceWidth: spaceWidth };
            }
            catch (e) {
                return null;
            }
        };
        return _this;
    }
    Multiline.prototype.componentDidMount = function () {
        this.updateWordsByLines(this.props, true);
    };
    Multiline.prototype.componentDidUpdate = function (previousProps) {
        var needCalculate = this.shouldCalculateWidth(previousProps);
        if (needCalculate) {
            this.updateWordsByLines(this.props, needCalculate);
        }
    };
    Multiline.prototype.getStringWidth = function (str, style) {
        try {
            // Calculate length of each word to be used to determine number of words per line
            var divElem = document.createElement('div');
            divElem.innerHTML = str;
            Object.assign(divElem.style, style);
            var width = this.calculateStringWidth(divElem, function (el) {
                return el.clientWidth + 2;
            });
            return width;
        }
        catch (e) {
            return 0;
        }
    };
    Multiline.prototype.calculateStringWidth = function (divElem, fn) {
        divElem.style.visibility = 'hidden';
        divElem.style.position = 'absolute';
        document.body.appendChild(divElem);
        var result = fn(divElem);
        divElem.parentNode.removeChild(divElem);
        return result;
    };
    Multiline.prototype.updateWordsByLines = function (props, needCalculate) {
        // Only perform calculations if using features that require them (multiline, scaleToFit)
        if (props.width || props.scaleToFit) {
            if (needCalculate) {
                var wordWidths = this.calculateWordWidths(props);
                if (wordWidths) {
                    var wordsWithComputedWidth = wordWidths.wordsWithComputedWidth, spaceWidth = wordWidths.spaceWidth;
                    this.wordsWithComputedWidth = wordsWithComputedWidth;
                    this.spaceWidth = spaceWidth;
                }
                else {
                    this.updateWordsWithoutCalculate(props);
                    return;
                }
            }
            var wordsByLines = this.calculateWordsByLines(this.wordsWithComputedWidth, this.spaceWidth, props.width);
            this.setState({ wordsByLines: wordsByLines });
        }
        else {
            this.updateWordsWithoutCalculate(props);
        }
    };
    Multiline.prototype.updateWordsWithoutCalculate = function (props) {
        var words = props.children ? props.children.toString().split(/\s+/) : [];
        this.setState({ wordsByLines: [{ words: words, width: 0 }] });
    };
    Multiline.prototype.calculateWordsByLines = function (wordsWithComputedWidth, spaceWidth, lineWidth) {
        var scaleToFit = this.props.scaleToFit;
        return wordsWithComputedWidth.reduce(function (result, _a) {
            var word = _a.word, width = _a.width;
            var currentLine = result[result.length - 1];
            if (currentLine && (!lineWidth || scaleToFit || currentLine.width + width + spaceWidth < lineWidth)) {
                // Word can be added to an existing line
                currentLine.words.push(word);
                currentLine.width += width + spaceWidth;
            }
            else {
                // Add first word to line or word is too long to scaleToFit on existing line
                var newLine = { words: [word], width: width };
                result.push(newLine);
            }
            return result;
        }, []);
    };
    Multiline.prototype.render = function () {
        var _a = this.props, x = _a.x, y = _a.y, dx = _a.dx, dy = _a.dy, textAnchor = _a.textAnchor, verticalAnchor = _a.verticalAnchor, scaleToFit = _a.scaleToFit, angle = _a.angle, lineHeight = _a.lineHeight, capHeight = _a.capHeight, fill = _a.fill, textProps = tslib_1.__rest(_a, ["x", "y", "dx", "dy", "textAnchor", "verticalAnchor", "scaleToFit", "angle", "lineHeight", "capHeight", "fill"]);
        var wordsByLines = this.state.wordsByLines;
        var xPosition = x + dx;
        var yPosition = y + dy;
        var startDy;
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
        var transforms = [];
        if (scaleToFit && wordsByLines.length) {
            var lineWidth = wordsByLines[0].width;
            var sx = (this.props.width || 0) / lineWidth;
            var sy = sx;
            var originX = xPosition - sx * xPosition;
            var originY = yPosition - sy * yPosition;
            transforms.push("matrix(".concat(sx, ", 0, 0, ").concat(sy, ", ").concat(originX, ", ").concat(originY, ")"));
        }
        if (angle) {
            transforms.push("rotate(".concat(angle, ", ").concat(xPosition, ", ").concat(yPosition, ")"));
        }
        if (transforms.length) {
            textProps.transform = transforms.join(' ');
        }
        return (react_1.default.createElement("text", tslib_1.__assign({ style: fill ? { fill: fill } : {}, x: xPosition, y: yPosition, textAnchor: textAnchor }, textProps, { pointerEvents: "none" }), wordsByLines.map(function (line, index) { return (react_1.default.createElement("tspan", { x: xPosition, dy: index === 0 ? startDy : lineHeight, key: index }, line.words.join(' '))); })));
    };
    Multiline.defaultProps = defaultProps;
    return Multiline;
}(react_1.Component));
exports.Multiline = Multiline;
//# sourceMappingURL=multiline.js.map