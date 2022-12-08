import { IApiState } from '../types';
import { createReducer } from '@reduxjs/toolkit';
import logs from '@utils/logs';
import IQuote from '@models/quote';
import {
    CreateQuoteActions,
    DeleteQuoteActions,
    GetQuotesActions,
    ICreateQuoteActionFail,
    IDeleteQuoteActionFail,
    IGetQuotesActionFail,
    IGetQuotesActionSuccess,
} from '../actions/quotes/types';

export interface IQuotesState extends IApiState {
    quotes?: Array<IQuote>;
}

const initialState: IQuotesState = {
    quotes: [],
    isLoading: false,
    error: null,
};

const quotesReducer = createReducer(initialState, {
    // * Get Quotes * //
    [GetQuotesActions.START]: state => {
        logs.redux.debug('GET_QUOTES_ACTION | Request pending');

        return {
            ...state,
            isLoading: true,
            error: null,
        };
    },
    [GetQuotesActions.SUCCESS]: (state, action: IGetQuotesActionSuccess) => {
        logs.redux.debug('GET_QUOTES_ACTION | Request ended with success');

        const quotes = action.payload.quotes;

        logs.redux.debug('GET_QUOTES_ACTION | New Quotes state', quotes);

        return {
            ...state,
            isLoading: false,
            quotes: quotes,
            error: null,
        };
    },
    [GetQuotesActions.FAIL]: (state, action: IGetQuotesActionFail) => {
        logs.redux.error(`GET_QUOTES_ACTION | Request ended with fail. Error: ${action.payload.error}.`);

        return {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
    },
    // * Create Quote * //
    [CreateQuoteActions.START]: state => {
        logs.redux.debug('CREATE_QUOTE_ACTION | Request pending');

        return {
            ...state,
            isLoading: true,
            error: null,
        };
    },
    [CreateQuoteActions.SUCCESS]: state => {
        logs.redux.debug('CREATE_QUOTE_ACTION | Request ended with success');

        return {
            ...state,
            isLoading: false,
            error: null,
        };
    },
    [CreateQuoteActions.FAIL]: (state, action: ICreateQuoteActionFail) => {
        logs.redux.error(`CREATE_QUOTE_ACTION | Request ended with fail. Error: ${action.payload.error}.`);

        return {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
    },
    // * Delete Quote * //
    [DeleteQuoteActions.START]: state => {
        logs.redux.debug('DELETE_QUOTE_ACTION | Request pending');

        return {
            ...state,
            isLoading: true,
            error: null,
        };
    },
    [DeleteQuoteActions.SUCCESS]: state => {
        logs.redux.debug('DELETE_QUOTE_ACTION | Request ended with success');

        return {
            ...state,
            isLoading: false,
            error: null,
        };
    },
    [DeleteQuoteActions.FAIL]: (state, action: IDeleteQuoteActionFail) => {
        logs.redux.error(`DELETE_QUOTE_ACTION | Request ended with fail. Error: ${action.payload.error}.`);

        return {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
    },
});

export default quotesReducer;
