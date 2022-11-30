import { Action } from 'redux';
import { IApiError } from '@api/types';
import { ActionFlagsNames, HTTPMethod, LocalErrorCode } from './constants';

/**
 * @description This interfaces describes the data which every Redux Action contains
 * @field payload - Redux Action payload
 * @field prevAction - Action, that was dispatched before current
 * @field flags - Array of action flags
 */
export interface IAction<T = string, P = unknown, PA = unknown> extends Action<T> {
    payload: P;
    prevAction?: PA;
    flags?: Array<IActionFlag>;
}

/**
 * @description This interface describes Error Redux Action payload
 */
export interface IFailedApiAction<T, PA = unknown> extends IAction<T, unknown, PA> {
    payload: {
        error: IApiError;
    };
}

/**
 * @description This interface describes Redux Action Payload data, which is needed to create an HTTP request to API
 * @field rest - URI
 * @field method - HTTP method type
 * @field data - API action data
 */
export interface IApiPayload<D = unknown> {
    rest: string;
    method: HTTPMethod;
    data: D;
}

/**
 * @description This interface describes Redux Action Payload data, which is needed to get Storage Data
 * @field key - key that storage needs to find data
 */
export interface IStoragePayload {
    key: string;
}

/**
 * @description This interface describes Redux Action Flag - an entity which redux middleware needs to identify actions they need to catch
 * @field name - Uniq name of Redux Action Flag
 * @field data - Redux Action Flag data
 */
export interface IActionFlag<D = unknown> {
    name: ActionFlagsNames;
    data?: D;
}

export interface IApiState {
    isLoading: boolean;

    error: IApiError | ILocalError | null;
}

export interface ILocalError {
    code: LocalErrorCode;

    message: string;
}
