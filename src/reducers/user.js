import {
	LOGIN_SUCCESSFUL,
	LOGIN_FAILED,
	LOGOUT_REQUEST,
	PING,
	PONG,
} from '../constants/User'

import wsAction from '../actions/WSActions'

const initialState = {
	name: '',
	error: ''
}


export default function user(state = initialState, action) {

	switch(action.type) {

		case LOGIN_SUCCESSFUL:
			wsAction.ping()
			return { ...state, name: action.payload, error: '' }

		case LOGIN_FAILED:
			return { ...state, error: action.payload }

		case LOGOUT_REQUEST:
			clearTimeout( wsAction.pinger )
			return { ...state, name: '', error: '' }

		case PING:
			return { ...state, ping: action.payload }

		case PONG:
			return { ...state, pong: action.payload }

		default:
			return state
	}

}