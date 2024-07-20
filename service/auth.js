const jwt = require('jsonwebtoken');
const secret_key = "abir123$@123";
// const userLoginMap = new Map();

function setUser(id, user)
{
    //userLoginMap.set(id,user);
    const payload={
       _id:id,
       email:user.email,
       name:user.name,
       role:user.role,
    }

    return jwt.sign(payload, secret_key);
}


function getUser(token)
{
    //return userLoginMap.get(id);
    if(!token) return null;
    return jwt.verify(token, secret_key);
}


module.exports = {
    setUser,
    getUser,
}
