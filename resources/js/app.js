// console.log("jai shree shyam")//

const axios = require('axios').default;

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');


function updatecart(pizza){
    axios.post('/updatecart',pizza).then(res=>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty;
    })
}




addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza);
        updatecart(pizza)
    })

})

