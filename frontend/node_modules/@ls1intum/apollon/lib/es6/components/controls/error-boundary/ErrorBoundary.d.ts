import * as React from 'react';
import { ErrorInfo } from 'react';
type Props = {
    onError: (error: Error) => void;
    children?: React.ReactNode;
};
type State = {
    hasError: boolean;
    error?: Error;
};
export declare class ErrorBoundary extends React.Component<Props & React.PropsWithChildren, State> {
    constructor(props: Props);
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): React.ReactNode;
}
export {};
