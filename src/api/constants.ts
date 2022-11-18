export enum API_ERROR_CODE {}

const REST_CONSTANTS = {
    STORY: 'story/',
};

export const RESTS = {
    STORY: {
        GET: REST_CONSTANTS.STORY,
        RATE: REST_CONSTANTS.STORY + 'rate/',
        READ: REST_CONSTANTS.STORY + 'read/',
    },
};
