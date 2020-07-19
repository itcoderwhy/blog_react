/**
 * 此文件只接受两个 reducer 1个是sagaReducer 1个是thunkReducer
 */

 import { combineReducers } from 'redux'
 import sagaReducer from './saga/reducers'

 const rootReducer = combineReducers({
    ...sagaReducer
 })

 export default rootReducer
