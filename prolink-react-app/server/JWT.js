const {sign, verify} = require('jsonwebtoken');

const createTokens = (user) => {
    const accessToken = sign(
      { userId: user.userId, email: user.email },
      "S-KEY"
    );
  
    return accessToken;
  };

const validateTokens = (req, res, next) => {
    const token = req.cookies["token"];

    if(!token){
        return res.status(400).json({error: 'User not authenticated'})
    }

    try{
        const validToken = verify(token, "S-KEY")
        if(validToken){
            req.authenticated = true;
            return next();
        }
    } catch(err){
        res.status(400).json({error: err});
    }
}

module.exports = { createTokens, validateTokens };