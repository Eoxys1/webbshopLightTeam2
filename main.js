const item_list = document.getElementById("item_list");
for (const element of item_list.children) {
	const item_name = element.getAttribute("item");
	const add_btn = element.querySelector(".add_item");
	const remove_btn = element.querySelector(".remove_item");
	const btnForCart = element.querySelector('.btnForCart');
	const qty = element.querySelector('.qty');
	add_btn.addEventListener("click", () => {
		qty.value++;
	});
	btnForCart.addEventListener("click", () => {
		cart.set(item_name, parseInt(qty.value));
	});
	remove_btn.addEventListener("click", () => {
		qty.value--;
		if (qty.value < 0) {
			qty.value = 0;
		}
	});
}	
