import { IAction, IStoragePayload } from '../types';
import { readData } from '@utils/storage';
import { ActionFlagsNames } from '../constants';
import { Ends } from '../actions/constants';
import { changeType, flagCheck } from '../utils';

const storageMiddleware = () => (next: any) => async (action: IAction<string, IStoragePayload>) => {
    if (
        !action.payload ||
        !action.type.endsWith(Ends.DEFAULT) ||
        !action.flags ||
        !flagCheck(ActionFlagsNames.Storage, action.flags)
    ) {
        next(action);
        return;
    }

    const { key } = action.payload;
    const prevAction = action;

    const data = await readData<any>(key);
    if (!data) {
        next(action);
        return;
    }

    next({
        type: changeType(action.type, Ends.SUCCESS),
        payload: data,
        prevAction,
    });
};

export default storageMiddleware;
