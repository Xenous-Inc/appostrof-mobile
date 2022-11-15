const cleanerMiddleware = () => (next: any) => (action: any) => {
    if (!action.payload) {
        next(action);
        return;
    }
    // Clean flags from action payload
    delete action.payload.flags;

    next(action);
};

export default cleanerMiddleware;
