const localstore_name = "cart"
const cart = {
	/**
	 * @param {string} id
	 */
	add(id) {
		const data = JSON.parse(localStorage.getItem(localstore_name) ?? "{}")
		data[id] ??= 0
		data[id] += 1
		localStorage.setItem(localstore_name, JSON.stringify(data))
        location.reload()
	},
	/**
	 * @param {string} id
	 */
	remove(id) {
		const data = JSON.parse(localStorage.getItem(localstore_name) ?? "{}")
		data[id] ??= 0
		data[id] -= data[id] == 0 ? 0 : 1
		if (data[id]===0) {
            delete data[id]
        }
        localStorage.setItem(localstore_name, JSON.stringify(data))
        location.reload()
	},
    /**
     * @returns {{[id:string]:number}}
     */
	list() {
		return JSON.parse(localStorage.getItem(localstore_name) ?? "{}")
	},
	clear() {
		localStorage.setItem(localstore_name, "{}")
	},
}
window.cart = cart
export default cart
export {localstore_name}
