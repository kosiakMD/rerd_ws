import { combineReducers } from 'redux'

import page from './page'
import user from './user'
import panel from './panel'

export default combineReducers({
	page,
	user,
	panel
})