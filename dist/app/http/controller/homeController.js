
var Menu = require('../../model/menu')


exports.index = async (req,res)=>{
    const pizzas = await Menu.find()
    res.render('home',{pizzas:pizzas})
}

