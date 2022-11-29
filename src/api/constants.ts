export enum ApiErrorCode {}

const RestConstants = {
    STORY: 'story/',
};

export const Rests = {
    Story: {
        GET: RestConstants.STORY,
        RATE: RestConstants.STORY + 'rate/',
        READ: RestConstants.STORY + 'read/',
    },
};
