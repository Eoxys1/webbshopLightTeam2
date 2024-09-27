const data_cart = cart.list();
/**
 * @return {Promise<{[id:string]:{image:string,name:string,price:number}}>}
 */
async function data_fetch() {
	const res = await fetch('/data.json')
	const json = await res.json()
	return json
}
function gen_element(image, name, price) {

	var node_1 = document.createElement('DIV');
	node_1.setAttribute('class', 'card-body mb-5 border border-dark mb-5 rounded-3 d-flex p-4');

	var node_2 = document.createElement('IMG');
	node_2.setAttribute('src', image);
	node_2.setAttribute('alt', '...');
	node_2.setAttribute('class', 'card-img img-fluid image-adjust rounded-3');
	node_2.setAttribute('style', 'width: 250px; height: 150px;')
	node_1.appendChild(node_2);

	var node_3 = document.createElement('H4');
	node_3.setAttribute('class', 'card-title ms-3 fs-2');
	node_1.appendChild(node_3);

	var node_4 = document.createTextNode(name);
	node_3.appendChild(node_4);

	var node_5 = document.createElement('P');
	node_5.setAttribute('class', 'card-text ms-auto me-2');
	node_1.appendChild(node_5);

	var node_6 = document.createTextNode(`${price} kr`);
	node_5.appendChild(node_6);

	return node_1
}

const priceText = document.getElementById("priceList").querySelector('p')
data_fetch().then((data) => {
	const list = document.getElementById("list");
	const buy_btn = document.getElementById('buy');
	buy_btn.addEventListener("click", () => {
		cart.clear();
		for (const elem of Object.values(list.children)) {
			list.removeChild(elem);
			elem.remove();
		}
		let pElement = document.createElement('p');
		pElement.textContent = "The cart is empty";
		list.appendChild(pElement);
		priceText.innerHTML = `<strong>Total:</strong>`
		priceText.setAttribute('class', 'fs-4 mt-2')
	})
	if (Object.keys(data_cart).length == 0) {
		let pElement = document.createElement('p');
		pElement.textContent = "The cart is empty";
		list.appendChild(pElement);
		priceText.innerHTML = `<strong>Total:</strong>`
		priceText.setAttribute('class', 'fs-4 mt-2')
	} else {
		for (const key in data_cart) {
			const element = data_cart[key];
			list.appendChild(gen_element(data[key].image, `${data[key].name} x${element}`, element * data[key].price));
		}
		const temp=[]
		for (const elem of Object.entries(data_cart)) {
			temp.push(data[elem[0]].price * elem[1])
		}
		let out_num=0
		for (const element of temp) {
			out_num+=element
		}
		priceText.innerHTML = `<strong>Total:</strong> ${out_num} kr`
		priceText.setAttribute('class', 'fs-4 mt-2')
		//Object.entries(data_cart).map((val) => { return data[val[0]].price * val[1] }).reduce((_a, _) => { return _a + _ }, 0)
	}
})




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

//pdf.save("test.pdf")

window.pdf = pdf
window.open_pdf = () => {
	window.open(pdf.output("bloburl"), "", "innerWidth: 10,innerHeight: 10,screenX: 0,screenY: 0")
}
