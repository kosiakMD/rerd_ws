import {
	EDIT_TABLE,
	EDIT_HIDE,
	// TABLE_LIST,
	// TABLE_ADDED,
	// TABLE_HIDE,
	// TABLE_SHOW,
} from '../constants/Page'

const initialState = {
	table: '',
	editing: false
}

export default function panel(state = initialState, action) {
	switch (action.type) {

		case EDIT_TABLE:
			console.log(EDIT_TABLE, action)
			return { ...state, editing: true, table: action.payload, default: false }

		case EDIT_HIDE:
			return { ...state, editing: false, table: undefined, default: false }

		default:
			return { ...state, default: true }
	}
}