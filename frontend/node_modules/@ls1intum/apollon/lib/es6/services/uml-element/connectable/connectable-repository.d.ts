import { AsyncAction } from '../../../utils/actions/actions';
import { Direction, IUMLElementPort } from '../uml-element-port';
export declare const Connectable: {
    startConnecting: (direction: Direction | Direction[], id?: string | string[]) => AsyncAction;
    connect: (target: IUMLElementPort | IUMLElementPort[], source?: IUMLElementPort | IUMLElementPort[]) => AsyncAction;
    endConnecting: (port?: IUMLElementPort | IUMLElementPort[]) => AsyncAction;
};
