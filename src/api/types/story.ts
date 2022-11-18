import { ITokenApiRequest } from './index';
import IStory from '@models/story';

/**
 * @description This interface describes data which API needs to return New Story
 */
export type IGetNewStoryApiRequest = ITokenApiRequest;

/**
 * @description This interface describes data which API returns on Get New Story Request
 */
export interface IGetNewStoryApiResponse {
    story: IStory;
}

/**
 * @description This interface describes data which API needs to Assign Story Was Read
 */
export interface IAssignStoryWasReadApiRequest extends ITokenApiRequest {
    id: string;
}

/**
 * @description This interface describes data which API needs to Rate Story
 */
export interface IRateStoryApiRequest extends ITokenApiRequest {
    id: string;
    rating: number;
}
