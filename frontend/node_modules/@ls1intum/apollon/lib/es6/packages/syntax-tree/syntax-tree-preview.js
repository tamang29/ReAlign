import { SyntaxTreeTerminal } from './syntax-tree-terminal/syntax-tree-terminal';
import { SyntaxTreeNonterminal } from './syntax-tree-nonterminal/syntax-tree-nonterminal';
export const composeSyntaxTreePreview = (layer, translate) => {
    const elements = [];
    const defaultBounds = { x: 0, y: 0, width: 100, height: 50 };
    elements.push(new SyntaxTreeNonterminal({ name: '', bounds: defaultBounds }));
    elements.push(new SyntaxTreeTerminal({ name: '', bounds: defaultBounds }));
    return elements;
};
//# sourceMappingURL=syntax-tree-preview.js.map