import cart, { localstore_name } from "../localstorage.js"
//import htmlc from "../node_modules//dist/html2canvas.esm.js";

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

/* import htmlc from "html2canvas"
import jspdf from "jspdf"
const pageWidth = 595
const pageHeight = document.body.clientHeight
// Create a hidden div to hold the screenshot
const screenshotDiv = document.createElement("div")
screenshotDiv.style.position = "absolute"
screenshotDiv.style.left = "0"
screenshotDiv.style.top = "0"
screenshotDiv.style.width = pageWidth + "px"
screenshotDiv.style.height = pageHeight + "px"
screenshotDiv.style.overflow = "hidden"
const canvas = await htmlc(document.body)
document.body.appendChild(screenshotDiv)
screenshotDiv.appendChild(canvas)
const offsetX = (pageWidth - canvas.width) / 2
const offsetY = (pageHeight - canvas.height) / 2
console.log({pageWidth, pageHeight, offsetX, offsetY})
const pdf = new jspdf({
	unit: "px",
	format: [pageWidth, pageHeight],
})
pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0,0, canvas.width, canvas.height)
window.pdf = pdf
//pdf.save("test.pdf")
document.body.removeChild(screenshotDiv)

window.open_pdf=()=>{
    window.open(pdf.output("bloburl"),'', 'innerWidth: 10,innerHeight: 10,screenX: 0,screenY: 0')
} */