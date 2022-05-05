const order = require('../../../model/order');

exports.index = (req,res,next)=>{
    order.find({status : {$ne : 'completed'}},null,{sort : {'createdAt': -1}}).
    populate('customerId','-password')

}