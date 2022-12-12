export enum ApiErrorCode {}

const RestConstants = {
    STORY: 'story/',
    QUOTE: 'quote/',
};

export const Rests = {
    Story: {
        GET: RestConstants.STORY,
        RATE: RestConstants.STORY + 'rate/',
        READ: RestConstants.STORY + 'read/',
    },
    Quotes: {
        GET: RestConstants.QUOTE,
        CREATE: '', // todo
        DELETE: '', // todo
    },
};
