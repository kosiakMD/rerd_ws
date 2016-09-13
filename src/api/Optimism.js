class Optimism {
	constructor () {
		this.optimists = {}
	}
	create (optimist, id, obj) {
		!this.optimists[optimist] && (this.optimists[optimist] = {})
		this.optimists[optimist][id] = obj
	}
	success (optimist, id, params, callback) {
		let action = 'success'
		return this.hanlder(optimist, id, action)
	}
	fail (optimist, id, params, callback) {
		let action = 'fail'
		return this.hanlder(optimist, id, action, params, callback)
	}
	hanlder (optimist, id, action, params, callback) {
		if(!this.optimists[optimist] || !this.optimists[optimist][id]){
			return false
		}
		this.optimists[optimist][id][action] && this.optimists[optimist][id][action](params)
		delete this.optimists[optimist][id]
		callback && callback()
		return true;
	}
	remove (optimist, id) {
		if (id) {
			delete this.optimists[optimist][id]
		}else if(optimist){
			delete this.optimists[optimist]
		}
	}
}

const optimism = new Optimism()

export default optimism