var order = require('../../../model/order')
var user = require('../../../model/user')

exports.orderPost = (req,res)=>{
    var {phone,address} = req.body

    if (!phone || !address){
        req.flash('error','All fields are required')
        return res.redirect('/cart')
    }
    try {
        var data = order.create({
            customerId : req.user._id,
            items : req.session.cart.items,
            phone: phone,
            address : address
        })
        req.flash('success','Order placed succesfully')
        delete req.session.cart
        res.redirect('/customer/order')
        
    } catch (error) {
        console.log("error in adding the cart items")
        
    }
    
};

exports.index = async (req,res)=>{
    var orders = await order.find({customerId : req.user._id},null,{sort : {'createdAt' : -1}})
    res.render('orders',{orders:orders})
}