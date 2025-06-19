
const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({error: 'Invalid token'});

    const token = authHeader.split('')[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (err) return res.status(403).json({error: 'Invalid token'});
        req.user = user;
        next();
    })    
}

const requireRole = (role) => (req, res, next) => {
    if (req.user.role !== role) 
        return res.status(403).json({error: 'no access'})
    next();
};

module.exports = {tokenVerify, requireRole};