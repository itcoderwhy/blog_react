/**
 * 1.reducer,[initialState],[enhancer]
 */
import { createStore, applyMiddleware, compose } from 'redux'
// saga 中间件
import createSagaMiddleware from 'redux-saga'

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
	composeEnhancer(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
export default store
