import { combineReducers } from 'redux'
import counterReducer from './counter.reducer'

// { counter: 0 }
export default combineReducers({ counterReducer })
