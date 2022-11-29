import { ApiErrorCode } from '@api/constants';

/**
 * @description This interface describes the data which API needs to work with request which needs user to be authorized
 * @field token - user's token
 */
export interface ITokenApiRequest {
    token: string;
}

export interface IApiError {
    code: ApiErrorCode;

    message: string;
}
