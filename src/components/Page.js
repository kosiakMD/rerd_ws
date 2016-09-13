import React, { PropTypes, Component } from 'react'
import ReactList from 'react-list';

import Table from '../components/Table'

var activeYearButton

export default class Page extends Component {
	constructor(){
		super()
	}
	onYearBtnClick(e) {
		this.props.getPhotos(+e.target.textContent) //textContent instead innerText
		activeYearButton && activeYearButton.removeAttribute('disabled', 'disabled')
		activeYearButton = e.target
		activeYearButton.setAttribute('disabled', 'disabled')
	}
	render() {
		const { user, tables, fetching, connecting, login, remove_table, editTable } = this.props
		let template
		if(connecting){
			template = 'Connecting...'
		}else if (login){
			template = 'Log in...'
		}else if (fetching){
			template = 'Loading...'
		}else if(tables.length){
			const renderItem = (index) => <Table key={tables[index].id} editTable={editTable} table={tables[index]} user={user} remove_table={remove_table} />

			template = <div>
				<div>
					<h1>Tables: {tables.length}</h1>
					<div style={{overflow: 'auto', maxHeight: 400, margin: '10px'}} className='axis-x'>
						<ReactList
							axis='x'
							length={tables.length}
							itemRenderer={renderItem}
							type='uniform'
						/>
					</div>
				</div>
			</div>
		}else{
			template = ''
		}
		return <div className='ib page'>
			{template}
		</div>
	}
}

Page.propTypes = {
	// year: PropTypes.number.isRequired,
	user: PropTypes.string.isRequired,
	tables: PropTypes.array.isRequired,
	// getPhotos: PropTypes.func.isRequired,
}