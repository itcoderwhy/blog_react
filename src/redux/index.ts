/**
 * 1.reducer,[initialState],[enhancer]
 */
import { createStore, applyMiddleware, compose } from 'redux'
// saga 中间件
import createSagaMiddleware from 'redux-saga'
// thunk 中间件
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducer'
import rootSaga from './saga/sagas/index'

// 创建saga的中间件
const sagaMiddleware = createSagaMiddleware()

// 创建一个增强器函数
const composeEnhancer = (window as any).__REDUC_DEVTOOLS_EXTENSION_COMPOSE__
	? (window as any).__REDUC_DEVTOOLS_EXTENSION_COMPOSE__({})
	: compose

const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(sagaMiddleware, thunk, logger))
)

sagaMiddleware.run(rootSaga)
export default store
