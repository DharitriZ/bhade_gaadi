// src/Redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './Slices/AuthSlice';
import docReducer from './Slices/RequestsSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'doc'], // only auth will be persisted
};

const rootReducer = combineReducers({
    auth: authReducer,
    doc: docReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

// For hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
