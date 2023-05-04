const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        console.log(token);

        let decoded = jwt.verify(token,"aayu");
        if(decoded){
            req.body.userId =decoded.userId;
            next();
        }
        else res.send("login again")

    } catch (error) {
        res.send(error.message)
    }
}
module.exports = auth;