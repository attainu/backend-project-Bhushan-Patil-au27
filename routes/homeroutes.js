var express = require('express');
var router = express.Router();


var homeController = require('../app/http/controller/homeController')
var authController = require('../app/http/controller/authController')
var cartController = require('../app/http/controller/customers/cartController')
var guestMiddleware =  require('../app/http/middlewares/guest')
var authMiddleware = require('../app/http/middlewares/auth')
var orderController = require('../app/http/controller/customers/orderController')


router.use((req,res,next)=>{
    res.locals.session = req.session;
    next();
});


router.get('/',homeController.index);
router.get('/login',guestMiddleware.guest,authController.login);
router.post('/login',authController.loginPost);
router.get('/signup',guestMiddleware.guest,authController.signup);
router.post('/signup',authController.signupPost);

router.post('/logout',authController.logoutPost);


router.get('/cart',cartController.index);
router.post('/updatecart',cartController.update);

//customer routes
router.post('/order',authMiddleware.auth,orderController.orderPost)
router.get('/customer/order',authMiddleware.auth,orderController.index)


module.exports = router;