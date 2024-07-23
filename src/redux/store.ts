import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";
import { persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import loggerMiddleware from "./middleware";

const devMiddleware = [
    loggerMiddleware,
];

const middleware = (getDefaultMiddleware: any) => getDefaultMiddleware({
        immutableCheck: false,
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
        thunk: true
    }).concat(devMiddleware)


const reducer =
        combineReducers({
        })

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: hardSet,
    version: 1,
    blacklist: ['counter'] ,// What you don't wanna to persist
    whitelist: ['test', 'account']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({

    reducer: persistedReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production'
})
