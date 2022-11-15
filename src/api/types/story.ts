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
