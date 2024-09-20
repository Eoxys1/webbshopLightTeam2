const data = cart.list()
/**
 * @type {HTMLDivElement}
 */
const list = document.getElementById("list")
/**
 * @type {HTMLButtonElement}
 */
const buy_btn = document.getElementById("buy")
for (const key in data) {
    const element = data[key]
    const p = document.createElement("p")
    p.textContent = `${key} x${element}`
    list.appendChild(p)
}
buy_btn.addEventListener("click", () => {
    cart.clear()
    for (const elem of list.children) {
        elem.remove()
    }
})