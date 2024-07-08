"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lighten = exports.darken = void 0;
var tslib_1 = require("tslib");
function hexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result)
        return { h: 0, s: 0, l: 0 };
    var r = parseInt(result[1], 16) / 255;
    var g = parseInt(result[2], 16) / 255;
    var b = parseInt(result[3], 16) / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}
function hslToHex(_a) {
    var h = _a.h, s = _a.s, l = _a.l;
    var r = 0;
    var g = 0;
    var b = 0;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var hue2rgb = function (p1, q1, t1) {
            if (t1 < 0)
                t1 += 1;
            if (t1 > 1)
                t1 -= 1;
            if (t1 < 1 / 6)
                return p1 + (q1 - p1) * 6 * t1;
            if (t1 < 1 / 2)
                return q1;
            if (t1 < 2 / 3)
                return p1 + (q1 - p1) * (2 / 3 - t1) * 6;
            return p1;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    var checkHex = function (v) {
        return 1 === v.length ? '0' + v : v;
    };
    return '#' + checkHex(r.toString(16)) + checkHex(g.toString(16)) + checkHex(b.toString(16));
}
var mix = function (color1, color2, weight) {
    color1 = color1.replace(/#/g, '');
    color2 = color2.replace(/#/g, '');
    var d2h = function (d) {
        return d.toString(16);
    }; // convert a decimal value to hex
    var h2d = function (h) {
        return parseInt(h, 16);
    }; // convert a hex value to decimal
    weight = typeof weight !== 'undefined' ? weight : 50; // set the weight to 50%, if that argument is omitted
    var color = '#';
    for (var i = 0; i <= 5; i += 2) {
        // loop through each of the 3 hex pairs—red, green, and blue
        var v1 = h2d(color1.substr(i, 2)); // extract the current pairs
        var v2 = h2d(color2.substr(i, 2));
        // combine the current pairs from each source color, according to the specified weight
        var val = d2h(Math.round(v2 + (v1 - v2) * (weight / 100.0)));
        while (val.length < 2) {
            val = '0' + val;
        } // prepend a '0' if val results in a single digit
        color += val; // concatenate val to our new color string
    }
    return color; // PROFIT!
};
var darken = function (color, amount) {
    var hsl = hexToHSL(color);
    var result = tslib_1.__assign(tslib_1.__assign({}, hsl), { l: hsl.l - amount / 100 });
    return hslToHex(result);
};
exports.darken = darken;
var lighten = function (color, amount) {
    var hsl = hexToHSL(color);
    var result = tslib_1.__assign(tslib_1.__assign({}, hsl), { l: hsl.l + amount / 100 });
    return hslToHex(result);
};
exports.lighten = lighten;
//# sourceMappingURL=color.js.map