"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeSyntaxTreePreview = void 0;
var syntax_tree_terminal_1 = require("./syntax-tree-terminal/syntax-tree-terminal");
var syntax_tree_nonterminal_1 = require("./syntax-tree-nonterminal/syntax-tree-nonterminal");
var composeSyntaxTreePreview = function (layer, translate) {
    var elements = [];
    var defaultBounds = { x: 0, y: 0, width: 100, height: 50 };
    elements.push(new syntax_tree_nonterminal_1.SyntaxTreeNonterminal({ name: '', bounds: defaultBounds }));
    elements.push(new syntax_tree_terminal_1.SyntaxTreeTerminal({ name: '', bounds: defaultBounds }));
    return elements;
};
exports.composeSyntaxTreePreview = composeSyntaxTreePreview;
//# sourceMappingURL=syntax-tree-preview.js.map