const User = require('../../model/user');
const bcrypt = require('bcrypt');
const passport = require('passport')



exports.login = (req,res)=>{
    res.render('login')
};

exports.signup = (req,res)=>{
    res.render('signup')
};

exports.signupPost = async (req,res)=>{
    let {name,email,password} = req.body;

    if (!name || !email || !password){
        req.flash('error','All fields are required');
        req.flash('name',name);
        req.flash('email',email)
        res.redirect('/signup')
    }
    ///check user is exists or not
    try {
        User.exists({ email: email }, (err, result) => {
            if(result) {
               req.flash('error', 'Email already taken')
               req.flash('name', name)
               req.flash('email', email) 
               return res.redirect('/signup')
            }
        })
    
        
    } catch (error) {
        console.log("error in email duplication")
    }
    
    ///hashpassword
    let hashedpassword = await bcrypt.hash(password,10) 

    ///create user
    try {
        const user = await User.create({
            name : name,
            email: email,
            password : hashedpassword
        })
        res.redirect('/signup')
        
    } catch (error) {
        console.log("error in creating user")
    }
    
};

exports.loginPost = (req,res,next)=>{
    const {email,password} = req.body
    passport.authenticate('local',(err,user,info)=>{
        if (err){
            req.flash('error',info.message)
            return next(err)
        }
        if (!user){
            req.flash('error',info.message)
            res.redirect('/login')
        }
        req.login(user,(err)=>{
            if (err){
                req.flash('error', info.message ) 
                return next(err)
                
            }
            return res.redirect('/')
            
        })
        
    })(req,res,next)
};

exports.logoutPost = (req,res)=>{
    
    req.logout()
    return res.redirect('/login')
}