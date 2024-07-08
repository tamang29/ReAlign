import { AsyncAction } from '../../../utils/actions/actions';
import { IUMLElementPort } from '../../uml-element/uml-element-port';
export declare const Reconnectable: {
    /**
     * creates a StTartReconnectingAction
     * @param endpoint the endpoint which should be reconnected. This endpoint will be part of the new connection, the other one is replaced.
     * @param id relationship id / ids, if omitted -> take all relationships from selected state
     */
    startReconnecting: (endpoint: 'source' | 'target', id?: string | string[]) => AsyncAction;
    reconnect: (target: IUMLElementPort) => AsyncAction;
    endReconnecting: (id?: string | string[]) => AsyncAction;
};
