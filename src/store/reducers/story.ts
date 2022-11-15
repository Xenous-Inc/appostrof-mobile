import { createReducer } from '@reduxjs/toolkit';
import { GET_NEW_STORY_ACTIONS, IGetNewStoryActionFail, IGetNewStoryActionSuccess } from '../actions/story/types';
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

        return {
            ...state,
            isLoading: false,
            story: action.payload.story,
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
});

export default storyReducer;
