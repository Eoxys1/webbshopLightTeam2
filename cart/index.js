/*const data = cart.list()
/**
 * @type {HTMLDivElement}
 */
/*const list = document.getElementById("list")
/**
 * @type {HTMLButtonElement}
 */
/*const buy_btn = document.getElementById("buy")
for (const key in data) {
	const element = data[key]
	const p = document.createElement("p")
	p.textContent = `${key} x${element}`
	list.appendChild(p)
}
buy_btn.addEventListener("click", () => {
	cart.clear()
	for (const elem of Object.values(list.children)) {
		list.removeChild(elem)
		elem.remove()
	}
})*/

const data = cart.list();





/* 



*/

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
document.body.appendChild(screenshotDiv)
const pdf = new jspdf({
	unit: "px",
	format: [pageWidth, pageHeight],
})
html2canvas(document.body, {
	scrollY: pageHeight, // Capture the entire webpage by scrolling
	onrendered: function (canvas) {
		screenshotDiv.appendChild(canvas)
		const offsetX = (pageWidth - canvas.width) / 2
		const offsetY = (pageHeight - canvas.height) / 2
		console.log({ pageWidth, pageHeight, offsetX, offsetY })
		pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, canvas.width, canvas.height)
		document.body.removeChild(screenshotDiv)
	},
})
window.pdf = pdf
//pdf.save("test.pdf")

window.open_pdf = () => {
	window.open(pdf.output("bloburl"), "", "innerWidth: 10,innerHeight: 10,screenX: 0,screenY: 0")
}
