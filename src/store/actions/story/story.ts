import { IReadStoryApiRequest, IGetNewStoryApiRequest, IRateStoryApiRequest } from '@api/types/story';
import {
    ReadStoryActions,
    GetStoryActions,
    IReadStoryAction,
    IGetStoryAction,
    IRateStoryAction,
    RateStoryActions,
} from './types';

import { Rests } from '@api/constants';
import { StorageKeys } from '@utils/storage';
import { ActionFlagsNames, HTTPMethod } from '../../constants';

export const createGetStoryAction = (raw: IGetNewStoryApiRequest): IGetStoryAction => ({
    type: GetStoryActions.DEFAULT,
    payload: {
        method: HTTPMethod.Get,
        rest: Rests.Story.GET,
        data: raw,
        key: StorageKeys.STORY_CACHE,
    },
    flags: [
        {
            name: ActionFlagsNames.Storage,
        },
        {
            name: ActionFlagsNames.Api,
        },
    ],
});

export const createReadStoryAction = (raw: IReadStoryApiRequest): IReadStoryAction => ({
    type: ReadStoryActions.DEFAULT,
    payload: {
        method: HTTPMethod.Post,
        rest: Rests.Story.READ,
        data: raw,
    },
    flags: [
        {
            name: ActionFlagsNames.Api,
        },
    ],
});

export const createRateStoryAction = (raw: IRateStoryApiRequest): IRateStoryAction => ({
    type: RateStoryActions.DEFAULT,
    payload: {
        method: HTTPMethod.Post,
        rest: Rests.Story.RATE,
        data: raw,
    },
    flags: [
        {
            name: ActionFlagsNames.Api,
        },
    ],
});
