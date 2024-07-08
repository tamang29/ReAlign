import React, { ComponentType } from 'react';
import { CanvasContext } from './canvas-context';
export declare const withCanvas: <P extends CanvasContext, C extends React.Component<{}, {}, any>>(WrappedComponent: ComponentType<P>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<Pick<P, Exclude<keyof P, "canvas">>> & React.RefAttributes<C>>;
