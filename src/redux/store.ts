import {combineReducers, configureStore} from '@reduxjs/toolkit'
import loggerMiddleware from "./middleware";

const devMiddleware = [
    loggerMiddleware,
];

const middleware = (getDefaultMiddleware: any) => getDefaultMiddleware({
        immutableCheck: false,
        thunk: true
    }).concat(devMiddleware)


const reducer =
        combineReducers({
        })

export const store = configureStore({

    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production'
})
