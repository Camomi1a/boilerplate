import { Middleware } from 'redux'

const loggerMiddlware: Middleware =  (store) => (next) => (action) => {

    const state = store.getState()
    console.group(action.type);
    console.info('dispatching', action);
    console.log('store ',state ) // выводим текущее состояние в консоль
    console.groupEnd();
    return next(action);
}

export default loggerMiddlware;