import { configureStore, applyMiddleware, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combinedReducers } from './app.reducer'
import createSagaMiddleware from 'redux-saga'
import { initSaga } from './app.saga';


const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({ reducer: combinedReducers, middleware })
sagaMiddleware.run(initSaga)