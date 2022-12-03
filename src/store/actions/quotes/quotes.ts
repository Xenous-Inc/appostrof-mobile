import { ActionFlagsNames, HTTPMethod } from '../../constants';
import { Rests } from '@api/constants';
import { ICreateQuoteApiRequest, IDeleteQuoteApiRequest, IGetQuotesApiRequest } from '@api/types/quotes';
import {
    CreateQuoteActions,
    DeleteQuoteActions,
    GetQuotesActions,
    ICreateQuoteAction,
    IDeleteQuoteAction,
    IGetQuotesAction,
} from './types';

export const createGetQuotesAction = (raw: IGetQuotesApiRequest): IGetQuotesAction => ({
    type: GetQuotesActions.DEFAULT,
    payload: {
        method: HTTPMethod.Get,
        rest: Rests.Quotes.GET,
        data: raw,
    },
    flags: [
        {
            name: ActionFlagsNames.Api,
        },
    ],
});

export const createCreateQuoteAction = (raw: ICreateQuoteApiRequest): ICreateQuoteAction => ({
    type: CreateQuoteActions.DEFAULT,
    payload: {
        method: HTTPMethod.Post,
        rest: Rests.Quotes.CREATE,
        data: raw,
    },
    flags: [
        {
            name: ActionFlagsNames.Api,
        },
    ],
});

export const createDeleteQuoteAction = (raw: IDeleteQuoteApiRequest): IDeleteQuoteAction => ({
    type: DeleteQuoteActions.DEFAULT,
    payload: {
        method: HTTPMethod.Post,
        rest: Rests.Quotes.DELETE,
        data: raw,
    },
    flags: [
        {
            name: ActionFlagsNames.Api,
        },
    ],
});
