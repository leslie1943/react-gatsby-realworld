import { combineReducers } from 'redux'
import counterReducer from './counter.reducer'
import authReducer from './auth.reducer'

// 合并 reducers
export default combineReducers({ counterReducer, authReducer })
