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
export type IAssignStoryWasReadApiRequest = ITokenApiRequest;

/**
 * @description This interface describes data which API returns on Assign Story Was Read Request
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAssignStoryWasReadApiResponse {} // TODO fix

/**
 * @description This interface describes data which API needs to Rate Story
 */
export type IRateStoryApiRequest = ITokenApiRequest;

/**
 * @description This interface describes data which API returns on Rate Story Request
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRateStoryApiResponse {} // TODO fix
