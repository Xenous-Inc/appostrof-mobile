import { IAction, IApiPayload, IFailedApiAction } from '../../types';
import {
    IAssignStoryWasReadApiRequest,
    IGetNewStoryApiRequest,
    IGetNewStoryApiResponse,
    IRateStoryApiRequest,
} from '@api/types/story';

export enum GET_NEW_STORY_ACTIONS {
    DEFAULT = 'GET_NEW_STORY',
    START = 'GET_NEW_STORY_START',
    SUCCESS = 'GET_NEW_STORY_SUCCESS',
    FAIL = 'GET_NEW_STORY_FAIL',
}

export type IGetNewStoryAction = IAction<GET_NEW_STORY_ACTIONS.DEFAULT, IApiPayload<IGetNewStoryApiRequest>>;

export type IGetNewStoryActionSuccess = IAction<
    GET_NEW_STORY_ACTIONS.SUCCESS,
    IGetNewStoryApiResponse,
    IGetNewStoryAction
>;

export type IGetNewStoryActionFail = IFailedApiAction<GET_NEW_STORY_ACTIONS.FAIL, IGetNewStoryAction>;

/**
 * ASSIGN STORY ACTIONS
 * */
export enum ASSIGN_STORY_WAS_READ_ACTIONS {
    DEFAULT = 'ASSIGN_STORY_WAS_READ',
    START = 'ASSIGN_STORY_WAS_READ_START',
    SUCCESS = 'ASSIGN_STORY_WAS_READ_SUCCESS',
    FAIL = 'ASSIGN_STORY_WAS_READ_FAIL',
}

export type IAssignStoryWasReadAction = IAction<
    ASSIGN_STORY_WAS_READ_ACTIONS.DEFAULT,
    IApiPayload<IAssignStoryWasReadApiRequest>
>;

export type IAssignStoryWasReadActionFail = IFailedApiAction<
    ASSIGN_STORY_WAS_READ_ACTIONS.FAIL,
    IAssignStoryWasReadAction
>;

/**
 * RATE STORY ACTIONS
 * */
export enum RATE_STORY_ACTIONS {
    DEFAULT = 'RATE_STORY',
    START = 'RATE_STORY_START',
    SUCCESS = 'RATE_STORY_SUCCESS',
    FAIL = 'RATE_STORY_FAIL',
}

export type IRateStoryAction = IAction<RATE_STORY_ACTIONS.DEFAULT, IApiPayload<IRateStoryApiRequest>>;

export type IRateStoryActionFail = IFailedApiAction<RATE_STORY_ACTIONS.FAIL, IRateStoryAction>;
