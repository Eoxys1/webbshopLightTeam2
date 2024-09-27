const localstore_name = "cart"
const cart = {
	/**
	 * @param {string} id
	 */
	// adds one to the id in localstorage
	add(id) {
		const data = JSON.parse(localStorage.getItem(localstore_name) ?? "{}")
		// if data[id] is null or undefined then make it 0
		data[id] ??= 0
		//adds one to data[id]
		data[id] += 1
		localStorage.setItem(localstore_name, JSON.stringify(data))
	},
	/**
	 * @param {string} id
	 */
	// removes one to the id in localstorage
	remove(id) {
		const data = JSON.parse(localStorage.getItem(localstore_name) ?? "{}")
		// if data[id] is null or undefined then make it 0
		data[id] ??= 0
		//decreses the value of  data[id] only if it's not 0
		data[id] -= data[id] == 0 ? 0 : 1
		// if its' 0 then remove it
		if (data[id] <= 0) {
			delete data[id]
		}
		localStorage.setItem(localstore_name, JSON.stringify(data))
	},
	/**
	 * @param {string} id
	 */
	// sets value to the id in localstorage
	set(id, val) {
		const data = JSON.parse(localStorage.getItem(localstore_name) ?? "{}")
		data[id] = val
		//if data[id] less than or equals 0 or null or undefined remove it
		if (data[id] <= 0 || data[id] === null || data[id] === undefined) {
			delete data[id]
		}
		localStorage.setItem(localstore_name, JSON.stringify(data))
	},
	/**
	 * @returns {{[id:string]:number}}
	 */
	// lists everything in localstorage
	list() {
		return JSON.parse(localStorage.getItem(localstore_name) ?? "{}")
	},
	// cleares everything in localstorage
	clear() {
		localStorage.setItem(localstore_name, "{}")
	},
	// counts everything in localstorage
	count() {
		const data = this.list()
		const num = 0
		//loops through the values of localstorage
		for (const element of Object.values(data)) {
			num += element
		}
		return num
	},
}
window.cart = cart
/* export default cart
export { localstore_name } */
