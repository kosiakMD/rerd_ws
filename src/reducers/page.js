import {
	EDIT_TABLE,
	EDIT_HIDE,
	TABLE_LIST,
	TABLE_ADDED,
	TABLE_REMOVED,
	TABLE_UPDATED,
	TABLE_HIDE,
	TABLE_SHOW,
} from '../constants/Page'

import {
	LOGIN_REQUEST,
	LOGIN_SUCCESSFUL,
	LOGOUT_REQUEST,
	LOGIN_FAILED,
} from '../constants/User'

const initialState = {
	tables: [],
	fetching: false,
	connecting: false,
	login: false,
	editing: false
}

export default function page(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			Object.assign(state, initialState)
			return { ...state, login: true}

		case LOGIN_SUCCESSFUL:
			Object.assign(state, initialState)
			return { ...state, fetching: true }

		case TABLE_LIST:
			Object.assign(state, initialState)
			return { ...state, tables: action.payload }
		//
		// case EDIT_TABLE:
		// 	return { ...state, editing: true, table: action.payload}
		//
		// case EDIT_HIDE:
		// 	return { ...state, editing: false, table: undefined}

		case TABLE_HIDE:
		{
			let tables = state.tables
			let id = +action.payload
			for (let i = 0, max = tables.length; i < max; i++) {
				let table = tables[ i ];
				if (table.id == id) {
					table.hidden = 'none'
					break;
				}
			}
			return { ...state}
		}

		case TABLE_SHOW:
		{
			let tables = state.tables
			let id = +action.payload
			for (let i = 0, max = tables.length; i < max; i++) {
				let table = tables[ i ];
				if (table.id == id) {
					delete table.hidden //= 'none'
					break;
				}
			}
			return { ...state}
		}
		
		case TABLE_ADDED:
		{
			let after_id = action.after_id
			let add_table = action.payload
			if(after_id < 0){
				state.tables.unshift(add_table)
			}else{
				let tables = state.tables
				for (let i = 0, max = tables.length; i < max; i++) {
					let table = tables[ i ];
					if (table.id == after_id) {
						tables.splice (i+1, 0, add_table);
						break;
					}
				}
			}
			return { ...state}
		}

		case TABLE_UPDATED:
		{
			let id = action.payload
			let tables = state.tables
			console.log('-------TABLE_UPDATED', action)
			for (let i = 0, max = tables.length; i < max; i++) {
				let table = tables[ i ];
				if (table.id == id) {
					if(action.try) {
						console.log('// update +backup',table )
						// update +backup
						tables[ i ].backup = tables[ i ]
						let update_table = action.table
						Object.assign(tables[ i ], update_table)
					}else if (action.fail){
						console.log('// reverse -backup',table )
						// reverse -backup
						Object.assign(tables[ i ], tables[ i ].backup)
						delete tables[ i ].backup
					}else if (action.success){
						console.log('// -backup',table )
						// -backup
						delete tables[ i ].backup
					}else{
						console.log('// update',table )
						// update
						let update_table = action.table
						Object.assign(tables[ i ], update_table)
					}
					break;
				}
			}
			return { ...state, editing: false }
		}

		case TABLE_REMOVED:
		{
			let id = action.payload
			let tables = state.tables
			for (let i = 0, max = tables.length; i < max; i++) {
				let table = tables[ i ];
				if (table.id == id) {
					tables.splice (i, 1);
					break;
				}
			}
			return { ...state }
		}

		case LOGOUT_REQUEST:
		case LOGIN_FAILED:
			Object.assign(state, initialState)
			return state;

		default:
			return state;
	}
}