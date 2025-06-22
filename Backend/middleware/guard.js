export const controlRole = (role) => (req, res, next) => {
    if (req.user.role !== role) 
        return res.status(403).json({error: 'no access'})
    next();
};
