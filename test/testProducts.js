const containers = document.querySelector('.testProductList');

[...containers.children].forEach(container => {
    let addButton = container.querySelector('.addQty');
    let removeButton = container.querySelector('.remQty');
    let qty = container.querySelector('.qty');
    let btnForCart = container.querySelector('.btnForCart');
    let cart_name = container.querySelector('.cart_name');

    addButton.addEventListener('click', () => qty.value++);
    removeButton.addEventListener('click', () => {
        qty.value--
        if (qty.value < 0) {
            qty.value = 0
        }
    });
    btnForCart.addEventListener('click', () => {
        cart.set(cart_name.textContent, parseInt(qty.value))
        console.log(cart.count())
    })
});




