import { API_ERROR_CODE } from '../constants';

/**
 * @description This interface describes the data which API needs to work with request which needs user to be authorized
 * @field token - user's token
 */
export interface ITokenApiRequest {
    token: string;
}

export interface IApiError {
    code: API_ERROR_CODE;

    message: string;
}
