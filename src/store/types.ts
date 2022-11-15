import { Action } from 'redux';
import { IApiError } from '../api/types';
import { LOCAL_ERROR_CODE } from './constants';

/**
 * @description This interfaces describes the data which every Redux Action contains
 * @field payload - Redux Action payload
 * @field prevAction - Action, that was dispatched before current
 */
export interface IAction<T = string, P = unknown, PA = unknown> extends Action<T> {
    payload: P;
    prevAction?: PA;
}

type HTTPMethod = 'GET' | 'POST';

/**
 * @description This interface describes Error Redux Action payload
 */
export interface IFailedApiAction<T, PA = unknown> extends IAction<T, { error: IApiError }, PA> {
    payload: {
        error: IApiError;
    };
}

/**
 * @description This interface describes Redux Action Payload data, which needs to create an HTTP request to API
 * @field rest - URI
 * @field method - HTTP method type
 * @field data - API action data
 * @field flags - Array of action flags
 */
export interface IApiPayload<D = unknown> {
    rest: string;
    method: HTTPMethod;
    data: D;
    flags?: Array<IActionFlag>;
}

/**
 * @description This interface describes Redux Action Flag - an entity which redux middleware needs to identify actions they need to catch
 * @field name - Uniq name of Redux Action Flag
 * @field data - Redux Action Flag data
 */
export interface IActionFlag<D = unknown> {
    name: string;
    data?: D;
}

export interface IApiState {
    isLoading: boolean;

    error: IApiError | ILocalError | null;
}

export interface ILocalError {
    code: LOCAL_ERROR_CODE;

    message: string;
}
