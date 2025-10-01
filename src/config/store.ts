import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { type TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logger as reduxLogger } from 'redux-logger';

import api from '../shared/services/query/api';
import appReducer from '../shared/reducers/app.reducer';
import catsSlice from '../shared/reducers/cats.reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'],
  blacklist: [api.reducerPath, 'cats'],
};

export const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    app: appReducer,
    cats: catsSlice,
    [api.reducerPath]: api.reducer,
  })
);

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these field paths in all actions
          ignoredActionPaths: [
            'payload.headers',
            'payload.config',
            'payload.request',
            'error',
            'meta.arg',
            'meta.baseQueryMeta',
          ],
          // The `redux-persist` actions also have to be ignored
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware, reduxLogger),
  });

export const store = setupStore();
export const persistor = persistStore(store);
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export const getStore = () => store;
