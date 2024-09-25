const item_list = document.getElementById("item_list");
for (const element of item_list.children) {
	const item_name = element.getAttribute("item");
	const add_btn = element.querySelector(".add_item");
	const remove_btn = element.querySelector(".remove_item");
	const btnForCart = element.querySelector('.btnForCart');
	const qty = element.querySelector('.qty');

	qty.addEventListener('input', () => {
        // Replace any non-digit character with an empty string
        qty.value = qty.value.replace(/[^0-9]/g, '');

        // Prevent leading zeros and set default value to 0 if input is empty
        if (qty.value === '' || isNaN(qty.value)) {
            qty.value = 0;
        }
    });

	add_btn.addEventListener("click", () => {
		qty.value++;
	});
	btnForCart.addEventListener("click", () => {
		cart.set(item_name, parseInt(qty.value)??0);
	});
	remove_btn.addEventListener("click", () => {
		qty.value--;
		if (qty.value < 0) {
			qty.value = 0;
		}
	});
}