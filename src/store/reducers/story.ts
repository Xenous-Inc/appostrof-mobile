import { createReducer } from '@reduxjs/toolkit';
import {
    ReadStoryActions,
    GetStoryActions,
    IReadStoryActionFail,
    IGetStoryActionFail,
    IGetStoryActionSuccess,
    IRateStoryActionFail,
    RateStoryActions,
} from '../actions/story/types';
import { IApiState } from '../types';
import logs from '@utils/logs';
import IStory from '@models/story';

export interface IStoryState extends IApiState {
    story?: IStory;
}

const initialState: IStoryState = {
    story: undefined,
    isLoading: false,
    error: null,
};

const storyReducer = createReducer(initialState, {
    // * Get New Story * //
    [GetStoryActions.START]: state => {
        logs.redux.debug('GET_STORY_ACTION | Request pending');

        return {
            ...state,
            isLoading: true,
            error: null,
        };
    },
    [GetStoryActions.SUCCESS]: (state, action: IGetStoryActionSuccess) => {
        logs.redux.debug('GET_STORY_ACTION | Request ended with success');

        const story = action.payload.story;

        logs.redux.debug('GET_STORY_ACTION | New Story state', story);

        return {
            ...state,
            isLoading: false,
            story: story,
            error: null,
        };
    },
    [GetStoryActions.FAIL]: (state, action: IGetStoryActionFail) => {
        logs.redux.error(`GET_STORY_ACTION | Request ended with fail. Error: ${action.payload.error}.`);

        return {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
    },
    // * Assign Story Was Read * //
    [ReadStoryActions.START]: state => {
        logs.redux.debug('READ_STORY_ACTION | Request pending');

        return {
            ...state,
            isLoading: true,
            error: null,
        };
    },
    [ReadStoryActions.SUCCESS]: state => {
        logs.redux.debug('READ_STORY_ACTION | Request ended with success');

        return {
            ...state,
            isLoading: false,
            error: null,
        };
    },
    [ReadStoryActions.FAIL]: (state, action: IReadStoryActionFail) => {
        logs.redux.error(`READ_STORY_ACTION | Request ended with fail. Error: ${action.payload.error}.`);

        return {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
    },
    // * Rate Story * //
    [RateStoryActions.START]: state => {
        logs.redux.debug('RATE_STORY_ACTION | Request pending');

        return {
            ...state,
            isLoading: true,
            error: null,
        };
    },
    [RateStoryActions.SUCCESS]: state => {
        logs.redux.debug('RATE_STORY_ACTION | Request ended with success');

        return {
            ...state,
            isLoading: false,
            error: null,
        };
    },
    [RateStoryActions.FAIL]: (state, action: IRateStoryActionFail) => {
        logs.redux.error(`RATE_STORY_ACTION | Request ended with fail. Error: ${action.payload.error}.`);

        return {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
    },
});

export default storyReducer;
