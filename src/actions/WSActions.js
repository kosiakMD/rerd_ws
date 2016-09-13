// import ReactDOM from 'react-dom';
import {
	TABLE_LIST,
	TABLE_ADDED,
	TABLE_REMOVED,
	TABLE_UPDATED,
} from '../constants/Page'

import optimism from '../api/Optimism'

import {
	// LOGIN_REQUEST,
	// LOGOUT_REQUEST,
	// LOGIN_SUCCESS,
	// LOGIN_FAIL
} from '../constants/User'

import ws from '../api/WS.js'

class WSAction {
	constructor () {
		// dispatch
	}
	dispatch
	timers = {}
	counter = 0
	pinger
	login_successful (msg) {
		this.dispatch({
			type: 'LOGIN_SUCCESSFUL',
			payload: msg.user_type
		})
		ws.subscribe_tables()
	}
	table_list (msg) {
		let tables = msg.tables
		this.dispatch({
			type: TABLE_LIST,
			payload: tables
		})
	}
	/* SUCCESSED */
	table_added (msg) {
		let table = msg.table
		let after_id = msg.after_id
		this.dispatch({
			type: TABLE_ADDED,
			payload: table,
			after_id: after_id
		})
	}
	table_updated (msg) {// + Optimism
		let table = msg.table
		let id = msg.table.id
		if ( !optimism.success(TABLE_UPDATED, id) ){
			this.dispatch({
				type: TABLE_UPDATED,
				payload: id,
				table: table,
			})
		}
	}
	table_removed (msg) {// + Optimism
		let id = msg.id
		optimism.success(TABLE_REMOVED, id)
		this.dispatch({
			type: TABLE_REMOVED,
			payload: id
		})
	}
	/* FAILED */
	login_failed () {
		// userActions.handleLoginFailed()
		this.dispatch({
			type: 'LOGIN_FAILED',
			payload: 'Incorrect Login or Password'
		})
	}
	update_failed (msg) {// + Optimism
		let id = msg.id
		optimism.fail(TABLE_UPDATED, id)
	}
	removal_failed (msg) {// + Optimism
		let id = msg.id
		optimism.fail(TABLE_REMOVED, id)
	}
	ping () {
		let id = this.counter++
		let msg = {
			$type: 'ping',
			seq: id
		}
		ws.send(msg)
		this.timers[id] = new Date()
		this.pinger = setTimeout(()=>{
			this.ping()
		}, 3e3
		)
	}
	pong (msg) {
		let id = msg.seq
		let time = ( new Date() - this.timers[id] ) / 1000
		this.dispatch({
			type: 'PONG',
			payload: time
		})
	}
}
const wsAction = new WSAction()

export default wsAction