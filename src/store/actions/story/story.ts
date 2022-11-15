import { IGetNewStoryApiRequest } from '../../../api/types/story';
import { GET_NEW_STORY_ACTIONS, IGetNewStoryAction } from './types';

import { RESTS } from '../../../api/constants';

export const createGetNewStoryAction = (raw: IGetNewStoryApiRequest): IGetNewStoryAction => ({
    type: GET_NEW_STORY_ACTIONS.DEFAULT,
    payload: {
        method: 'GET',
        rest: RESTS.STORY,
        data: raw,
    },
});
