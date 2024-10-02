//Retrieve the id item_list from index 
const item_list = document.getElementById("item_list");
/**
 * @return {Promise<{[id:string]:{image:string,name:string,price:number}}>}
 */

//Retrive data the data from json-file
async function data_fetch() {
	const res = await fetch('/data.json')
	const json = await res.json()
	return json
}

//Runs when the json-data is called (with data as parameter)
data_fetch().then((data) => {
	for (const element of item_list.children) {
		const item_name = element.getAttribute("item");
		const add_btn = element.querySelector(".add_item");
		const remove_btn = element.querySelector(".remove_item");
		const btnForCart = element.querySelector('.btnForCart');
		const qty = element.querySelector('.qty');
		const productImg = element.querySelector(".productImg")
		const productName = element.querySelector(".productName")
		const productPrice = element.querySelector(".productPrice")

		//Determine the content for each item with the json-data
		productImg.setAttribute('src',`.${data[item_name].image}`)
		productName.textContent = data[item_name].name
		productPrice.textContent = `${data[item_name].price} kr`

		qty.addEventListener('input', () => {
			// Replace any non-digit character with an empty string
			qty.value = qty.value.replace(/[^0-9]/g, '');

			// Prevent leading zeros and set default value to 0 if input is empty
			if (qty.value === '' || isNaN(qty.value)) {
				qty.value = 0;
			}
		});

		// increse amout of products
		add_btn.addEventListener("click", () => {
			qty.value++;
		});
		//  adds products to cart
		btnForCart.addEventListener("click", () => {
			cart.set(item_name, parseInt(qty.value));
		});
		// decrease amout of products
		remove_btn.addEventListener("click", () => {
			qty.value--;
			if (qty.value < 0) {
				qty.value = 0;
			}
		});
	}
})