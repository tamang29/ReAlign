import { SAGA_ACTION } from '@redux-saga/symbols';
import { all, call, spawn } from 'redux-saga/effects';
export const isInternal = (action) => {
    return SAGA_ACTION in action;
};
export function composeSaga(sagas) {
    return all(sagas.map(spawn));
}
export function run(sagas) {
    return all(sagas.map((saga) => keepAlive(safely(saga))));
}
export const keepAlive = (saga) => {
    return spawn(function* () {
        while (true) {
            yield call(saga);
        }
    });
};
export const safely = (saga) => {
    function* safelySaga() {
        try {
            yield call(saga);
        }
        catch (e) {
            // tslint:disable-next-line
            console.error(e);
        }
    }
    return safelySaga;
};
//# sourceMappingURL=sagas.js.map