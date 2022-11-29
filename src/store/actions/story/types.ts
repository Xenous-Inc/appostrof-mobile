import { IAction, IApiPayload, IFailedApiAction, IStoragePayload } from '../../types';
import {
    IReadStoryApiRequest,
    IGetNewStoryApiRequest,
    IGetNewStoryApiResponse,
    IRateStoryApiRequest,
} from '@api/types/story';

const baseActions = (str: string) => ({
    DEFAULT: str,
    START: str + '_START',
    SUCCESS: str + '_SUCCESS',
    FAIL: str + '_FAIL',
});

/**
 * GET STORY ACTIONS
 * */
export const GetStoryActions = baseActions('GET_STORY');
type TGetStoryActions = typeof GetStoryActions;

export type IGetStoryAction = IAction<
    TGetStoryActions['DEFAULT'],
    IStoragePayload & IApiPayload<IGetNewStoryApiRequest>
>;

export type IGetStoryActionSuccess = IAction<TGetStoryActions['SUCCESS'], IGetNewStoryApiResponse, IGetStoryAction>;

export type IGetStoryActionFail = IFailedApiAction<TGetStoryActions['FAIL'], IGetStoryAction>;

/**
 * READ STORY ACTIONS
 * */
export const ReadStoryActions = baseActions('READ_STORY');
type TReadStoryActions = typeof ReadStoryActions;

export type IReadStoryAction = IAction<TReadStoryActions['DEFAULT'], IApiPayload<IReadStoryApiRequest>>;

export type IReadStoryActionFail = IFailedApiAction<TReadStoryActions['FAIL'], IReadStoryAction>;

/**
 * RATE STORY ACTIONS
 * */
export const RateStoryActions = baseActions('RATE_STORY');
type TRateStoryActions = typeof RateStoryActions;

export type IRateStoryAction = IAction<TRateStoryActions['DEFAULT'], IApiPayload<IRateStoryApiRequest>>;

export type IRateStoryActionFail = IFailedApiAction<TRateStoryActions['FAIL'], IRateStoryAction>;
