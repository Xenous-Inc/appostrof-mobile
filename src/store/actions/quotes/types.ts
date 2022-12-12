import { baseActions } from '../constants';
import { IAction, IApiPayload, IFailedApiAction } from '../../types';
import {
    ICreateQuoteApiRequest,
    IDeleteQuoteApiRequest,
    IGetQuotesApiRequest,
    IGetQuotesApiResponse,
} from '@api/types/quotes';

/**
 * GET QUOTES ACTIONS
 * */
export const GetQuotesActions = baseActions('GET_QUOTES');
type TGetQuotesActions = typeof GetQuotesActions;

export type IGetQuotesAction = IAction<TGetQuotesActions['DEFAULT'], IApiPayload<IGetQuotesApiRequest>>;

export type IGetQuotesActionSuccess = IAction<TGetQuotesActions['SUCCESS'], IGetQuotesApiResponse, IGetQuotesAction>;

export type IGetQuotesActionFail = IFailedApiAction<TGetQuotesActions['FAIL'], IGetQuotesAction>;

/**
 * CREATE QUOTE ACTIONS
 * */
export const CreateQuoteActions = baseActions('CREATE_QUOTE');
type TCreateQuoteActions = typeof CreateQuoteActions;

export type ICreateQuoteAction = IAction<TCreateQuoteActions['DEFAULT'], IApiPayload<ICreateQuoteApiRequest>>;

export type ICreateQuoteActionFail = IFailedApiAction<TCreateQuoteActions['FAIL'], ICreateQuoteAction>;

/**
 * DELETE QUOTE ACTIONS
 * */
export const DeleteQuoteActions = baseActions('DELETE_QUOTE');
type TDeleteQuoteActions = typeof DeleteQuoteActions;

export type IDeleteQuoteAction = IAction<TDeleteQuoteActions['DEFAULT'], IApiPayload<IDeleteQuoteApiRequest>>;

export type IDeleteQuoteActionFail = IFailedApiAction<TDeleteQuoteActions['FAIL'], IDeleteQuoteAction>;
