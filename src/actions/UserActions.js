import {
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
} from '../constants/User'

import ws from '../api/WS.js'

export function handleLogin(/*refs*/login, password) {

	return function(dispatch) {

		dispatch({
			type: LOGIN_REQUEST
		})

		// console.log(login, password)

		ws.login(login, password, dispatch)
	}

}

export function handleLogout(){

	return function(dispatch) {
		dispatch({
			type: LOGOUT_REQUEST
		})

		ws.logout()
	}

}