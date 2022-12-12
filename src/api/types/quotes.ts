import { ITokenApiRequest } from '@api/types/index';
import IQuote from '@models/quote';

/**
 * @description This interface describes data which API needs to return Quotes
 */
export type IGetQuotesApiRequest = ITokenApiRequest;

/**
 * @description This interface describes data which API returns on Get Quotes Request
 */
export interface IGetQuotesApiResponse {
    quotes: Array<IQuote>;
}

/**
 * @description This interface describes data which API needs to Create Quote
 */
export interface ICreateQuoteApiRequest extends ITokenApiRequest {
    quote: IQuote;
}

/**
 * @description This interface describes data which API needs to Delete Quote
 */
export interface IDeleteQuoteApiRequest extends ITokenApiRequest {
    id: string;
}
