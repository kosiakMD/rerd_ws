import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom';

export default class User extends Component {

	handleSubmit(event){
		event.preventDefault();
		this.login_input = ReactDOM.findDOMNode(this.refs.login_input)
		this.password_input = ReactDOM.findDOMNode(this.refs.password_input)

		let login = this.login_input.value
		let password = this.password_input.value
		if (!login || !password) {
			return false
		}

		this.clearForm()
		this.props.handleLogin(/*this.refs*/login, password)
	}

	clearForm(){
		console.log(this.login_input,	this.password_input )
		this.login_input.value = ''
		this.password_input.value = ''
	}

	render() {
		const { name, error, pong } = this.props
		let template

		if(name){
			template = <div>
				<p>Hello, {name}!</p>
				<button type='button' className='btn' onClick={this.props.handleLogout} >Logout</button>
					<br/>
				{
					// name == 'admin' ?
					// 	<form  onSubmit=''>
					// 			<br/>
					// 		<input type='text' className='input' placeholder='Table name'/>
					// 			<br/>
					// 		<button className='btn' type='submit'>Add Table</button>
					// 	</form>
					// 	: ''
				}
				<br/><br/>
				<p>Ping: {pong} seconds</p>
			</div>
		}else{
			template = <div>
				<form className='' onSubmit={this.handleSubmit.bind(this)} >
					<input type='text' placeholder='login' ref='login_input' defaultValue='user1234'/>
					<input type='password' placeholder='password' ref='password_input' defaultValue='password1234'/>
					<button type='submit' className='btn' onClick=''>Login</button>
				</form>
			</div>
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

User.propTypes = {
	name: PropTypes.string.isRequired,
	handleLogin: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired
}