import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import basket from './basket'

export default combineReducers({
	alert,
	auth,
	basket,
})
