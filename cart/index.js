//Store the current list of items in the cart
const data_cart = cart.list()
/**
 * @return {Promise<{[id:string]:{image:string,name:string,price:number}}>}
 */

//Retrive data the data from json-file
async function data_fetch() {
	const res = await fetch("/data.json")
	const json = await res.json()
	return json
}

//Generate elements for a cart item in order to display them on the cart-page (bootstrap-styled)
function gen_element(image, name, price) {
	var node_1 = document.createElement("DIV")
	node_1.setAttribute("class", "card-body mb-5 border border-dark mb-5 rounded-3 d-flex p-4")

	var node_2 = document.createElement("IMG")
	node_2.setAttribute("src", image)
	node_2.setAttribute("alt", "...")
	node_2.setAttribute("class", "card-img img-fluid image-adjust")
	node_1.appendChild(node_2)

	var node_3 = document.createElement("H4")
	node_3.setAttribute("class", "card-title ms-3 fs-2")
	node_1.appendChild(node_3)

	var node_4 = document.createTextNode(name)
	node_3.appendChild(node_4)

	var node_5 = document.createElement("P")
	node_5.setAttribute("class", "card-text me-2")
	node_1.appendChild(node_5)

	var node_6 = document.createTextNode(`${price} kr`)
	node_5.appendChild(node_6)

	return node_1
}

const priceText = document.getElementById("priceList").querySelector("p") //retrieved from the cart-index

//Runs when the json-data is fully retrieved with data, as parameter
data_fetch().then((data) => {
	const list = document.getElementById("list")
	const buy_btn = document.getElementById("buy")
	/**
	 * @type {HTMLDivElement}
	 */
	const ss_elem = document.querySelector("body>main")
	const row = ss_elem.children[0].children[0]
	const margin_remove = ss_elem.children[0]
	const pure_priceList = document.querySelector("#priceList")

	//When the checkout-button is clicked, a pdf-file will download and show your receipt, the cart clears, all items from the DOM are removed and will also display 'The cart is empty'
	buy_btn.addEventListener("click", async () => {
		ss_elem.style.backgroundColor = "white"
		ss_elem.style.width = "min-content"
		row.classList.remove("row")
		row.classList.add("column")
		margin_remove.classList.remove("container", "my-5")
		pure_priceList.removeChild(buy_btn)
		/** @type {HTMLDivElement[]}*/
		const temp_children = list.children
		for (const element of temp_children) {
			element.style.width = "550px"
			//element.classList.add('ms-5', 'mt-2')
		}

		const pageWidth = ss_elem.clientWidth
		const pageHeight = ss_elem.clientHeight
		const pdf = new jspdf({
			unit: "px",
			orientation:"no",
			hotfixes: ["px_scaling"],
			format: [pageWidth,pageHeight],
		})
		/**
		 * @type {HTMLCanvasElement}
		 */
		const canvas = await new Promise((resolve, reject) => {
			html2canvas(ss_elem, {
				scrollY: pageHeight, // Capture the entire webpage by scrolling
				onrendered: function (canvas) {
					resolve(canvas)
				},
			})
		})
		pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, pageWidth, pageHeight)
		ss_elem.style.width=null
		for (const element of temp_children) {
			element.style.width = null
			//element.classList.remove('ms-5', 'mt-2')
		}
		margin_remove.classList.add("container", "my-5")
		row.classList.add("row")
		row.classList.remove("column")
		pure_priceList.appendChild(buy_btn)
		ss_elem.style.backgroundColor = null
		//pdf.save("test.pdf") // downloads the pdf
		window.pdf = pdf
		window.open(
			pdf.output("bloburl"),
			"",
			"innerWidth: 10,innerHeight: 10,screenX: 0,screenY: 0"
		)
		/* 		window.open_pdf = () => {
					window.open(pdf.output("bloburl"), "", "innerWidth: 10,innerHeight: 10,screenX: 0,screenY: 0")
				} */

		cart.clear()
		for (const elem of Object.values(list.children)) {
			list.removeChild(elem)
			elem.remove()
		}
		let pElement = document.createElement("p")
		pElement.textContent = "The cart is empty"
		list.appendChild(pElement)
		priceText.innerHTML = `<strong>Total:</strong>`
		priceText.setAttribute("class", "fs-4 mt-2")
	})

	//If the cart is empty it will display that. Updates also the price text
	if (Object.keys(data_cart).length == 0) {
		let pElement = document.createElement("p")
		pElement.textContent = "The cart is empty"
		list.appendChild(pElement)
		priceText.innerHTML = `<strong>Total:</strong>`
		priceText.setAttribute("class", "fs-4 mt-2")

		//If the cart is not empty, it will generate an HTML element for each item using gen_element(), appending items to the list element
	} else {
		for (const key in data_cart) {
			const element = data_cart[key]
			list.appendChild(
				gen_element(
					data[key].image,
					`${data[key].name} x${element}`,
					element * data[key].price
				)
			)
		}

		//Create an empty array and then add price x number of items into the array
		const temp = []
		for (const elem of Object.entries(data_cart)) {
			temp.push(data[elem[0]].price * elem[1])
		}

		//Loop through the temp array and add to out_num to display the total price.
		let out_num = 0
		for (const element of temp) {
			out_num += element
		}
		priceText.innerHTML = `<strong>Total:</strong> ${out_num} kr`
		priceText.setAttribute("class", "fs-4 mt-2")
	}
})

/* 

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
		document.body.appendChild(canvas)
		/* screenshotDiv.appendChild(canvas)
		const offsetX = (pageWidth - canvas.width) / 2
		const offsetY = (pageHeight - canvas.height) / 2
		console.log({ pageWidth, pageHeight, offsetX, offsetY })
		pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, canvas.width, canvas.height)
		document.body.removeChild(screenshotDiv) 
	},
})

pdf.save("test.pdf")
*/
