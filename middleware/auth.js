const { getUser } = require('../service/auth');

function checkforAuthentication(req, res,next){
    req.user = null;
    const authHeaderValue = req.headers["authorization"];
    if(!authHeaderValue || !authHeaderValue.startsWith("Bearer")) return next();

    const token = authHeaderValue.split("Bearer")[1];
    const user = getUser(token);
    req.user = user;
    return next();
}

// async function restricttoLoggedinUserOnly(req, res, next) {
//     const Userid = req.cookies?.uid;
//     if (!Userid) return res.render("login");
//     const user = getUser(Userid);
//     if (!user) return res.render("login");
//     req.user = user;
//     next();
// }
// async function checkAuth(req, res, next) {
//     const Userid = req.cookies?.uid;

//     const user = getUser(Userid);

//     req.user = user;
//     next();
// }

//admin, normal, moderators
function restrictTo(roles = [])
{
    return function(req,res,next){
        if(!req.user) return res.render("login");
        if(!roles.includes(req.user.role)) return res.end("Unauthorized");
        return next();
    }

}

module.exports = {
    checkforAuthentication,
    restrictTo
}