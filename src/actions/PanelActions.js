import {
	EDIT_TABLE,
	EDIT_HIDE,
	TABLE_HIDE,
	TABLE_SHOW,
	TABLE_UPDATED,
	TABLE_REMOVED,
} from '../constants/Page'

import ws from '../api/WS.js'
import Optimism from '../api/Optimism'

export function addTable(after_id, name, participants) {
	return function(dispatch) {
		let table = {
			$type: 'add_table',
			after_id: after_id,
			table: {
				name: name,
				participants: participants
			}
		}
		ws.send(table)
	}
}

export function updateTable(id, name, participants) {

	return function(dispatch) {
		Optimism.create(TABLE_UPDATED, id, {
			success: () => {
				dispatch({
					type: TABLE_UPDATED,
					payload: id,
					success: true
				})
			},
			fail: () => {
				dispatch({
					type: TABLE_UPDATED,
					payload: id,
					fail: true
				})
			}
		})

		let table = {
			$type: 'update_table',
			table: {
				id: id,
				name: name,
				participants: participants
			}
		}

		dispatch({
			type: TABLE_UPDATED,
			payload: id,
			table: table.table,
			try: true
		})
		ws.send(table)
	}
}

export function editCancel(table) {
	return function(dispatch) {
		dispatch({
			type: EDIT_HIDE
		})
	}
}
