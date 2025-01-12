const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            status: 'error',
            error: 'Access denied. Admin rights required.'
        });
    }
};

module.exports = {
    checkAdmin
}; 