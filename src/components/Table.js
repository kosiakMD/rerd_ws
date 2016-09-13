import React, { /*PropTypes,*/ Component } from 'react'

export default class Table extends Component {
	constructor(){
		super()
	}
	repeat = function( pattern, num ) {
		let string = ''
		for(let i=0; i<num; i++){
			string += pattern
		}
		return string
	}
	render() {
		const {table, user, remove_table, editTable} = this.props
		// const { remove_table } = pageActions
		const color = table.name.split (/[A-Z]/)[ 0 ].replace (/\s/g, '')
		const participants = () => {
			let string = '[ '
			string += this.repeat('x ', +table.participants)
			string += this.repeat('_ ',+12-table.participants)
			string += ']'
			return string
		}
		if (table.hidden) {
			return <div id={table.id}></div>
		} else {
			return <div className='item' id={table.id} style={{display: table.hidden && 'none'}}>
				{
					user == 'admin' ?
						<p style={{height: 20}}>
							<button className='editTableButton' ref='btnEdit' onClick={()=>editTable(table)}>Edit
							</button>
							<button className='' onClick={()=>remove_table(table.id)}>Remove</button>
						</p>
						: ''
				}
				<h6>Table #{table.id} _|_ {table.participants} / 12</h6>
				<p className="participants">{participants()}</p>
				<p>{table.name}</p>
				<p style={{background:color, height: 10, width: '100%'}}></p>
			</div>
		}
	}
}
