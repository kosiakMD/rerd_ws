import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//Components
import User from '../components/User'
import Page from '../components/Page'
import Panel from '../components/Panel'

//Actions
import * as pageActions from '../actions/PageActions'
import * as panelActions from '../actions/panelActions'
import * as userActions from '../actions/UserActions'
import * as wsActions from '../actions/WSActions'
import wsAction from '../actions/WSActions'


class App extends Component {
	render() {
		const { user, page, panel } = this.props
		const { editTable, remove_table} = this.props.pageActions
		const { addTable, updateTable, editCancel } = this.props.panelActions
		const { handleLogin, handleLogout } = this.props.userActions

		return <div className='row'>
			<Page
				user={user.name}
				tables={page.tables}
				editTable={editTable}
				remove_table={remove_table}
				fetching={page.fetching}
				connecting={page.connecting}
				login={page.login}
			/>
			<User
				name={user.name}
				handleLogin={handleLogin}
				handleLogout={handleLogout}
				error={user.error}
				pong={user.pong}
			/>
			<Panel
				name={user.name}
				tables={page.tables}
				addTable={addTable}
				updateTable={updateTable}
				editCancel={editCancel}
				editing={panel.editing}
				table={panel.table}
				def={panel.default}
				// page={page}
			/>

		</div>
	}
}

function mapStateToProps (state) {
	return {
		user: state.user,
		page: state.page,
		panel: state.panel,
	}
}

function mapDispatchToProps(dispatch, state) {
	wsAction.dispatch = dispatch
	return {
		pageActions: bindActionCreators(pageActions, dispatch),
		panelActions: bindActionCreators(panelActions, dispatch),
		userActions: bindActionCreators(userActions, dispatch, state),
		wsActions: bindActionCreators(wsActions, dispatch),
	}
}

// export default connect(mapStateToProps)(App)
export default connect(mapStateToProps, mapDispatchToProps)(App)