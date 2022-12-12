import { IAction } from '../types';
import { Ends } from '../actions/constants';
import { ActionFlagsNames } from '../constants';
import { GetStoryActions } from '../actions/story/types';
import { flagCheck } from '../utils';

const storageFinalizerMiddleware = () => (next: any) => async (action: IAction<string, any, IAction<string, any>>) => {
    next(action);

    const prev = action.prevAction;
    if (!prev || !action.type.endsWith(Ends.SUCCESS) || !flagCheck(ActionFlagsNames.Storage, action.flags)) {
        return;
    }

    if (prev.type === GetStoryActions.DEFAULT && action.payload.dateOfReading !== new Date().toLocaleDateString('ru')) {
        next(prev);
    }
};

export default storageFinalizerMiddleware;
