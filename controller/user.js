const {setUser, getUser} = require('../service/auth');
const User = require('../model/user');
const {v4 : uuidv4} = require('uuid');

async function createUser(req, res){
    const {name,email,password} = req.body;
    await User.create({
        name : name,
        email : email,
        password : password,
    });
    return res.render("home");
}

async function handleuserLogin(req, res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user) return res.render("login",{
        error:"Invalid email or password"
    });
    const sessionid = uuidv4();
    const token = setUser(sessionid,user);
    //res.cookie("uid", token);   //sessionid);
    res.json({token});  //Not in cookie rather in res object
    return res.render("home");
}

module.exports  = {
    createUser,
    handleuserLogin
}