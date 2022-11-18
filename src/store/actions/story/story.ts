import { IAssignStoryWasReadApiRequest, IGetNewStoryApiRequest, IRateStoryApiRequest } from '@api/types/story';
import {
    ASSIGN_STORY_WAS_READ_ACTIONS,
    GET_NEW_STORY_ACTIONS,
    IAssignStoryWasReadAction,
    IGetNewStoryAction,
    IRateStoryAction,
    RATE_STORY_ACTIONS,
} from './types';

import { RESTS } from '@api/constants';

export const createGetNewStoryAction = (raw: IGetNewStoryApiRequest): IGetNewStoryAction => ({
    type: GET_NEW_STORY_ACTIONS.DEFAULT,
    payload: {
        method: 'GET',
        rest: RESTS.STORY.GET,
        data: raw,
    },
});

export const createAssignStoryWasReadAction = (raw: IAssignStoryWasReadApiRequest): IAssignStoryWasReadAction => ({
    type: ASSIGN_STORY_WAS_READ_ACTIONS.DEFAULT,
    payload: {
        method: 'POST',
        rest: RESTS.STORY.READ,
        data: raw,
    },
});

export const createRateStoryAction = (raw: IRateStoryApiRequest): IRateStoryAction => ({
    type: RATE_STORY_ACTIONS.DEFAULT,
    payload: {
        method: 'POST',
        rest: RESTS.STORY.RATE,
        data: raw,
    },
});
