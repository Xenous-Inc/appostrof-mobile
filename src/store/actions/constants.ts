export const Ends = {
    DEFAULT: '_DEFAULT',
    START: '_START',
    SUCCESS: '_SUCCESS',
    FAIL: '_FAIL',
};

export const baseActions = (str: string) => ({
    DEFAULT: str + Ends.DEFAULT,
    START: str + Ends.START,
    SUCCESS: str + Ends.SUCCESS,
    FAIL: str + Ends.FAIL,
});
