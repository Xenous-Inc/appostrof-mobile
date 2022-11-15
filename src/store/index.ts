import cleanerMiddleware from './middlewares/cleaner';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), cleanerMiddleware],
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

/**
 * @usage use it when you use useDispatch like that:
 * const dispatch: AppDispatch = useDispatch()
 */
export type AppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;
