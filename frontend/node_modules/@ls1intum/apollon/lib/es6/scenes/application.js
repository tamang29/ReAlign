import React from 'react';
import { Canvas } from '../components/canvas/canvas';
import { CanvasProvider } from '../components/canvas/canvas-context';
import { Editor } from '../components/canvas/editor';
import { KeyboardEventListener } from '../components/canvas/keyboard-eventlistener';
import { DraggableLayer } from '../components/draggable/draggable-layer';
import { I18nProvider } from '../components/i18n/i18n-provider';
import { Sidebar } from '../components/sidebar/sidebar-component';
import { StoreProvider } from '../components/store/model-store';
import { Theme } from '../components/theme/theme';
import { UpdatePane } from '../components/update-pane/update-pane';
import { Layout } from './application-styles';
import { RootProvider } from '../components/root/root-context';
import { MouseEventListener } from '../components/canvas/mouse-eventlistener';
const initialState = Object.freeze({
    canvas: null,
    root: null,
});
export class Application extends React.Component {
    constructor() {
        super(...arguments);
        this.state = initialState;
        this.resolveInitialized = () => undefined;
        this.initializedPromise = new Promise((resolve) => {
            this.resolveInitialized = resolve;
        });
        this.setCanvas = (ref) => {
            if (ref && ref.layer.current) {
                this.setState({ canvas: { ...ref, layer: ref.layer.current } });
            }
        };
        this.setLayout = (ref) => {
            if (ref) {
                this.setState({ root: ref });
            }
        };
    }
    render() {
        const canvasContext = this.state.canvas ? { canvas: this.state.canvas } : null;
        const rootContext = this.state.root ? { root: this.state.root } : null;
        return (React.createElement(CanvasProvider, { value: canvasContext },
            React.createElement(RootProvider, { value: rootContext },
                React.createElement(StoreProvider, { initialState: this.props.state, patcher: this.props.patcher, ref: (ref) => {
                        this.store ??= ref;
                        this.resolveInitialized();
                    } },
                    React.createElement(I18nProvider, { locale: this.props.locale },
                        React.createElement(Theme, { styles: this.props.styles },
                            React.createElement(Layout, { className: "apollon-editor", ref: this.setLayout }, rootContext && (React.createElement(DraggableLayer, null,
                                canvasContext && (React.createElement(React.Fragment, null,
                                    React.createElement(UpdatePane, null),
                                    React.createElement(Sidebar, null),
                                    React.createElement(KeyboardEventListener, null))),
                                React.createElement(Editor, null,
                                    React.createElement(Canvas, { ref: this.setCanvas })),
                                canvasContext && (React.createElement(React.Fragment, null,
                                    React.createElement(MouseEventListener, null))))))))))));
    }
    get initialized() {
        return this.initializedPromise;
    }
}
//# sourceMappingURL=application.js.map