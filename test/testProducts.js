const containers = document.querySelector('.testProductList');

[...containers.children].forEach(container => {
    let addButton = container.querySelector('.addQty');
    let removeButton = container.querySelector('.remQty');
    let qty = container.querySelector('.qty');

    addButton.addEventListener('click', () => qty.value++);
    removeButton.addEventListener('click', () => {
        qty.value--
        if(qty.value<0){
            qty.value=0
        }
    });
});