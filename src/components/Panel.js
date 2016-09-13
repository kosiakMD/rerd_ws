import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom';

export default class Panel extends Component {
	constructor(props) {
		super(props);
		this.fields = {}
	}
	handleSubmit(event){
		event.preventDefault();
		this.tableName_input = ReactDOM.findDOMNode(this.refs.tableName_input)
		// this.tableID_input = ReactDOM.findDOMNode(this.refs.tableID_input)
		this.tableParticipants_select = ReactDOM.findDOMNode(this.refs.tableParticipants_select)
		let name = this.tableName_input.value
		let participants = this.tableParticipants_select.value
		if (!name) {
			return false
		}

		this.editTable = ReactDOM.findDOMNode(this.refs.editTable).value
		if(this.editTable){
			// console.log('update')
			let tableID = +ReactDOM.findDOMNode(this.refs.tableID_input).value
			const { updateTable } = this.props
			updateTable(tableID, name, participants)
		}else{
			// console.log('add')
			this.afterID_input = ReactDOM.findDOMNode(this.refs.afterID_input)
			let afterID = +this.afterID_input.options[this.afterID_input.selectedIndex].value || -1
			const { addTable } = this.props
			addTable(afterID, name, participants)
		}
		this.clearForm(!!this.editTable)
		const { editCancel } = this.props
		editCancel()
	}
	editCancelClick() {
		const { editCancel } = this.props
		editCancel()
		this.clearForm(true)
	}
	clearForm(editTable){
		ReactDOM.findDOMNode(this.refs.tableName_input).value = ''
		editTable
			? ReactDOM.findDOMNode(this.refs.tableID_input).value = ''
			: ReactDOM.findDOMNode(this.refs.afterID_input).value = ''
		ReactDOM.findDOMNode(this.refs.tableParticipants_select).value = 0
	}
	onChangeName(e) {
		this.fields.tableName_input = e.target.value
	}
	onChangeParticipants(e) {
		this.fields.tableParticipants_select = e.target.value
	}
	componentDidUpdate(params){
		const { def, editing, table } = this.props
		if(def) return
		if (editing){
			let tableName_input =
				// !def && table.name ||
				// this.fields.tableName_input && this.fields.tableName_input ||
				table.name
			ReactDOM.findDOMNode(this.refs.tableName_input).value = tableName_input
			let tableParticipants_select =
				// !def && table.participants ||
				// this.fields.tableParticipants_select && this.fields.tableParticipants_select ||
				table.participants
			ReactDOM.findDOMNode(this.refs.tableParticipants_select).value = tableParticipants_select
		}
	}
	render() {
		const { name, tables, error, editing, table } = this.props
		let template
		if(name && name == 'admin'){
			let options = [];
			for(let i=0; i<=12; i++) {
				options.push(<option key={'option_'+i} value={i}>{i}</option>)
			}
			template =
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
						<br/>
					{	!editing ?
						<div>
							After: <select ref='afterID_input'>
							<option value=''>Begin</option>
							{tables.map ((table) =>
								<option key={table.id} value={table.id}>{table.name}</option>
							)}
							</select>
							<input type='hidden' value='' ref='editTable' />
							<br/><br/>
						</div>
						:
						<div>
							<input type='hidden' value={table.id} ref='tableID_input' />
							<input type='hidden' value='1' ref='editTable' />
						</div>
					}
					<input type='text' defaultValue='' onChange={::this.onChangeName} className='input' placeholder='Table name' ref='tableName_input' size='60' />
						<br/><br/>
					<select ref='tableParticipants_select' onChange={::this.onChangeParticipants} >
						{options}
					</select>
						<br/><br/>
					{
						!editing ?
							<button className='btn' type='submit'>Add Table</button>
						:
							<div>
								<button className='btn' type='submit' onClick={this.handleSubmit.bind(this)}>Update Table</button>
								<button className='btn' type='button' onClick={::this.editCancelClick}>Cancel</button>
							</div>
					}
				</form>
			</div>
		}else{
			template = ''
		}
		return <div className='ib user'>
			{template}
			{
				error ? <p className='error'> {error}. <br /> Try again.</p>
					: ''
			}
		</div>
	}
}

Panel.propTypes = {
	name: PropTypes.string.isRequired,
	updateTable: PropTypes.func.isRequired,
	addTable: PropTypes.func.isRequired,
}