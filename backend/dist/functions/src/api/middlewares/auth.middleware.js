import * as jwt from 'jsonwebtoken';
const JWT_SECRET = 'votre_secret_jwt_a_changer'; // Change this to an environment variable
export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Not authorized, no token' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch (error) {
        return res.status(401).send({ message: 'Not authorized, token failed' });
    }
};
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).send({ message: `User role ${req.user?.role} is not authorized to access this route` });
        }
        return next();
    };
};
//# sourceMappingURL=auth.middleware.js.map