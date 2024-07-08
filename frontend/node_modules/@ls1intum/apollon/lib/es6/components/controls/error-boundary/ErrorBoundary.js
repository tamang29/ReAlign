import * as React from 'react';
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true, error });
    }
    render() {
        if (this.state.hasError && this.state.error) {
            // restore the state immediately
            this.props.onError(this.state.error);
            return null;
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary.js.map