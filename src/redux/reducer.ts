/**
 * 此文件只接受两个 reducer 1个是sagaReducer 1个是thunkReducer
 */

 import { combineReducers } from 'redux'
 import sagaReducer from './saga/reducers'
 import thunkReducer from './thunk/reducers'

 const rootReducer = combineReducers({
    ...sagaReducer,
    ...thunkReducer
 })

 export default rootReducer
