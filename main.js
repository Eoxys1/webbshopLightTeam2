const item_list = document.getElementById("item_list");
for (const element of item_list.children) {
	const item_name = element.getAttribute("item");
	const add_btn = element.querySelector(".add_item");
	const remove_btn = element.querySelector(".remove_item");
	let qty = element.querySelector('.qty');
	add_btn.addEventListener("click", () => {
		cart.add(item_name);
		qty.value++;
	});
	remove_btn.addEventListener("click", () => {
		cart.remove(item_name);
		qty.value--;
        if (qty.value < 0) {
            qty.value = 0;
        }
	});
}
