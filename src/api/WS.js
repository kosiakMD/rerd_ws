import wsAction from '../actions/WSActions'

class WS{
	constructor () {
		this.init()
	}
	init (login) {
		this.ws_link = 'wss://js-assignment.evolutiongaming.com/ws_api'
		let socket = new WebSocket(this.ws_link );
		this.socket = socket

		socket.onopen = () => {
			login && this.logining ()
		}
		socket.onclose = (event) => {
			this.close(event)
		}
		socket.onmessage = (event) => {
			this.message(event)
		}
		socket.onerror = ( error) => {
			this.error(error)
		}
	}
	open () {
		console.log ('Connection is ready.')
	}
	close (event) {
		if (event.wasClean) {
			console.log('Connection closed OK')
		} else {
			console.log('Disconnected!');
			this.dispatch({
				type: 'LOGOUT_REQUEST'
			})
		}
		console.log(`Code: ${event.code} cause: ${event.reason}}`);
	}
	error (error) {
		console.log(`ERROR ${error.message}`);
	}
	login (name, pass, dispatch) {
		this.name = name
		this.pass = pass
		this.dispatch = dispatch
		if (this.socket.readyState != 1){
			this.socket.close()
			this.init(true)
		}else{
			this.logining()
		}
	}
	send (msg) {
		if (typeof msg !== 'string'){
			msg = JSON.stringify(msg)
		}
		this.socket.send(msg)
	}
	logining () {
		let msg = {
			$type: 'login',
			username: this.name,
			password: this.pass
		}
		this.send(msg)
	}
	logout () {
		let msg = {
			$type: 'unsubscribe_tables'
		}
		this.send(msg)
		this.socket.close()
	}
	subscribe_tables () {
		let msg = {
			$type: 'subscribe_tables'
		}
		this.send(msg)
	}
	// Message and handlers
	message (event) {
		console.log(`Data received: ${event.data}`);
		let msg = JSON.parse(event.data)
		let type = msg.$type
		wsAction[type](msg)
	}
}
const ws = new WS()

export default ws