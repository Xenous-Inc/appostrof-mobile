import { createReducer } from '@reduxjs/toolkit';
import {
    ASSIGN_STORY_WAS_READ_ACTIONS,
    GET_NEW_STORY_ACTIONS,
    IAssignStoryWasReadActionFail,
    IGetNewStoryActionFail,
    IGetNewStoryActionSuccess,
    IRateStoryActionFail,
    RATE_STORY_ACTIONS,
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
    [GET_NEW_STORY_ACTIONS.START]: state => {
        logs.redux.debug('GET_NEW_STORY_ACTION | Request pending');

        return {
            ...state,
            isLoading: true,
            error: null,
        };
    },
    [GET_NEW_STORY_ACTIONS.SUCCESS]: (state, action: IGetNewStoryActionSuccess) => {
        logs.redux.debug('GET_NEW_STORY_ACTION | Request ended with success');

        const newStory = action.payload.story;

        logs.redux.debug('GET_NEW_STORY_ACTION | New Story state', newStory);

        return {
            ...state,
            isLoading: false,
            story: newStory,
            error: null,
        };
    },
    [GET_NEW_STORY_ACTIONS.FAIL]: (state, action: IGetNewStoryActionFail) => {
        logs.redux.error(`GET_NEW_STORY_ACTION | Request ended with fail. Error: ${action.payload.error}.`);

        return {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
    },
    // * Assign Story Was Read * //
    [ASSIGN_STORY_WAS_READ_ACTIONS.START]: state => {
        logs.redux.debug('ASSIGN_STORY_WAS_READ_ACTION | Request pending');

        return {
            ...state,
            isLoading: true,
            error: null,
        };
    },
    // TODO get rid of unused parameter
    [ASSIGN_STORY_WAS_READ_ACTIONS.SUCCESS]: state => {
        logs.redux.debug('ASSIGN_STORY_WAS_READ_ACTION | Request ended with success');

        return {
            ...state,
            isLoading: false,
            error: null,
        };
    },
    [ASSIGN_STORY_WAS_READ_ACTIONS.FAIL]: (state, action: IAssignStoryWasReadActionFail) => {
        logs.redux.error(`ASSIGN_STORY_WAS_READ_ACTION | Request ended with fail. Error: ${action.payload.error}.`);

        return {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
    },
    // * Rate Story * //
    [RATE_STORY_ACTIONS.START]: state => {
        logs.redux.debug('RATE_STORY_ACTION | Request pending');

        return {
            ...state,
            isLoading: true,
            error: null,
        };
    },
    // TODO get rid of unused parameter
    [RATE_STORY_ACTIONS.SUCCESS]: state => {
        logs.redux.debug('RATE_STORY_ACTION | Request ended with success');

        return {
            ...state,
            isLoading: false,
            error: null,
        };
    },
    [RATE_STORY_ACTIONS.FAIL]: (state, action: IRateStoryActionFail) => {
        logs.redux.error(`RATE_STORY_ACTION | Request ended with fail. Error: ${action.payload.error}.`);

        return {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
    },
});

export default storyReducer;
