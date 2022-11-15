import { IAction, IApiPayload, IFailedApiAction } from '../../types';
import { IGetNewStoryApiRequest, IGetNewStoryApiResponse } from '../../../api/types/story';

export enum GET_NEW_STORY_ACTIONS {
    DEFAULT = 'GET_NEW_STORY',
    START = 'GET_NEW_STORY_START',
    SUCCESS = 'GET_NEW_STORY_SUCCESS',
    FAIL = 'GET_NEW_STORY_FAIL',
}

export type IGetNewStoryAction = IAction<GET_NEW_STORY_ACTIONS.DEFAULT, IApiPayload<IGetNewStoryApiRequest>>;

export type IGetNewStoryActionStart = IAction<GET_NEW_STORY_ACTIONS.START, undefined, IGetNewStoryAction>;

export type IGetNewStoryActionSuccess = IAction<
    GET_NEW_STORY_ACTIONS.SUCCESS,
    IGetNewStoryApiResponse,
    IGetNewStoryAction
>;

export type IGetNewStoryActionFail = IFailedApiAction<GET_NEW_STORY_ACTIONS.FAIL, IGetNewStoryAction>;
