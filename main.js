const item_list=document.getElementById("item_list")
for (const element of item_list.children) {
    const item_name=element.getAttribute('item')
    const add_btn=element.querySelector('.add_item')
    const remove_btn=element.querySelector('.remove_item')
    add_btn.addEventListener('click',()=>{
        console.log(`added 1 to ${item_name}`)
    })
    remove_btn.addEventListener('click',()=>{
        console.log(`removed 1 from ${item_name}`)
    })
}